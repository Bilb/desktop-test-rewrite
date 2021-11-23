import React from 'react';

import { Avatar, AvatarSize } from '../Avatar';

import { SessionIconButton } from '../session/icon';

import { SessionButton, SessionButtonColor, SessionButtonType } from '../session/SessionButton';
import { MemoConversationHeaderMenu } from '../session/menu/ConversationHeaderMenu';
import { contextMenu } from 'react-contexify';
import styled from 'styled-components';
import { ConversationNotificationSettingType } from '../../models/conversation';
import {
  getConversationHeaderProps,
  getConversationHeaderTitleProps,
  getCurrentNotificationSettingText,
  getIsSelectedNoteToSelf,
  getIsSelectedPrivate,
  getSelectedConversationIsPublic,
  getSelectedConversationKey,
  getSelectedMessageIds,
  isMessageDetailView,
  isMessageSelectionMode,
  isRightPanelShowing,
} from '../../state/selectors/conversations';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteMessagesById,
  deleteMessagesByIdForEveryone,
} from '../../interactions/conversations/unsendingInteractions';
import {
  closeMessageDetailsView,
  closeRightPanel,
  openRightPanel,
  resetSelectedMessageIds,
} from '../../state/ducks/conversations';
import { callRecipient } from '../../interactions/conversationInteractions';
import { getHasIncomingCall, getHasOngoingCall } from '../../state/selectors/call';

export interface TimerOption {
  name: string;
  value: number;
}

export type ConversationHeaderProps = {
  conversationKey: string;
  name?: string;

  profileName?: string;
  avatarPath: string | null;

  isMe: boolean;
  isGroup: boolean;
  isPrivate: boolean;
  isPublic: boolean;
  weAreAdmin: boolean;

  // We might not always have the full list of members,
  // e.g. for open groups where we could have thousands
  // of members. We'll keep this for now (for closed chats)
  members: Array<any>;

  // not equal members.length (see above)
  subscriberCount?: number;

  expirationSettingName?: string;
  currentNotificationSetting: ConversationNotificationSettingType;
  hasNickname: boolean;

  isBlocked: boolean;

  isKickedFromGroup: boolean;
  left: boolean;
};

const SelectionOverlay = () => {
  const selectedMessageIds = useSelector(getSelectedMessageIds);
  const selectedConversationKey = useSelector(getSelectedConversationKey);
  const isPublic = useSelector(getSelectedConversationIsPublic);
  const dispatch = useDispatch();

  const { i18n } = window;

  function onCloseOverlay() {
    dispatch(resetSelectedMessageIds());
  }

  function onDeleteSelectedMessages() {
    if (selectedConversationKey) {
      void deleteMessagesById(selectedMessageIds, selectedConversationKey);
    }
  }
  function onDeleteSelectedMessagesForEveryone() {
    if (selectedConversationKey) {
      void deleteMessagesByIdForEveryone(selectedMessageIds, selectedConversationKey);
    }
  }

  const isOnlyServerDeletable = isPublic;
  const deleteMessageButtonText = i18n('delete');
  const deleteForEveroneMessageButtonText = i18n('deleteForEveryone');

  return (
    <div className="message-selection-overlay">
      <div className="close-button">
        <SessionIconButton iconType="exit" iconSize="medium" onClick={onCloseOverlay} />
      </div>

      <div className="button-group">
        {!isOnlyServerDeletable && (
          <SessionButton
            buttonType={SessionButtonType.Default}
            buttonColor={SessionButtonColor.Danger}
            text={deleteMessageButtonText}
            onClick={onDeleteSelectedMessages}
          />
        )}
        <SessionButton
          buttonType={SessionButtonType.Default}
          buttonColor={SessionButtonColor.Danger}
          text={deleteForEveroneMessageButtonText}
          onClick={onDeleteSelectedMessagesForEveryone}
        />
      </div>
    </div>
  );
};

const TripleDotsMenu = (props: { triggerId: string; showBackButton: boolean }) => {
  const { showBackButton } = props;
  if (showBackButton) {
    return null;
  }
  return (
    <div
      role="button"
      onClick={(e: any) => {
        contextMenu.show({
          id: props.triggerId,
          event: e,
        });
      }}
    >
      <SessionIconButton iconType="ellipses" iconSize="medium" />
    </div>
  );
};

const ExpirationLength = (props: { expirationSettingName?: string }) => {
  const { expirationSettingName } = props;

  if (!expirationSettingName) {
    return null;
  }

  return (
    <div className="module-conversation-header__expiration">
      <div className="module-conversation-header__expiration__clock-icon" />
      <div className="module-conversation-header__expiration__setting">{expirationSettingName}</div>
    </div>
  );
};

const AvatarHeader = (props: {
  avatarPath: string | null;
  name?: string;
  pubkey: string;
  profileName?: string;
  showBackButton: boolean;
  onAvatarClick?: (pubkey: string) => void;
}) => {
  const { avatarPath, name, pubkey, profileName } = props;
  const userName = name || profileName || pubkey;

  return (
    <span className="module-conversation-header__avatar">
      <Avatar
        avatarPath={avatarPath}
        name={userName}
        size={AvatarSize.S}
        onAvatarClick={() => {
          // do not allow right panel to appear if another button is shown on the SessionConversation
          if (props.onAvatarClick && !props.showBackButton) {
            props.onAvatarClick(pubkey);
          }
        }}
        pubkey={pubkey}
      />
    </span>
  );
};

const BackButton = (props: { onGoBack: () => void; showBackButton: boolean }) => {
  const { onGoBack, showBackButton } = props;
  if (!showBackButton) {
    return null;
  }

  return (
    <SessionIconButton iconType="chevron" iconSize={'large'} iconRotation={90} onClick={onGoBack} />
  );
};

