import { isNil } from 'lodash';
import {
  ConversationNotificationSettingType,
  ConversationTypeEnum,
} from '../models/conversationAttributes';
import { CallManager, SyncUtils, ToastUtils, UserUtils } from '../session/utils';

import { SessionButtonColor } from '../components/basic/SessionButton';
import { getCallMediaPermissionsSettings } from '../components/settings/SessionSettings';
import { Data } from '../data/data';
import { SettingsKey } from '../data/settings-key';
import { uploadFileToFsWithOnionV4 } from '../session/apis/file_server_api/FileServerApi';
import { OpenGroupUtils } from '../session/apis/open_group_api/utils';
import { ConvoHub } from '../session/conversations';
import { getSodiumRenderer } from '../session/crypto';
import { getDecryptedMediaUrl } from '../session/crypto/DecryptedAttachmentsManager';
import { PubKey } from '../session/types';
import { perfEnd, perfStart } from '../session/utils/Performance';
import { fromHexToArray, toHex } from '../session/utils/String';
import { UserSync } from '../session/utils/job_runners/jobs/UserSyncJob';
import { SessionUtilContact } from '../session/utils/libsession/libsession_utils_contacts';
import { forceSyncConfigurationNowIfNeeded } from '../session/utils/sync/syncUtils';
import {
  conversationReset,
  quoteMessage,
  resetConversationExternal,
} from '../state/ducks/conversations';
import {
  adminLeaveClosedGroup,
  changeNickNameModal,
  updateAddModeratorsModal,
  updateBanOrUnbanUserModal,
  updateConfirmModal,
  updateGroupMembersModal,
  updateGroupNameModal,
  updateInviteContactModal,
  updateRemoveModeratorsModal,
} from '../state/ducks/modalDialog';
import { MIME } from '../types';
import { LocalizerKeys } from '../types/LocalizerKeys';
import { IMAGE_JPEG } from '../types/MIME';
import { processNewAttachment } from '../types/MessageAttachment';
import { urlToBlob } from '../types/attachments/VisualAttachment';
import { BlockedNumberController } from '../util/blockedNumberController';
import { encryptProfile } from '../util/crypto/profileEncrypter';
import { ReleasedFeatures } from '../util/releaseFeature';
import { Storage, setLastProfileUpdateTimestamp } from '../util/storage';
import { UserGroupsWrapperActions } from '../webworker/workers/browser/libsession_worker_interface';

export async function copyPublicKeyByConvoId(convoId: string) {
  if (OpenGroupUtils.isOpenGroupV2(convoId)) {
    const fromWrapper = await UserGroupsWrapperActions.getCommunityByFullUrl(convoId);

    if (!fromWrapper) {
      window.log.warn('opengroup to copy was not found in the UserGroupsWrapper');
      return;
    }

    if (fromWrapper.fullUrlWithPubkey) {
      window.clipboard.writeText(fromWrapper.fullUrlWithPubkey);
      ToastUtils.pushCopiedToClipBoard();
    }
  } else {
    window.clipboard.writeText(convoId);
  }
}

export async function blockConvoById(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);

  if (!conversation.id || conversation.isPublic()) {
    return;
  }

  await BlockedNumberController.block(conversation.id);
  await conversation.commit();
  ToastUtils.pushToastSuccess('blocked', window.i18n('blocked'));
}

export async function unblockConvoById(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);

  if (!conversation) {
    // we assume it's a block contact and not group.
    // this is to be able to unlock a contact we don't have a conversation with.
    await BlockedNumberController.unblockAll([conversationId]);
    ToastUtils.pushToastSuccess('unblocked', window.i18n('unblocked'));
    return;
  }
  if (!conversation.id || conversation.isPublic()) {
    return;
  }
  await BlockedNumberController.unblockAll([conversationId]);
  ToastUtils.pushToastSuccess('unblocked', window.i18n('unblocked'));
  await conversation.commit();
}

/**
 * marks the conversation's approval fields, sends messageRequestResponse, syncs to linked devices
 */
export const approveConvoAndSendResponse = async (
  conversationId: string,
  syncToDevices: boolean = true
) => {
  const convoToApprove = ConvoHub.use().get(conversationId);

  if (!convoToApprove) {
    window?.log?.info('Conversation is already approved.');
    return;
  }

  await convoToApprove.setIsApproved(true, false);

  await convoToApprove.commit();
  await convoToApprove.sendMessageRequestResponse();

  // Conversation was not approved before so a sync is needed
  if (syncToDevices) {
    await forceSyncConfigurationNowIfNeeded();
  }
};

