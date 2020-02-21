import React from 'react';

import { ConversationHeader } from '../conversation/ConversationHeader';
import { SessionCompositionBox } from './SessionCompositionBox';
import { SessionProgress } from './SessionProgress'

import { Message } from '../conversation/Message';
import { SessionSpinner } from './SessionSpinner';


// interface Props {
//   getHeaderProps: any;
//   conversationKey: any;
// }

interface State {
  sendingProgess: number;
  prevSendingProgess: number;
  conversationKey: string;
  messages: Array<any>;
}

export class SessionConversation extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    const conversationKey = window.inboxStore.getState().conversations.selectedConversation;

    this.state = {
      sendingProgess: 0,
      prevSendingProgess: 0,
      conversationKey,
      messages: [],
    };
  }

  async componentWillMount() {
    const {conversationKey} = this.state;

    if (conversationKey){
      this.setState({
        messages: await window.getMessagesByKey(conversationKey)
      });
    }
  }

  render() {
    
    // const headerProps = this.props.getHeaderProps;
    const { conversationKey } = this.state;
    const loadingMessages = this.state.messages.length === 0;

    // TMEPORARY SOLUTION TO GETTING CONVERSATION UNTIL
    // SessionConversationStack is created

    // Get conversation by Key (NOT cid)
    const conversation = window.getConversationByKey(conversationKey);
    const conversationType = conversation.attributes.type;

    console.log(`[vince] Conversation key: `, conversationKey);
    console.log(`[vince] Conversation:`, conversation);

    return (
      <div className={`conversation-item conversation-${conversation.cid}`}>
        <div className="conversation-header">
          {this.renderHeader(conversation)}
        </div>

        <SessionProgress
          visible={true}
          value={this.state.sendingProgess}
          prevValue={this.state.prevSendingProgess}
        />

        <div className="messages-container">
          { loadingMessages ? (
            <div className="messages-container__loading">
              <SessionSpinner/>
            </div>
          ) : (
            <>
              {this.renderMessages(conversationKey, conversationType)}
            </>
          )}
        </div>
        
        <SessionCompositionBox
            onSendMessage={() => null}
        />
      </div>
    );
  }

  public renderMessages(conversationKey: string, conversationType: 'group' | 'direct') {
    const { messages } = this.state;

    console.log(`Messages`, messages);

    // FIND FOR EACH MESSAGE
    const isExpired = false;
    const isDeletable = false;
    const messageType = 'direct';
    const selected = false;
    const preview:any = [];
    const multiSelectMode = false;
    const onSelectMessage = () => null;
    const onSelectMessageUnchecked = () => null;
    const onShowDetail = () => null;
    const onShowUserDetails = () => null;


    // FIXME PAY ATTENTION; ONLY RENDER MESSAGES THAT ARE VISIBLE
    return (
      <>{
        messages.map((message: any) => {

          return message.body && (
            <Message
              text = {message.body || ''}
              direction = {'incoming'}
              timestamp = {1581565995228}
              i18n = {window.i18n}
              authorPhoneNumber = {message.source}
              conversationType = {conversationType}
              previews = {preview}
              isExpired = {isExpired}
              isDeletable = {isDeletable}
              convoId = {conversationKey}
              selected = {selected}
              multiSelectMode = {multiSelectMode}
              onSelectMessage = {onSelectMessage}
              onSelectMessageUnchecked = {onSelectMessageUnchecked}
              onShowDetail = {onShowDetail}
              onShowUserDetails = {onShowUserDetails}
            />
          )}
        )
      }</>
    );

  }

  public renderHeader(conversation: any) {
    return (
      <ConversationHeader
        id={conversation.cid}
        phoneNumber={conversation.id}
        isVerified={true}
        isMe={false}
        isFriend={true}
        i18n={window.i18n}
        isGroup={false}
        isArchived={false}
        isPublic={false}
        isRss={false}
        amMod={false}
        members={[]}
        showBackButton={false}
        timerOptions={[]}
        isBlocked={false}
        hasNickname={false}
        isFriendRequestPending={false}
        isOnline={true}
        selectedMessages={null}
        onSetDisappearingMessages={() => null}
        onDeleteMessages={() => null}
        onDeleteContact={() => null}
        onResetSession={() => null}
        onCloseOverlay={() => null}
        onDeleteSelectedMessages={() => null}
        onArchive={() => null}
        onMoveToInbox={() => null}
        onShowSafetyNumber={() => null}
        onShowAllMedia={() => null}
        onShowGroupMembers={() => null}
        onGoBack={() => null}
        onBlockUser={() => null}
        onUnblockUser={() => null}
        onClearNickname={() => null}
        onChangeNickname={() => null}
        onCopyPublicKey={() => null}
        onLeaveGroup={() => null}
        onAddModerators={() => null}
        onRemoveModerators={() => null}
        onInviteFriends={() => null}
      />
    );
  }

  public scrollToUnread() {

  }

  public scrollToBottom() {

  }
}
