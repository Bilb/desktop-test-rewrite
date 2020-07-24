// tslint:disable: no-backbone-get-set-outside-model

import React from 'react';

import classNames from 'classnames';

import { ConversationHeader } from '../../conversation/ConversationHeader';
import { SessionCompositionBox } from './SessionCompositionBox';
import { SessionProgress } from '../SessionProgress';

import { Message } from '../../conversation/Message';
import { TimerNotification } from '../../conversation/TimerNotification';

import { getTimestamp } from './SessionConversationManager';

import { SessionScrollButton } from '../SessionScrollButton';
import { SessionGroupSettings } from './SessionGroupSettings';
import { ResetSessionNotification } from '../../conversation/ResetSessionNotification';
import { Constants, getMessageQueue } from '../../../session';
import { MessageQueue } from '../../../session/sending';
import { SessionKeyVerification } from '../SessionKeyVerification';
import _ from 'lodash';
import { UserUtil } from '../../../util';
import { MultiDeviceProtocol } from '../../../session/protocols';

interface State {
  conversationKey: string;

  // Message sending progress
  messageProgressVisible: boolean;
  sendingProgress: number;
  prevSendingProgress: number;
  // Sending failed:  -1
  // Not send yet:     0
  // Sending message:  1
  // Sending success:  2
  sendingProgressStatus: -1 | 0 | 1 | 2;

  unreadCount: number;
  initialFetchComplete: boolean;
  messages: Array<any>;
  selectedMessages: Array<string>;
  isScrolledToBottom: boolean;
  doneInitialScroll: boolean;
  displayScrollToBottomButton: boolean;
  messageFetchTimestamp: number;

  showOverlay: boolean;
  showRecordingView: boolean;
  showOptionsPane: boolean;
  showScrollButton: boolean;

  // For displaying `More Info` on messages, and `Safety Number`, etc.
  infoViewState?: 'safetyNumber' | 'messageDetails';

  // dropZoneFiles?: FileList
  dropZoneFiles: any;
}

export class SessionConversation extends React.Component<any, State> {
  private readonly messagesEndRef: React.RefObject<HTMLDivElement>;
  private readonly messageContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    const conversationKey = this.props.conversations.selectedConversation;
    const conversation = this.props.conversations.conversationLookup[
      conversationKey
    ];

    const unreadCount = conversation.unreadCount;