export async function declineConversationWithoutConfirm({
  alsoBlock,
  conversationId,
  currentlySelectedConvo,
  syncToDevices,
  conversationIdOrigin,
}: {
  conversationId: string;
  currentlySelectedConvo: string | undefined;
  syncToDevices: boolean;
  alsoBlock: boolean;
  conversationIdOrigin: string | null;
}) {
  const conversationToDecline = ConvoHub.use().get(conversationId);

  if (
    !conversationToDecline ||
    (!conversationToDecline.isPrivate() && !conversationToDecline.isClosedGroupV2())
  ) {
    window?.log?.info('No conversation to decline.');
    return;
  }

  // Note: do not set the active_at undefined as this would make that conversation not synced with the libsession wrapper
  await conversationToDecline.setIsApproved(false, false);
  await conversationToDecline.setDidApproveMe(false, false);
  await conversationToDecline.setOriginConversationID('', false);
  // this will update the value in the wrapper if needed but not remove the entry if we want it gone. The remove is done below with removeContactFromWrapper
  await conversationToDecline.commit();
  if (alsoBlock) {
    if (PubKey.is03Pubkey(conversationId)) {
      // Note: if we do want to block this convo, we actually want to block the person who invited us, not the 03 pubkey itself
      if (conversationIdOrigin && !PubKey.is03Pubkey(conversationIdOrigin)) {
        // restoring from seed we can be missing the conversationIdOrigin, so we wouldn't be able to block the person who invited us

        await blockConvoById(conversationIdOrigin);
      }
    } else {
      await blockConvoById(conversationId);
    }
  }
  // when removing a message request, without blocking it, we actually have no need to store the conversation in the wrapper. So just remove the entry

  if (
    conversationToDecline.isPrivate() &&
    !SessionUtilContact.isContactToStoreInWrapper(conversationToDecline)
  ) {
    await SessionUtilContact.removeContactFromWrapper(conversationToDecline.id);
  }

  if (PubKey.is03Pubkey(conversationId)) {
    await UserGroupsWrapperActions.eraseGroup(conversationId);
  }

  if (syncToDevices) {
    await forceSyncConfigurationNowIfNeeded();
  }
  if (currentlySelectedConvo && currentlySelectedConvo === conversationId) {
    window?.inboxStore?.dispatch(resetConversationExternal());
  }
}

export const declineConversationWithConfirm = ({
  conversationId,
  syncToDevices,
  alsoBlock,
  currentlySelectedConvo,
  conversationIdOrigin,
}: {
  conversationId: string;
  currentlySelectedConvo: string | undefined;
  syncToDevices: boolean;
  alsoBlock: boolean;
  conversationIdOrigin: string | null;
}) => {
  const isGroupV2 = PubKey.is03Pubkey(conversationId);

  const okKey: LocalizerKeys = alsoBlock ? 'block' : 'delete';
  const nameToBlock =
    alsoBlock && !!conversationIdOrigin
      ? ConvoHub.use().get(conversationIdOrigin)?.getContactProfileNameOrShortenedPubKey()
      : null;
  const messageKey: LocalizerKeys = isGroupV2
    ? alsoBlock && nameToBlock
      ? 'deleteGroupRequestAndBlock'
      : 'deleteGroupRequest'
    : 'declineRequestMessage';

  let message = '';
  // restoring from seeed we might not have the sender of that invite, so we need to take care of not having one (and not block)
  if (isGroupV2 && messageKey === 'deleteGroupRequestAndBlock') {
    if (!nameToBlock) {
      throw new Error(
        'deleteGroupRequestAndBlock needs a nameToBlock (or block should not be visible)'
      );
    }

    message = window.i18n(
      messageKey,
      messageKey === 'deleteGroupRequestAndBlock' ? [nameToBlock] : []
    );
  } else {
    message = window.i18n(messageKey);
  }

  window?.inboxStore?.dispatch(
    updateConfirmModal({
      okText: window.i18n(okKey),
      cancelText: window.i18n('cancel'),
      message,
      onClickOk: async () => {
        await declineConversationWithoutConfirm({
          conversationId,
          currentlySelectedConvo,
          alsoBlock,
          syncToDevices,
          conversationIdOrigin,
        });
      },
      onClickCancel: () => {
        window?.inboxStore?.dispatch(updateConfirmModal(null));
      },
      onClickClose: () => {
        window?.inboxStore?.dispatch(updateConfirmModal(null));
      },
    })
  );
};

