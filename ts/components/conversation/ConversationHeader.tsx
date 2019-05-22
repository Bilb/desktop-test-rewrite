import React from 'react';

import { ContactName } from './ContactName';
import { Avatar } from '../Avatar';
import { Colors, Localizer } from '../../types/Util';
import {
  ContextMenu,
  ContextMenuTrigger,
  MenuItem,
  SubMenu,
} from 'react-contextmenu';

interface TimerOption {
  name: string;
  value: number;
}

interface Trigger {
  handleContextClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface Props {
  i18n: Localizer;
  isVerified: boolean;
  isKeysPending: boolean;
  name?: string;
  id: string;
  phoneNumber: string;
  profileName?: string;
  color: string;

  avatarPath?: string;
  isBlocked: boolean;
  isMe: boolean;
  isGroup: boolean;
  isOnline?: boolean;
  expirationSettingName?: string;
  showBackButton: boolean;
  timerOptions: Array<TimerOption>;
  hasNickname?: boolean;

  onSetDisappearingMessages: (seconds: number) => void;
  onDeleteMessages: () => void;
  onDeleteContact: () => void;
  onResetSession: () => void;

  onShowSafetyNumber: () => void;
  onShowAllMedia: () => void;
  onShowGroupMembers: () => void;
  onGoBack: () => void;

  onBlockUser: () => void;
  onUnblockUser: () => void;

  onClearNickname: () => void;
  onChangeNickname: () => void;

  onCopyPublicKey: () => void;
}

export class ConversationHeader extends React.Component<Props> {
  public captureMenuTriggerBound: (trigger: any) => void;
  public showMenuBound: (event: React.MouseEvent<HTMLDivElement>) => void;
  public menuTriggerRef: Trigger | null;

  public constructor(props: Props) {
    super(props);

    this.captureMenuTriggerBound = this.captureMenuTrigger.bind(this);
    this.showMenuBound = this.showMenu.bind(this);
    this.menuTriggerRef = null;
  }

  public captureMenuTrigger(triggerRef: Trigger) {
    this.menuTriggerRef = triggerRef;
  }
  public showMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (this.menuTriggerRef) {
      this.menuTriggerRef.handleContextClick(event);
    }
  }

  public renderBackButton() {
    const { onGoBack, showBackButton } = this.props;

    if (!showBackButton) {
      return null;
    }

    return (
      <div
        onClick={onGoBack}
        role="button"
        className="module-conversation-header__back-icon"
      />
    );
  }

  public renderTitle() {
    const { phoneNumber, i18n, profileName, isKeysPending } = this.props;

    return (
      <div className="module-conversation-header__title">
        <ContactName
          phoneNumber={phoneNumber}
          profileName={profileName}
          i18n={i18n}
        />
        {isKeysPending ? '(pending)' : null}
      </div>
    );
  }

  public renderAvatar() {
    const {
      avatarPath,
      color,
      i18n,
      isGroup,
      name,
      phoneNumber,
      profileName,
      isOnline,
    } = this.props;

    const borderColor = isOnline ? Colors.ONLINE : Colors.OFFLINE_LIGHT;

    return (
      <span className="module-conversation-header__avatar">
        <Avatar
          avatarPath={avatarPath}
          color={color}
          conversationType={isGroup ? 'group' : 'direct'}
          i18n={i18n}
          name={name}
          phoneNumber={phoneNumber}
          profileName={profileName}
          size={28}
          borderColor={borderColor}
          borderWidth={2}
        />
      </span>
    );
  }

  public renderExpirationLength() {
    const { expirationSettingName } = this.props;

    if (!expirationSettingName) {
      return null;
    }

    return (
      <div className="module-conversation-header__expiration">
        <div className="module-conversation-header__expiration__clock-icon" />
        <div className="module-conversation-header__expiration__setting">
          {expirationSettingName}
        </div>
      </div>
    );
  }

  public renderGear(triggerId: string) {
    const { showBackButton } = this.props;

    if (showBackButton) {
      return null;
    }

    return (
      <ContextMenuTrigger id={triggerId} ref={this.captureMenuTriggerBound}>
        <div
          role="button"
          onClick={this.showMenuBound}
          className="module-conversation-header__gear-icon"
        />
      </ContextMenuTrigger>
    );
  }

  /* tslint:disable:jsx-no-lambda react-this-binding-issue */
  public renderMenu(triggerId: string) {
    const {
      i18n,
      isBlocked,
      isMe,
      isGroup,
      onDeleteMessages,
      onDeleteContact,
      onResetSession,
      onSetDisappearingMessages,
      onShowAllMedia,
      onShowGroupMembers,
      onShowSafetyNumber,
      timerOptions,
      onBlockUser,
      onUnblockUser,
      hasNickname,
      onClearNickname,
      onChangeNickname,
      onCopyPublicKey,
    } = this.props;

    const disappearingTitle = i18n('disappearingMessages') as any;

    const blockTitle = isBlocked ? i18n('unblockUser') : i18n('blockUser');
    const blockHandler = isBlocked ? onUnblockUser : onBlockUser;

    return (
      <ContextMenu id={triggerId}>
        <SubMenu title={disappearingTitle}>
          {(timerOptions || []).map(item => (
            <MenuItem
              key={item.value}
              onClick={() => {
                onSetDisappearingMessages(item.value);
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </SubMenu>
        <MenuItem onClick={onShowAllMedia}>{i18n('viewAllMedia')}</MenuItem>
        {isGroup ? (
          <MenuItem onClick={onShowGroupMembers}>
            {i18n('showMembers')}
          </MenuItem>
        ) : null}
        {!isGroup && !isMe ? (
          <MenuItem onClick={onShowSafetyNumber}>
            {i18n('showSafetyNumber')}
          </MenuItem>
        ) : null}
        {!isGroup ? (
          <MenuItem onClick={onResetSession}>{i18n('resetSession')}</MenuItem>
        ) : null}
        {/* Only show the block on other conversations */}
        {!isMe ? (
          <MenuItem onClick={blockHandler}>{blockTitle}</MenuItem>
        ) : null}
        {!isMe ? (
          <MenuItem onClick={onChangeNickname}>
            {i18n('changeNickname')}
          </MenuItem>
        ) : null}
        {!isMe && hasNickname ? (
          <MenuItem onClick={onClearNickname}>{i18n('clearNickname')}</MenuItem>
        ) : null}
        <MenuItem onClick={onCopyPublicKey}>{i18n('copyPublicKey')}</MenuItem>
        <MenuItem onClick={onDeleteMessages}>{i18n('deleteMessages')}</MenuItem>
        {!isMe ? (
          <MenuItem onClick={onDeleteContact}>{i18n('deleteContact')}</MenuItem>
        ) : null}
      </ContextMenu>
    );
  }
  /* tslint:enable */

  public render() {
    const { id } = this.props;

    const triggerId = `${id}-${Date.now()}`;

    return (
      <div className="module-conversation-header">
        {this.renderBackButton()}
        <div className="module-conversation-header__title-container">
          <div className="module-conversation-header__title-flex">
            {this.renderAvatar()}
            {this.renderTitle()}
          </div>
        </div>
        {this.renderExpirationLength()}
        {this.renderGear(triggerId)}
        {this.renderMenu(triggerId)}
      </div>
    );
  }
}
