import { MessageModel, MessageAttributes } from './messages';

interface ConversationAttributes {
  profileName?: string;
  id: string;
  name: string;
  members: Array<string>;
  left: boolean;
  expireTimer: number;
  profileSharing: boolean;
  secondaryStatus: boolean;
  mentionedUs: boolean;
  unreadCount: number;
  isArchived: boolean;
  active_at: number;
  timestamp: number; // timestamp of what?
  groupAdmins?: Array<string>;
  isKickedFromGroup?: boolean;
  avatarPath?: string;
  isMe?: boolean;
  subscriberCount?: number;
  sessionRestoreSeen?: boolean;
  is_medium_group?: boolean;
}

export interface ConversationModel
  extends Backbone.Model<ConversationAttributes> {
  idForLogging: () => string;
  // Save model changes to the database
  commit: () => Promise<void>;
  notify: (message: MessageModel) => void;
  isSessionResetReceived: () => boolean;
  updateExpirationTimer: (
    expireTimer: number | null,
    source?: string,
    receivedAt?: number,
    options?: object
  ) => Promise<void>;
  isPrivate: () => boolean;
  isVerified: () => boolean;
  toggleVerified: () => Promise<void>;
  getProfile: (id: string) => Promise<any>;
  getProfiles: () => Promise<any>;
  setProfileKey: (key: string) => void;
  isMe: () => boolean;
  getRecipients: () => Array<string>;
  getTitle: () => string;
  onReadMessage: (message: MessageModel) => void;
  updateTextInputState: () => void;
  getName: () => string;
  addMessage: (attributes: Partial<MessageAttributes>) => Promise<MessageModel>;
  isMediumGroup: () => boolean;
  getNickname: () => string | undefined;
  setNickname: (nickname: string | undefined) => Promise<void>;

  isPublic: () => boolean;
  isClosedGroup: () => boolean;
  isRss: () => boolean;
  isBlocked: () => boolean;
  isClosable: () => boolean;
  isOnline: () => boolean;
  isModerator: (id?: string) => boolean;


  lastMessage: string;
  messageCollection: Backbone.Collection<MessageModel>;

  // types to make more specific
  sendMessage: (body: any, attachments: any, quote: any, preview: any, groupInvitation: any, otherOptions: any) => Promise<void>;
  updateGroupAdmins: any;
  setLokiProfile: any;
  onSessionResetReceived: any;
  setVerifiedDefault: any;
  setVerified: any;
  setUnverified: any;
  getNumber: any;
  getProfileName: any;
  getAvatarPath: any;
  markRead: any;
  showChannelLightbox: any;
  deletePublicMessages: any;
  getMessagesWithTimestamp: any;
  makeQuote: any;
  unblock: any;
  deleteContact: any;
  endSession: any;
  block: any;
  copyPublicKey: any;
  getAvatar: any;
  notifyTyping: any;
  setSecondaryStatus: any;
  queueJob: any;
  sendGroupInfo: any;
  resetMessageSelection: any;
  onUpdateGroupName: any;
}
