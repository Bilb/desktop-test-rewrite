import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  useConversationUsernameOrShorten,
  useIsIncomingRequest,
} from '../../hooks/useParamSelector';
import { PubKey } from '../../session/types';
import {
  hasSelectedConversationIncomingMessages,
  useSelectedHasMessages,
} from '../../state/selectors/conversations';
import {
  getSelectedCanWrite,
  useSelectedConversationIdOrigin,
  useSelectedConversationKey,
  useSelectedHasDisabledBlindedMsgRequests,
  useSelectedIsApproved,
  useSelectedIsGroupV2,
  useSelectedIsNoteToSelf,
  useSelectedNicknameOrProfileNameOrShortenedPubkey,
} from '../../state/selectors/selectedConversation';
import {
  useLibGroupInviteGroupName,
  useLibGroupInvitePending,
} from '../../state/selectors/userGroups';
import { LocalizerKeys } from '../../types/LocalizerKeys';
import { SessionHtmlRenderer } from '../basic/SessionHTMLRenderer';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: var(--margins-lg);
  background-color: var(--background-secondary-color);
`;

const TextInner = styled.div`
  color: var(--text-secondary-color);
  text-align: center;
  max-width: 390px;
`;

function TextNotification({ html, dataTestId }: { html: string; dataTestId: string }) {
  return (
    <Container data-testid={dataTestId}>
      <TextInner>
        <SessionHtmlRenderer html={html} />
      </TextInner>
    </Container>
  );
}

/**
 * This component is used to display a warning when the user is responding to a message request.
 */
export const ConversationRequestExplanation = () => {
  const selectedConversation = useSelectedConversationKey();
  const isIncomingMessageRequest = useIsIncomingRequest(selectedConversation);

  const showMsgRequestUI = selectedConversation && isIncomingMessageRequest;
  const hasIncomingMessages = useSelector(hasSelectedConversationIncomingMessages);

  if (!showMsgRequestUI || !hasIncomingMessages) {
    return null;
  }

  return (
    <TextNotification
      dataTestId="conversation-request-explanation"
      html={window.i18n('respondingToRequestWarning')}
    />
  );
};

/**
 * This component is used to display a warning when the user is responding to a group message request.
 */
export const GroupRequestExplanation = () => {
  const selectedConversation = useSelectedConversationKey();
  const isIncomingMessageRequest = useIsIncomingRequest(selectedConversation);
  const isGroupV2 = useSelectedIsGroupV2();
  const showMsgRequestUI = selectedConversation && isIncomingMessageRequest;
  // isApproved in DB is tracking the pending state for a group
  const isApproved = useSelectedIsApproved();
  const isGroupPendingInvite = useLibGroupInvitePending(selectedConversation);

  if (!showMsgRequestUI || isApproved || !isGroupV2 || !isGroupPendingInvite) {
    return null;
  }
  return (
    <TextNotification
      dataTestId="group-request-explanation"
      html={window.i18n('respondingToGroupRequestWarning')}
    />
  );
};

export const InvitedToGroupControlMessage = () => {
  const selectedConversation = useSelectedConversationKey();
  const isGroupV2 = useSelectedIsGroupV2();
  const hasMessages = useSelectedHasMessages();
  const isApproved = useSelectedIsApproved();

  const groupName = useLibGroupInviteGroupName(selectedConversation) || window.i18n('unknown');
  const conversationOrigin = useSelectedConversationIdOrigin();
  const adminNameInvitedUs =
    useConversationUsernameOrShorten(conversationOrigin) || window.i18n('unknown');
  const isGroupPendingInvite = useLibGroupInvitePending(selectedConversation);
  if (
    !selectedConversation ||
    isApproved ||
    hasMessages || // we don't want to display that "xx invited you" message if there are already other messages (incoming or outgoing)
    !isGroupV2 ||
    !conversationOrigin ||
    !PubKey.is05Pubkey(conversationOrigin) ||
    !isGroupPendingInvite
  ) {
    return null;
  }

  return (
    <TextNotification
      dataTestId="group-invite-control-message"
      html={window.i18n('userInvitedYouToGroup', [adminNameInvitedUs, groupName])}
    />
  );
};

/**
 * This component is used to display a warning when the user is looking at an empty conversation.
 */
export const NoMessageInConversation = () => {
  const selectedConversation = useSelectedConversationKey();

  const hasMessage = useSelectedHasMessages();
  const isGroupV2 = useSelectedIsGroupV2();
  const isInvitePending = useLibGroupInvitePending(selectedConversation);

  const isMe = useSelectedIsNoteToSelf();
  const canWrite = useSelector(getSelectedCanWrite);
  const privateBlindedAndBlockingMsgReqs = useSelectedHasDisabledBlindedMsgRequests();
  // TODOLATER use this selector accross the whole application (left pane excluded)
  const nameToRender = useSelectedNicknameOrProfileNameOrShortenedPubkey() || '';

  // groupV2 use its own invite logic as part of <GroupRequestExplanation />
  if (!selectedConversation || hasMessage || (isGroupV2 && isInvitePending)) {
    return null;
  }
  let localizedKey: LocalizerKeys = 'noMessagesInEverythingElse';
  if (!canWrite) {
    if (privateBlindedAndBlockingMsgReqs) {
      localizedKey = 'noMessagesInBlindedDisabledMsgRequests';
    } else {
      localizedKey = 'thereAreNoMessagesIn';
    }
  } else if (isMe) {
    localizedKey = 'noMessagesInNoteToSelf';
  }

  return (
    <TextNotification
      dataTestId="empty-conversation-notification"
      html={window.i18n(localizedKey, [nameToRender])}
    />
  );
};