export async function showUpdateGroupNameByConvoId(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);
  if (conversation.isClosedGroup()) {
    // make sure all the members' convo exists so we can add or remove them
    await Promise.all(
      conversation
        .getGroupMembers()
        .map(m => ConvoHub.use().getOrCreateAndWait(m, ConversationTypeEnum.PRIVATE))
    );
  }
  window.inboxStore?.dispatch(updateGroupNameModal({ conversationId }));
}

export async function showUpdateGroupMembersByConvoId(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);
  if (conversation.isClosedGroup()) {
    // make sure all the members' convo exists so we can add or remove them
    await Promise.all(
      conversation
        .getGroupMembers()
        .map(m => ConvoHub.use().getOrCreateAndWait(m, ConversationTypeEnum.PRIVATE))
    );
  }
  window.inboxStore?.dispatch(updateGroupMembersModal({ conversationId }));
}

export function showLeaveGroupByConvoId(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);

  if (!conversation.isGroup()) {
    throw new Error('showLeaveGroupDialog() called with a non group convo.');
  }

  const title = window.i18n('leaveGroup');
  const message = window.i18n('leaveGroupConfirmation');
  const isAdmin = conversation.getGroupAdmins().includes(UserUtils.getOurPubKeyStrFromCache());
  const isClosedGroup = conversation.isClosedGroup() || false;
  const isPublic = conversation.isPublic() || false;

  // if this is a community, or we legacy group are not admin, we can just show a confirmation dialog
  if (isPublic || (isClosedGroup && !isAdmin)) {
    const onClickClose = () => {
      window.inboxStore?.dispatch(updateConfirmModal(null));
    };
    window.inboxStore?.dispatch(
      updateConfirmModal({
        title,
        message,
        onClickOk: async () => {
          if (isPublic) {
            await ConvoHub.use().deleteCommunity(conversation.id, {
              fromSyncMessage: false,
            });
          } else {
            await ConvoHub.use().deleteClosedGroup(conversation.id, {
              fromSyncMessage: false,
              sendLeaveMessage: true,
            });
          }
          onClickClose();
        },
        onClickClose,
      })
    );
    return;
  }
  window.inboxStore?.dispatch(
    adminLeaveClosedGroup({
      conversationId,
    })
  );
}
export function showInviteContactByConvoId(conversationId: string) {
  window.inboxStore?.dispatch(updateInviteContactModal({ conversationId }));
}

export function showAddModeratorsByConvoId(conversationId: string) {
  window.inboxStore?.dispatch(updateAddModeratorsModal({ conversationId }));
}

export function showRemoveModeratorsByConvoId(conversationId: string) {
  window.inboxStore?.dispatch(updateRemoveModeratorsModal({ conversationId }));
}

export function showBanUserByConvoId(conversationId: string, pubkey?: string) {
  window.inboxStore?.dispatch(
    updateBanOrUnbanUserModal({ banType: 'ban', conversationId, pubkey })
  );
}

export function showUnbanUserByConvoId(conversationId: string, pubkey?: string) {
  window.inboxStore?.dispatch(
    updateBanOrUnbanUserModal({ banType: 'unban', conversationId, pubkey })
  );
}

export async function markAllReadByConvoId(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);
  perfStart(`markAllReadByConvoId-${conversationId}`);

  await conversation?.markAllAsRead();

  perfEnd(`markAllReadByConvoId-${conversationId}`, 'markAllReadByConvoId');
}

export async function setNotificationForConvoId(
  conversationId: string,
  selected: ConversationNotificationSettingType
) {
  const conversation = ConvoHub.use().get(conversationId);

  const existingSettings = conversation.getNotificationsFor();
  if (existingSettings !== selected) {
    conversation.set({ triggerNotificationsFor: selected });
    await conversation.commit();
  }
}
export async function clearNickNameByConvoId(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);
  await conversation.setNickname(null, true);
}

export function showChangeNickNameByConvoId(conversationId: string) {
  window.inboxStore?.dispatch(changeNickNameModal({ conversationId }));
}

