import classNames from 'classnames';
import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import {
  useConversationPropsById,
  useHasUnread,
  useIsPrivate,
  useIsTyping,
} from '../../../hooks/useParamSelector';
import { MessageBody } from '../../conversation/message/message-content/MessageBody';
import { OutgoingMessageStatus } from '../../conversation/message/message-content/OutgoingMessageStatus';
import { TypingAnimation } from '../../conversation/TypingAnimation';
import { ContextConversationId } from './ConversationListItem';
import { useSelector } from 'react-redux';
import { isSearching } from '../../../state/selectors/search';

function useLastMessageFromConvo(convoId: string) {
  const convoProps = useConversationPropsById(convoId);
  if (!convoProps) {
    return null;
  }
  return convoProps.lastMessage;
}

export const MessageItem = (props: { isMessageRequest: boolean }) => {
  const conversationId = useContext(ContextConversationId);
  const lastMessage = useLastMessageFromConvo(conversationId);
  const isGroup = !useIsPrivate(conversationId);

  const hasUnread = useHasUnread(conversationId);
  const isConvoTyping = useIsTyping(conversationId);

  const isSearchingMode = useSelector(isSearching);

  if (!lastMessage && !isConvoTyping) {
    return null;
  }
  const text = lastMessage?.text || '';

  if (isEmpty(text)) {
    return null;
  }

  return (
    <div className="module-conversation-list-item__message">
      <div
        className={classNames(
          'module-conversation-list-item__message__text',
          hasUnread ? 'module-conversation-list-item__message__text--has-unread' : null
        )}
      >
        {isConvoTyping ? (
          <TypingAnimation />
        ) : (
          <MessageBody text={text} disableJumbomoji={true} disableLinks={true} isGroup={isGroup} />
        )}
      </div>
      {!isSearchingMode && lastMessage && lastMessage.status && !props.isMessageRequest ? (
        <OutgoingMessageStatus status={lastMessage.status} />
      ) : null}
    </div>
  );
};