const CallButton = () => {
  const isPrivate = useSelector(getIsSelectedPrivate);
  const isMe = useSelector(getIsSelectedNoteToSelf);
  const selectedConvoKey = useSelector(getSelectedConversationKey);

  const hasIncomingCall = useSelector(getHasIncomingCall);
  const hasOngoingCall = useSelector(getHasOngoingCall);
  const canCall = !(hasIncomingCall || hasOngoingCall);

  if (!isPrivate || isMe || !selectedConvoKey) {
    return null;
  }

  return (
    <SessionIconButton
      iconType="phone"
      iconSize="large"
      iconPadding="2px"
      margin="0 10px 0 0"
      onClick={() => {
        void callRecipient(selectedConvoKey, canCall);
      }}
    />
  );
};

export const StyledSubtitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  span:last-child {
    margin-bottom: 0;
  }
`;

export type ConversationHeaderTitleProps = {
  conversationKey: string;
  profileName?: string;
  isMe: boolean;
  isGroup: boolean;
  isPublic: boolean;
  members: Array<any>;
  subscriberCount?: number;
  isKickedFromGroup: boolean;
  name?: string;
  currentNotificationSetting?: ConversationNotificationSettingType;
};

const ConversationHeaderTitle = () => {
  const headerTitleProps = useSelector(getConversationHeaderTitleProps);
  const notificationSetting = useSelector(getCurrentNotificationSettingText);
  const isRightPanelOn = useSelector(isRightPanelShowing);
  const dispatch = useDispatch();
  if (!headerTitleProps) {
    return null;
  }

  const {
    conversationKey,
    profileName,
    isGroup,
    isPublic,
    members,
    subscriberCount,
    isMe,
    isKickedFromGroup,
    name,
  } = headerTitleProps;

  const { i18n } = window;

  if (isMe) {
    return <div className="module-conversation-header__title">{i18n('noteToSelf')}</div>;
  }

  let memberCount = 0;
  if (isGroup) {
    if (isPublic) {
      memberCount = subscriberCount || 0;
    } else {
      memberCount = members.length;
    }
  }

  let memberCountText = '';
  if (isGroup && memberCount > 0 && !isKickedFromGroup) {
    const count = String(memberCount);
    memberCountText = i18n('members', [count]);
  }

  const notificationSubtitle = notificationSetting
    ? window.i18n('notificationSubtitle', notificationSetting)
    : null;
  const fullTextSubtitle = memberCountText
    ? `${memberCountText} ● ${notificationSubtitle}`
    : `${notificationSubtitle}`;

  const title = profileName || name || conversationKey;

  return (
    <div
      className="module-conversation-header__title"
      onClick={() => {
        if (isRightPanelOn) {
          dispatch(closeRightPanel());
        } else {
          dispatch(openRightPanel());
        }
      }}
      role="button"
    >
      <span className="module-contact-name__profile-name">{title}</span>
      <StyledSubtitleContainer>
        <ConversationHeaderSubtitle text={fullTextSubtitle} />
      </StyledSubtitleContainer>
    </div>
  );
};

/**
 * The subtitle beneath a conversation title when looking at a conversation screen.
 * @param props props for subtitle. Text to be displayed
 * @returns JSX Element of the subtitle of conversation header
 */
export const ConversationHeaderSubtitle = (props: { text?: string | null }): JSX.Element | null => {
  const { text } = props;
  if (!text) {
    return null;
  }
  return <span className="module-conversation-header__title-text">{text}</span>;
};

export const ConversationHeaderWithDetails = () => {
  const headerProps = useSelector(getConversationHeaderProps);

  const isSelectionMode = useSelector(isMessageSelectionMode);
  const isMessageDetailOpened = useSelector(isMessageDetailView);

  const dispatch = useDispatch();

  if (!headerProps) {
    return null;
  }
  const {
    isKickedFromGroup,
    expirationSettingName,
    avatarPath,
    name,
    profileName,
    isMe,
    isPublic,
    currentNotificationSetting,
    hasNickname,
    weAreAdmin,
    isBlocked,
    left,
    conversationKey,
    isPrivate,
    isGroup,
  } = headerProps;

  const triggerId = 'conversation-header';

  return (
    <div className="module-conversation-header">
      <div className="conversation-header--items-wrapper">
        <BackButton
          onGoBack={() => {
            dispatch(closeMessageDetailsView());
          }}
          showBackButton={isMessageDetailOpened}
        />

        <div className="module-conversation-header__title-container">
          <div className="module-conversation-header__title-flex">
            <TripleDotsMenu triggerId={triggerId} showBackButton={isMessageDetailOpened} />
            <ConversationHeaderTitle />
          </div>
        </div>
        {!isKickedFromGroup && <ExpirationLength expirationSettingName={expirationSettingName} />}

        {!isSelectionMode && (
          <>
            <CallButton />
            <AvatarHeader
              onAvatarClick={() => {
                dispatch(openRightPanel());
              }}
              pubkey={conversationKey}
              showBackButton={isMessageDetailOpened}
              avatarPath={avatarPath}
              name={name}
              profileName={profileName}
            />
          </>
        )}

        <MemoConversationHeaderMenu
          conversationId={conversationKey}
          triggerId={triggerId}
          isMe={isMe}
          isPublic={isPublic}
          isGroup={isGroup}
          isKickedFromGroup={isKickedFromGroup}
          weAreAdmin={weAreAdmin}
          isBlocked={isBlocked}
          isPrivate={isPrivate}
          left={left}
          hasNickname={hasNickname}
          currentNotificationSetting={currentNotificationSetting}
          avatarPath={avatarPath}
          name={name}
          profileName={profileName}
        />
      </div>

      {isSelectionMode && <SelectionOverlay />}
    </div>
  );
};