export async function deleteAllMessagesByConvoIdNoConfirmation(conversationId: string) {
  const conversation = ConvoHub.use().get(conversationId);
  await Data.removeAllMessagesInConversation(conversationId);

  // destroy message keeps the active timestamp set so the
  // conversation still appears on the conversation list but is empty
  conversation.set({
    lastMessage: null,
  });

  await conversation.commit();
  window.inboxStore?.dispatch(conversationReset(conversationId));
}

export function deleteAllMessagesByConvoIdWithConfirmation(conversationId: string) {
  const onClickClose = () => {
    window?.inboxStore?.dispatch(updateConfirmModal(null));
  };

  const onClickOk = async () => {
    await deleteAllMessagesByConvoIdNoConfirmation(conversationId);
    onClickClose();
  };

  window?.inboxStore?.dispatch(
    updateConfirmModal({
      title: window.i18n('deleteMessages'),
      message: window.i18n('deleteConversationConfirmation'),
      onClickOk,
      okTheme: SessionButtonColor.Danger,
      onClickClose,
    })
  );
}

export async function setDisappearingMessagesByConvoId(
  conversationId: string,
  seconds: number | undefined
) {
  const conversation = ConvoHub.use().get(conversationId);

  const canSetDisappearing = !conversation.isOutgoingRequest() && !conversation.isIncomingRequest();

  if (!canSetDisappearing) {
    ToastUtils.pushMustBeApproved();
    return;
  }

  if (!seconds || seconds <= 0) {
    await conversation.updateExpireTimer(null);
  } else {
    await conversation.updateExpireTimer(seconds);
  }
}

/**
 * This function can be used for reupload our avatar to the fileserver or upload a new avatar.
 *
 * If this is a reupload, the old profileKey is used, otherwise a new one is generated
 */
export async function uploadOurAvatar(newAvatarDecrypted?: ArrayBuffer) {
  const ourConvo = ConvoHub.use().get(UserUtils.getOurPubKeyStrFromCache());
  if (!ourConvo) {
    window.log.warn('ourConvo not found... This is not a valid case');
    return null;
  }

  let profileKey: Uint8Array | null;
  let decryptedAvatarData;
  if (newAvatarDecrypted) {
    // Encrypt with a new key every time
    profileKey = (await getSodiumRenderer()).randombytes_buf(32);
    decryptedAvatarData = newAvatarDecrypted;
  } else {
    // this is a reupload. no need to generate a new profileKey
    const ourConvoProfileKey =
      ConvoHub.use().get(UserUtils.getOurPubKeyStrFromCache())?.getProfileKey() || null;

    profileKey = ourConvoProfileKey ? fromHexToArray(ourConvoProfileKey) : null;
    if (!profileKey) {
      window.log.info('our profileKey not found. Not reuploading our avatar');
      return null;
    }
    const currentAttachmentPath = ourConvo.getAvatarPath();

    if (!currentAttachmentPath) {
      window.log.warn('No attachment currently set for our convo.. Nothing to do.');
      return null;
    }

    const decryptedAvatarUrl = await getDecryptedMediaUrl(currentAttachmentPath, IMAGE_JPEG, true);

    if (!decryptedAvatarUrl) {
      window.log.warn('Could not decrypt avatar stored locally..');
      return null;
    }
    const blob = await urlToBlob(decryptedAvatarUrl);

    decryptedAvatarData = await blob.arrayBuffer();
  }

  if (!decryptedAvatarData?.byteLength) {
    window.log.warn('Could not read content of avatar ...');
    return null;
  }

  const encryptedData = await encryptProfile(decryptedAvatarData, profileKey);

  const avatarPointer = await uploadFileToFsWithOnionV4(encryptedData);
  if (!avatarPointer) {
    window.log.warn('failed to upload avatar to fileserver');
    return null;
  }
  const { fileUrl, fileId } = avatarPointer;

  ourConvo.set('avatarPointer', fileUrl);

  // this encrypts and save the new avatar and returns a new attachment path
  const upgraded = await processNewAttachment({
    isRaw: true,
    data: decryptedAvatarData,
    contentType: MIME.IMAGE_UNKNOWN, // contentType is mostly used to generate previews and screenshot. We do not care for those in this case.
  });
  // Replace our temporary image with the attachment pointer from the server:
  ourConvo.set('avatarInProfile', undefined);
  const displayName = ourConvo.getRealSessionUsername();

  // write the profileKey even if it did not change
  ourConvo.set({ profileKey: toHex(profileKey) });
  // Replace our temporary image with the attachment pointer from the server:
  // this commits already
  await ourConvo.setSessionProfile({
    avatarPath: upgraded.path,
    displayName,
    avatarImageId: fileId,
  });
  const newTimestampReupload = Date.now();
  await Storage.put(SettingsKey.lastAvatarUploadTimestamp, newTimestampReupload);

  if (newAvatarDecrypted) {
    await setLastProfileUpdateTimestamp(Date.now());
    await UserSync.queueNewJobIfNeeded();
    const userConfigLibsession = await ReleasedFeatures.checkIsUserConfigFeatureReleased();

    if (!userConfigLibsession) {
      await SyncUtils.forceSyncConfigurationNowIfNeeded(true);
    }
  } else {
    window.log.info(
      `Reuploading avatar finished at ${newTimestampReupload}, newAttachmentPointer ${fileUrl}`
    );
  }
  return {
    avatarPointer: ourConvo.getAvatarPointer(),
    profileKey: ourConvo.getProfileKey(),
  };
}