    this.state = {
      messageProgressVisible: false,
      sendingProgress: 0,
      prevSendingProgress: 0,
      sendingProgressStatus: 0,
      conversationKey,
      unreadCount,
      initialFetchComplete: false,
      messages: [],
      selectedMessages: [],
      isScrolledToBottom: !unreadCount,
      doneInitialScroll: false,
      displayScrollToBottomButton: false,
      messageFetchTimestamp: 0,

      showOverlay: false,
      showRecordingView: false,
      showOptionsPane: false,
      showScrollButton: false,

      infoViewState: undefined,

      dropZoneFiles: undefined, // <-- FileList or something else?
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToUnread = this.scrollToUnread.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.renderMessage = this.renderMessage.bind(this);

    // Group settings panel
    this.toggleGroupSettingsPane = this.toggleGroupSettingsPane.bind(this);
    this.getGroupSettingsProps = this.getGroupSettingsProps.bind(this);

    // Recording view
    this.onLoadVoiceNoteView = this.onLoadVoiceNoteView.bind(this);
    this.onExitVoiceNoteView = this.onExitVoiceNoteView.bind(this);

    // Messages
    this.loadInitialMessages = this.loadInitialMessages.bind(this);
    this.selectMessage = this.selectMessage.bind(this);
    this.resetSelection = this.resetSelection.bind(this);
    this.updateSendingProgress = this.updateSendingProgress.bind(this);
    this.resetSendingProgress = this.resetSendingProgress.bind(this);
    this.onMessageSending = this.onMessageSending.bind(this);
    this.onMessageSuccess = this.onMessageSuccess.bind(this);
    this.onMessageFailure = this.onMessageFailure.bind(this);
    this.deleteSelectedMessages = this.deleteSelectedMessages.bind(this);

    this.messagesEndRef = React.createRef();
    this.messageContainerRef = React.createRef();

    // Keyboard navigation
    this.onKeyDown = this.onKeyDown.bind(this);

    const conversationModel = window.ConversationController.get(
      this.state.conversationKey
    );
    conversationModel.on('change', () => {
      this.setState(
        {
          messages: conversationModel.messageCollection.models,
        },
        this.updateReadMessages
      );
    });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~ LIFECYCLES ~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  public async componentWillMount() {
    await this.loadInitialMessages();
    this.setState({ initialFetchComplete: true });
  }

  public componentDidMount() {
    // Pause thread to wait for rendering to complete
    setTimeout(this.scrollToUnread, 0);
    setTimeout(() => {
      this.setState({
        doneInitialScroll: true,
      });
    }, 100);

    this.updateReadMessages();
  }

  public componentDidUpdate() {
    // Keep scrolled to bottom unless user scrolls up
    if (this.state.isScrolledToBottom) {
      this.scrollToBottom();
    }

    // New messages get from message collection.
    const messageCollection = window.ConversationController.get(
      this.state.conversationKey
    ).messageCollection;
  }

  public async componentWillReceiveProps(nextProps: any) {
    return;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~ RENDER METHODS ~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public render() {
    const {
      messages,
      conversationKey,
      doneInitialScroll,
      showRecordingView,
      showOptionsPane,
      showScrollButton,
    } = this.state;
    const loading = !doneInitialScroll;
    const selectionMode = !!this.state.selectedMessages.length;

    const conversation = this.props.conversations.conversationLookup[
      conversationKey
    ];
    const conversationModel = window.ConversationController.get(
      conversationKey
    );
    const isRss = conversation.isRss;

    // TODO VINCE: OPTIMISE FOR NEW SENDING???
    const sendMessageFn = conversationModel.sendMessage.bind(conversationModel);

    const shouldRenderGroupSettings =
      !conversationModel.isPrivate() && !conversationModel.isRss();
    const groupSettingsProps = this.getGroupSettingsProps();

    const showSafetyNumber = this.state.infoViewState === 'safetyNumber';
    const showMessageDetails = this.state.infoViewState === 'messageDetails';

    return (
      <>
        <div className="conversation-header">{this.renderHeader()}</div>

        {/* <SessionProgress
            visible={this.state.messageProgressVisible}
            value={this.state.sendingProgress}
            prevValue={this.state.prevSendingProgress}
            sendStatus={this.state.sendingProgressStatus}
            resetProgress={this.resetSendingProgress}
          /> */}

        <div
          className={classNames(
            'conversation-content',
            selectionMode && 'selection-mode'
          )}
          tabIndex={0}
          onKeyDown={this.onKeyDown}
          role="navigation"
        >
          <div
            className={classNames(
              'conversation-info-panel',
              this.state.infoViewState && 'show'
            )}
          >
            {showSafetyNumber && (
              <SessionKeyVerification conversation={conversationModel} />
            )}
            {showMessageDetails && <>&nbsp</>}
          </div>

          <div className="conversation-messages">
            {loading && <div className="messages-container__loading" />}

            <div
              className="messages-container"
              onScroll={this.handleScroll}
              ref={this.messageContainerRef}
            >
              {this.renderMessages(messages)}
              <div ref={this.messagesEndRef} />
            </div>

            <SessionScrollButton
              show={showScrollButton}
              onClick={this.scrollToBottom}
            />
            {showRecordingView && (
              <div className="conversation-messages__blocking-overlay" />
            )}
          </div>

          {!isRss && (
            <SessionCompositionBox
              sendMessage={sendMessageFn}
              dropZoneFiles={this.state.dropZoneFiles}
              onMessageSending={this.onMessageSending}
              onMessageSuccess={this.onMessageSuccess}
              onMessageFailure={this.onMessageFailure}
              onLoadVoiceNoteView={this.onLoadVoiceNoteView}
              onExitVoiceNoteView={this.onExitVoiceNoteView}
            />
          )}
        </div>

        {shouldRenderGroupSettings && (
          <div
            className={classNames(
              'conversation-item__options-pane',
              showOptionsPane && 'show'
            )}
          >
            <SessionGroupSettings {...groupSettingsProps} />
          </div>
        )}
      </>
    );
  }

  public renderMessages(messages: any) {
    const multiSelectMode = Boolean(this.state.selectedMessages.length);
    // FIXME VINCE: IF MESSAGE IS THE TOP OF UNREAD, THEN INSERT AN UNREAD BANNER

    return (
      <>
        {messages.map((message: any) => {
          const messageProps = message.propsForMessage;
          const quoteProps = message.propsForQuote;

          const timerProps = message.propsForTimerNotification && {
            i18n: window.i18n,
            ...message.propsForTimerNotification,
          };
          const resetSessionProps = message.propsForResetSessionNotification && {
            i18n: window.i18n,
            ...message.propsForResetSessionNotification,
          };

          const attachmentProps = message.propsForAttachment;
          const groupNotificationProps = message.propsForGroupNotification;

          let item;
          // firstMessageOfSeries tells us to render the avatar only for the first message
          // in a series of messages from the same user
          item = messageProps
            ? this.renderMessage(
                messageProps,
                message.firstMessageOfSeries,
                multiSelectMode
              )
            : item;
          item = quoteProps
            ? this.renderMessage(
                timerProps,
                message.firstMessageOfSeries,
                multiSelectMode,
                quoteProps
              )
            : item;

          item = timerProps ? <TimerNotification {...timerProps} /> : item;
          item = resetSessionProps ? (
            <ResetSessionNotification {...resetSessionProps} />
          ) : (
            item
          );
          // item = attachmentProps  ? this.renderMessage(timerProps) : item;

          return item;
        })}
      </>
    );
  }

  public renderHeader() {
    const headerProps = this.getHeaderProps();
    return <ConversationHeader {...headerProps} />;
  }

  public renderMessage(
    messageProps: any,
    firstMessageOfSeries: boolean,
    multiSelectMode: boolean,
    quoteProps?: any
  ) {
    const selected =
      !!messageProps?.id &&
      this.state.selectedMessages.includes(messageProps.id);

    messageProps.i18n = window.i18n;
    messageProps.selected = selected;
    messageProps.firstMessageOfSeries = firstMessageOfSeries;
    messageProps.multiSelectMode = multiSelectMode;
    messageProps.onSelectMessage = (messageId: string) => {
      this.selectMessage(messageId);
    };

    messageProps.quote = quoteProps || undefined;

    return <Message {...messageProps} />;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~ GETTER METHODS ~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  public async loadInitialMessages() {
    // Grabs the initial set of messages and adds them to our conversation model.
    // After the inital fetch, all new messages are automatically added from onNewMessage
    // in the conversation model.
    // The only time we need to call getMessages() is to grab more messages on scroll.
    const { conversationKey, initialFetchComplete } = this.state;
    const conversationModel = window.ConversationController.get(
      conversationKey
    );

    if (initialFetchComplete) {
      return;
    }

    const messageSet = await window.Signal.Data.getMessagesByConversation(
      conversationKey,
      {
        limit: Constants.CONVERSATION.DEFAULT_MESSAGE_FETCH_COUNT,
        MessageCollection: window.Whisper.MessageCollection,
      }
    );

    const messages = messageSet.models;
    const messageFetchTimestamp = Date.now();

    this.setState({ messages, messageFetchTimestamp }, () => {
      if (this.state.isScrolledToBottom) {
        this.updateReadMessages();
      }

      // Add new messages to conversation collection
      conversationModel.messageCollection = messageSet;
    });
  }

  public async getMessages(
    numMessages?: number,
    fetchInterval = Constants.CONVERSATION.MESSAGE_FETCH_INTERVAL
  ) {
    const { conversationKey, messageFetchTimestamp } = this.state;
    const conversationModel = window.ConversationController.get(
      conversationKey
    );
    const timestamp = getTimestamp();

    // If we have pulled messages in the last interval, don't bother rescanning
    // This avoids getting messages on every re-render.
    const timeBuffer = timestamp - messageFetchTimestamp;
    if (timeBuffer < fetchInterval) {
      return { newTopMessage: undefined, previousTopMessage: undefined };
    }

    let msgCount =
      numMessages ||
      Number(Constants.CONVERSATION.DEFAULT_MESSAGE_FETCH_COUNT) +
        this.state.unreadCount;
    msgCount =
      msgCount > Constants.CONVERSATION.MAX_MESSAGE_FETCH_COUNT
        ? Constants.CONVERSATION.MAX_MESSAGE_FETCH_COUNT
        : msgCount;

    const messageSet = await window.Signal.Data.getMessagesByConversation(
      conversationKey,
      { limit: msgCount, MessageCollection: window.Whisper.MessageCollection }
    );

    // Set first member of series here.
    const messageModels = messageSet.models;
    const messages = [];
    let previousSender;
    for (let i = 0; i < messageModels.length; i++) {
      // Handle firstMessageOfSeries for conditional avatar rendering
      let firstMessageOfSeries = true;
      if (i > 0 && previousSender === messageModels[i].authorPhoneNumber) {
        firstMessageOfSeries = false;
      }

      messages.push({ ...messageModels[i], firstMessageOfSeries });
      previousSender = messageModels[i].authorPhoneNumber;
    }

    const previousTopMessage = this.state.messages[0]?.id;
    const newTopMessage = messages[0]?.id;

    this.setState({ messages, messageFetchTimestamp: timestamp }, () => {
      if (this.state.isScrolledToBottom) {
        this.updateReadMessages();
      }
    });

    return { newTopMessage, previousTopMessage };
  }

  public getHeaderProps() {
    const { conversationKey } = this.state;
    const conversation = window.ConversationController.get(conversationKey);

    const expireTimer = conversation.get('expireTimer');
    const expirationSettingName = expireTimer
      ? window.Whisper.ExpirationTimerOptions.getName(expireTimer || 0)
      : null;

    const members = conversation.get('members') || [];

    const headerProps = {
      i18n: window.i18n,
      id: conversation.id,
      name: conversation.getName(),
      phoneNumber: conversation.getNumber(),
      profileName: conversation.getProfileName(),
      color: conversation.getColor(),
      avatarPath: conversation.getAvatarPath(),
      isVerified: conversation.isVerified(),
      isMe: conversation.isMe(),
      isClosable: conversation.isClosable(),
      isBlocked: conversation.isBlocked(),
      isGroup: !conversation.isPrivate(),
      isOnline: conversation.isOnline(),
      isPublic: conversation.isPublic(),
      isRss: conversation.isRss(),
      amMod: conversation.isModerator(
        window.storage.get('primaryDevicePubKey')
      ),
      members,
      subscriberCount: conversation.get('subscriberCount'),
      selectedMessages: this.state.selectedMessages,
      isKickedFromGroup: conversation.get('isKickedFromGroup'),
      expirationSettingName,
      showBackButton: Boolean(this.state.infoViewState),
      timerOptions: window.Whisper.ExpirationTimerOptions.map((item: any) => ({
        name: item.getName(),
        value: item.get('seconds'),
      })),
      hasNickname: !!conversation.getNickname(),

      onSetDisappearingMessages: (seconds: any) =>
        conversation.updateExpirationTimer(seconds),
      onDeleteMessages: () => null,
      onDeleteSelectedMessages: async () => {
        await this.deleteSelectedMessages();
      },
      onCloseOverlay: () => {
        this.setState({ selectedMessages: [] });
        conversation.resetMessageSelection();
      },
      onDeleteContact: () => conversation.deleteContact(),
      onResetSession: () => {
        conversation.endSession();
      },

      onShowSafetyNumber: () => {
        this.setState({ infoViewState: 'safetyNumber' });
      },

      onGoBack: () => {
        this.setState({ infoViewState: undefined });
      },

      onShowAllMedia: async () => {
        conversation.updateHeader();
      },
      onUpdateGroupName: () => {
        conversation.onUpdateGroupName();
      },
      onShowGroupMembers: async () => {
        window.Whisper.events.trigger('updateGroupMembers', conversation);
        conversation.updateHeader();
      },

      onBlockUser: () => {
        conversation.block();
      },
      onUnblockUser: () => {
        conversation.unblock();
      },
      onCopyPublicKey: () => {
        conversation.copyPublicKey();
      },
      onLeaveGroup: () => {
        window.Whisper.events.trigger('leaveGroup', conversation);
      },
      onInviteContacts: () => {
        window.Whisper.events.trigger('inviteContacts', conversation);
      },

      onAddModerators: () => {
        window.Whisper.events.trigger('addModerators', conversation);
      },

      onRemoveModerators: () => {
        window.Whisper.events.trigger('removeModerators', conversation);
      },

      onAvatarClick: (pubkey: any) => {
        if (conversation.isPrivate()) {
          window.Whisper.events.trigger('onShowUserDetails', {
            userPubKey: pubkey,
          });
        } else if (!conversation.isRss()) {
          this.toggleGroupSettingsPane();
        }
      },
    };

    return headerProps;
  }

  public getGroupSettingsProps() {
    const { conversationKey } = this.state;
    const conversation = window.ConversationController.get(conversationKey);

    const ourPK = window.textsecure.storage.user.getNumber();
    const members = conversation.get('members') || [];

    return {
      id: conversation.id,
      name: conversation.getName(),
      memberCount: members.length,
      phoneNumber: conversation.getNumber(),
      profileName: conversation.getProfileName(),
      color: conversation.getColor(),
      description: '', // TODO VINCE: ENSURE DESCRIPTION IS SET
      avatarPath: conversation.getAvatarPath(),
      amMod: conversation.isModerator(),
      isKickedFromGroup: conversation.attributes.isKickedFromGroup,
      isGroup: !conversation.isPrivate(),
      isPublic: conversation.isPublic(),
      isAdmin: conversation.get('groupAdmins').includes(ourPK),
      isRss: conversation.isRss(),
      isBlocked: conversation.isBlocked(),

      timerOptions: window.Whisper.ExpirationTimerOptions.map((item: any) => ({
        name: item.getName(),
        value: item.get('seconds'),
      })),

      onSetDisappearingMessages: (seconds: any) =>
        conversation.setDisappearingMessages(seconds),

      onGoBack: () => {
        this.toggleGroupSettingsPane();
      },

      onUpdateGroupName: () => {
        window.Whisper.events.trigger('updateGroupName', conversation);
      },
      onUpdateGroupMembers: () => {
        window.Whisper.events.trigger('updateGroupMembers', conversation);
      },
      onInviteContacts: () => {
        // VINCE TODO: Inviting contacts ⚡️
        return;
      },
      onLeaveGroup: () => {
        window.Whisper.events.trigger('leaveGroup', conversation);
      },

      onShowLightBox: (lightBoxOptions = {}) => {
        conversation.showChannelLightbox(lightBoxOptions);
      },
    };
  }

  public toggleGroupSettingsPane() {
    const { showOptionsPane } = this.state;
    this.setState({ showOptionsPane: !showOptionsPane });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~ MESSAGE HANDLING ~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public updateSendingProgress(value: number, status: -1 | 0 | 1 | 2) {
    // If you're sending a new message, reset previous value to zero
    const prevSendingProgress = status === 1 ? 0 : this.state.sendingProgress;

    this.setState({
      sendingProgress: value,
      prevSendingProgress,
      sendingProgressStatus: status,
    });
  }

  public resetSendingProgress() {
    this.setState({
      sendingProgress: 0,
      prevSendingProgress: 0,
      sendingProgressStatus: 0,
    });
  }

  public onMessageSending() {
    // Set sending state 5% to show message sending
    const initialValue = 5;
    this.updateSendingProgress(initialValue, 1);
  }

  public onMessageSuccess() {
    this.updateSendingProgress(100, 2);
  }

  public onMessageFailure() {
    this.updateSendingProgress(100, -1);
  }

  public updateReadMessages() {
    const { isScrolledToBottom, messages, conversationKey } = this.state;

    // If you're not friends, don't mark anything as read. Otherwise
    // this will automatically accept friend request.
    const conversation = window.ConversationController.get(conversationKey);
    if (conversation.isBlocked()) {
      return;
    }

    let unread;

    if (!messages || messages.length === 0) {
      return;
    }

    if (isScrolledToBottom) {
      unread = messages[messages.length - 1];
    } else {
      unread = this.findNewestVisibleUnread();
    }

    if (unread) {
      const model = window.ConversationController.get(conversationKey);
      model.markRead(unread.attributes.received_at);
    }
  }

  public findNewestVisibleUnread() {
    const messageContainer = this.messageContainerRef.current;
    if (!messageContainer) {
      return null;
    }

    const { messages, unreadCount } = this.state;
    const { length } = messages;

    const viewportBottom =
      messageContainer?.clientHeight + messageContainer?.scrollTop || 0;

    // Start with the most recent message, search backwards in time
    let foundUnread = 0;
    for (let i = length - 1; i >= 0; i -= 1) {
      // Search the latest 30, then stop if we believe we've covered all known
      //   unread messages. The unread should be relatively recent.
      // Why? local notifications can be unread but won't be reflected the
      //   conversation's unread count.
      if (i > 30 && foundUnread >= unreadCount) {
        return null;
      }

      const message = messages[i];

      if (!message.attributes.unread) {
        // eslint-disable-next-line no-continue
        continue;
      }

      foundUnread += 1;

      const el = document.getElementById(`${message.id}`);

      if (!el) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const top = el.offsetTop;

      // If the bottom fits on screen, we'll call it visible. Even if the
      //   message is really tall.
      const height = el.offsetHeight;
      const bottom = top + height;

      // We're fully below the viewport, continue searching up.
      if (top > viewportBottom) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (bottom <= viewportBottom) {
        return message;
      }

      // Continue searching up.
    }

    return null;
  }

  public async deleteSelectedMessages() {
    // Get message objects
    const selectedMessages = this.state.messages.filter(message =>
      this.state.selectedMessages.find(
        selectedMessage => selectedMessage === message.id
      )
    );

    const { conversationKey } = this.state;
    const conversationModel = window.ConversationController.get(
      conversationKey
    );

    const multiple = selectedMessages.length > 1;
    const isPublic = conversationModel.isPublic();

    // In future, we may be able to unsend private messages also
    // isServerDeletable also defined in ConversationHeader.tsx for
    // future reference
    const isServerDeletable = isPublic;

    const warningMessage = (() => {
      if (isPublic) {
        return multiple
          ? window.i18n('deleteMultiplePublicWarning')
          : window.i18n('deletePublicWarning');
      }
      return multiple
        ? window.i18n('deleteMultipleWarning')
        : window.i18n('deleteWarning');
    })();

    const doDelete = async () => {
      let toDeleteLocally;

      // VINCE TOOD: MARK TO-DELETE MESSAGES AS READ

      if (isPublic) {
        // Get our Moderator status
        const ourDevicePubkey = await UserUtil.getCurrentDevicePubKey();
        if (!ourDevicePubkey) {
          return;
        }
        const ourPrimaryPubkey = (
          await MultiDeviceProtocol.getPrimaryDevice(ourDevicePubkey)
        ).key;
        const isModerator = conversationModel.isModerator(ourPrimaryPubkey);
        const isAllOurs = selectedMessages.every(
          message =>
            message.propsForMessage.authorPhoneNumber === message.OUR_NUMBER
        );

        if (!isAllOurs && !isModerator) {
          window.pushToast({
            title: window.i18n('messageDeletionForbidden'),
            type: 'error',
            id: 'messageDeletionForbidden',
          });

          this.setState({ selectedMessages: [] });
          return;
        }

        toDeleteLocally = await conversationModel.deletePublicMessages(
          selectedMessages
        );
        if (toDeleteLocally.length === 0) {
          // Message failed to delete from server, show error?
          return;
        }
      } else {
        selectedMessages.forEach(m =>
          conversationModel.messageCollection.remove(m.id)
        );
        toDeleteLocally = selectedMessages;
      }

      await Promise.all(
        toDeleteLocally.map(async (message: any) => {
          await window.Signal.Data.removeMessage(message.id, {
            Message: window.Whisper.Message,
          });
          message.trigger('unload');
        })
      );

      // Update view and trigger update
      this.setState({ selectedMessages: [] }, () => {
        conversationModel.trigger('change', conversationModel);
      });
    };

    // Only show a warning when at least one messages was successfully
    // saved in on the server
    if (!selectedMessages.some(m => !m.hasErrors())) {
      await doDelete();
      return;
    }

    // If removable from server, we "Unsend" - otherwise "Delete"
    const pluralSuffix = multiple ? 's' : '';
    const title = window.i18n(
      isPublic ? `unsendMessage${pluralSuffix}` : `deleteMessage${pluralSuffix}`
    );

    const okText = window.i18n(isServerDeletable ? 'unsend' : 'delete');

    window.confirmationDialog({
      title,
      message: warningMessage,
      okText,
      okTheme: 'danger',
      resolve: doDelete,
      centeredText: true,
    });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~ SCROLLING METHODS ~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public async handleScroll() {
    const messageContainer = this.messageContainerRef.current;
    if (!messageContainer) {
      return;
    }

    const scrollTop = messageContainer.scrollTop;
    const scrollHeight = messageContainer.scrollHeight;
    const clientHeight = messageContainer.clientHeight;

    const scrollButtonViewShowLimit = 0.75;
    const scrollButtonViewHideLimit = 0.4;
    const scrollOffsetPx = scrollHeight - scrollTop - clientHeight;
    const scrollOffsetPc = scrollOffsetPx / clientHeight;

    // Scroll button appears if you're more than 75% scrolled up
    if (
      scrollOffsetPc > scrollButtonViewShowLimit &&
      !this.state.showScrollButton
    ) {
      this.setState({ showScrollButton: true });
    }
    // Scroll button disappears if you're more less than 40% scrolled up
    if (
      scrollOffsetPc < scrollButtonViewHideLimit &&
      this.state.showScrollButton
    ) {
      this.setState({ showScrollButton: false });
    }

    // Scrolled to bottom
    const isScrolledToBottom = scrollOffsetPc === 0;

    // Mark messages read
    this.updateReadMessages();

    // Pin scroll to bottom on new message, unless user has scrolled up
    if (this.state.isScrolledToBottom !== isScrolledToBottom) {
      this.setState({ isScrolledToBottom });
    }

    // Fetch more messages when nearing the top of the message list
    const shouldFetchMoreMessages =
      scrollTop <= Constants.UI.MESSAGE_CONTAINER_BUFFER_OFFSET_PX;

    if (shouldFetchMoreMessages) {
      const numMessages =
        this.state.messages.length +
        Constants.CONVERSATION.DEFAULT_MESSAGE_FETCH_COUNT;

      // Prevent grabbing messags with scroll more frequently than once per 5s.
      const messageFetchInterval = 2;
      const previousTopMessage = (
        await this.getMessages(numMessages, messageFetchInterval)
      )?.previousTopMessage;

      if (previousTopMessage) {
        this.scrollToMessage(previousTopMessage);
      }
    }
  }

  public scrollToUnread() {
    const { messages, unreadCount } = this.state;
    const message = messages[messages.length - 1 - unreadCount];

    if (message) {
      this.scrollToMessage(message.id);
    }
  }

  public scrollToMessage(messageId: string) {
    const topUnreadMessage = document.getElementById(messageId);
    topUnreadMessage?.scrollIntoView();
  }

  public scrollToBottom() {
    // FIXME VINCE: Smooth scrolling that isn't slow@!
    // this.messagesEndRef.current?.scrollIntoView(
    //   { behavior: firstLoad ? 'auto' : 'smooth' }
    // );

    const messageContainer = this.messageContainerRef.current;
    if (!messageContainer) {
      return;
    }
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~ MESSAGE SELECTION ~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public selectMessage(messageId: string) {
    const selectedMessages = this.state.selectedMessages.includes(messageId)
      ? // Add to array if not selected. Else remove.
        this.state.selectedMessages.filter(id => id !== messageId)
      : [...this.state.selectedMessages, messageId];

    this.setState({ selectedMessages });
  }

  public resetSelection() {
    this.setState({ selectedMessages: [] });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~ MICROPHONE METHODS ~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  private onLoadVoiceNoteView() {
    this.setState({
      showRecordingView: true,
      selectedMessages: [],
    });
  }

  private onExitVoiceNoteView() {
    this.setState({
      showRecordingView: false,
    });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~ KEYBOARD NAVIGATION ~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  private onKeyDown(event: any) {
    const messageContainer = this.messageContainerRef.current;
    if (!messageContainer) {
      return;
    }

    const selectionMode = !!this.state.selectedMessages.length;
    const recordingMode = this.state.showRecordingView;

    const pageHeight = messageContainer.clientHeight;
    const arrowScrollPx = 50;
    const pageScrollPx = pageHeight * 0.8;

    if (event.key === 'Escape') {
      // EXIT MEDIA VIEW

      if (recordingMode) {
        // EXIT RECORDING VIEW
      }
      // EXIT WHAT ELSE?
    }

    switch (event.key) {
      case 'Escape':
        if (selectionMode) {
          this.resetSelection();
        }
        break;

      // Scrolling
      case 'ArrowUp':
        messageContainer.scrollBy(0, -arrowScrollPx);
        break;
      case 'ArrowDown':
        messageContainer.scrollBy(0, arrowScrollPx);
        break;
      case 'PageUp':
        messageContainer.scrollBy(0, -pageScrollPx);
        break;
      case 'PageDown':
        messageContainer.scrollBy(0, pageScrollPx);
        break;
      default:
    }
  }
}