/**
 * This function can be used for clearing our avatar.
 */
export async function clearOurAvatar(commit: boolean = true) {
  const ourConvo = ConvoHub.use().get(UserUtils.getOurPubKeyStrFromCache());
  if (!ourConvo) {
    window.log.warn('ourConvo not found... This is not a valid case');
    return;
  }

  // return early if no change are needed at all
  if (
    isNil(ourConvo.get('avatarPointer')) &&
    isNil(ourConvo.get('avatarInProfile')) &&
    isNil(ourConvo.get('profileKey'))
  ) {
    return;
  }

  ourConvo.set('avatarPointer', undefined);
  ourConvo.set('avatarInProfile', undefined);
  ourConvo.set('profileKey', undefined);

  await setLastProfileUpdateTimestamp(Date.now());

  if (commit) {
    await ourConvo.commit();
    await SyncUtils.forceSyncConfigurationNowIfNeeded(true);
  }
}

export async function replyToMessage(messageId: string) {
  const quotedMessageModel = await Data.getMessageById(messageId);
  if (!quotedMessageModel) {
    window.log.warn('Failed to find message to reply to');
    return;
  }
  const conversationModel = ConvoHub.use().getOrThrow(quotedMessageModel.get('conversationId'));

  const quotedMessageProps = await conversationModel.makeQuote(quotedMessageModel);

  if (quotedMessageProps) {
    window.inboxStore?.dispatch(quoteMessage(quotedMessageProps));
  } else {
    window.inboxStore?.dispatch(quoteMessage(undefined));
  }
}

/**
 * Check if what is pasted is a URL and prompt confirmation for a setting change
 * @param e paste event
 */
export async function showLinkSharingConfirmationModalDialog(e: any) {
  const pastedText = e.clipboardData.getData('text');
  if (isURL(pastedText) && !window.getSettingValue(SettingsKey.settingsLinkPreview, false)) {
    const alreadyDisplayedPopup =
      (await Data.getItemById(SettingsKey.hasLinkPreviewPopupBeenDisplayed))?.value || false;
    if (!alreadyDisplayedPopup) {
      window.inboxStore?.dispatch(
        updateConfirmModal({
          shouldShowConfirm:
            !window.getSettingValue(SettingsKey.settingsLinkPreview) && !alreadyDisplayedPopup,
          title: window.i18n('linkPreviewsTitle'),
          message: window.i18n('linkPreviewsConfirmMessage'),
          okTheme: SessionButtonColor.Danger,
          onClickOk: async () => {
            await window.setSettingValue(SettingsKey.settingsLinkPreview, true);
          },
          onClickClose: async () => {
            await Storage.put(SettingsKey.hasLinkPreviewPopupBeenDisplayed, true);
          },
        })
      );
    }
  }
}

/**
 *
 * @param str String to evaluate
 * @returns boolean if the string is true or false
 */
function isURL(str: string) {
  const urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

export async function callRecipient(pubkey: string, canCall: boolean) {
  const convo = ConvoHub.use().get(pubkey);

  if (!canCall) {
    ToastUtils.pushUnableToCall();
    return;
  }

  if (!getCallMediaPermissionsSettings()) {
    ToastUtils.pushVideoCallPermissionNeeded();
    return;
  }

  if (convo && convo.isPrivate() && !convo.isMe()) {
    await CallManager.USER_callRecipient(convo.id);
  }
}
