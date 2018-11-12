import React from 'react';
import classNames from 'classnames';

import { Localizer } from '../../types/Util';
import { MessageBody } from './MessageBody';

interface Props {
  text?: string;
  direction: 'incoming' | 'outgoing';
  status: string;
  i18n: Localizer;
  friendStatus: 'pending' | 'accepted' | 'declined';
  onAccept: () => void;
  onDecline: () => void;
  onDelete: () => void;
  onRetrySend: () => void;
}

export class FriendRequest extends React.Component<Props> {
  public getStringId() {
    const { friendStatus, direction } = this.props;

    switch (friendStatus) {
      case 'pending':
        return `${direction}FriendRequestPending`;
      case 'accepted':
        return `friendRequestAccepted`;
      case 'declined':
        return `friendRequestDeclined`;
      default:
        throw new Error(`Invalid friend request status: ${friendStatus}`);
    }
  }

  public renderContents() {
    const { direction, i18n, text } = this.props;
    const id = this.getStringId();

    return (
      <div>
        <div className={`module-friend-request__title module-friend-request__title--${direction}`}>{i18n(id)}</div>
        {!!text &&
          <div dir="auto">
            <MessageBody text={text || ''} i18n={i18n} />
          </div>
        }
      </div>
      
    );
  }

  public renderButtons() {
      const { friendStatus, direction, status, onAccept, onDecline, onDelete, onRetrySend } = this.props;

      if (direction === 'incoming') {
        if (friendStatus === 'pending') {
          return (
              <div className={`module-message__metadata module-friend-request__buttonContainer module-friend-request__buttonContainer--${direction}`}>
                <button onClick={onAccept}>Accept</button>
                <button onClick={onDecline}>Decline</button>
              </div>
          );
        } else if (friendStatus === 'declined') {
          return (
            <div className={`module-message__metadata module-friend-request__buttonContainer module-friend-request__buttonContainer--${direction}`}>
              <button onClick={onDelete}>Delete Conversation</button>
            </div>
          );
        }
      } else {
        // Render the retry button if we errored
        if (status === 'error') {
          return (
            <div className={`module-message__metadata module-friend-request__buttonContainer module-friend-request__buttonContainer--${direction}`}>
              <button onClick={onRetrySend}>Retry Send</button>
            </div>
          );
        }
      }
      return null;
  }

  public renderError(isCorrectSide: boolean) {
    const { status, direction } = this.props;

    if (!isCorrectSide || status !== 'error') {
      return null;
    }

    return (
      <div className="module-message__error-container">
        <div
          className={classNames(
            'module-message__error',
            `module-message__error--${direction}`
          )}
        />
      </div>
    );
  }

  // Renders 'sending', 'read' icons
  public renderMetadata() {
    const { direction, status } = this.props;
    if (direction !== 'outgoing' || status === 'error') return null;

    return (
      <div className="module-message__metadata">
        <span className="module-message__metadata__spacer" />
        <div
          className={classNames(
            'module-message__metadata__status-icon',
            `module-message__metadata__status-icon--sending`,
          )}
        />
      </div>
    );
  }

  public render() {
    const { direction } = this.props;
    
    //  const showRetry = status === 'error' && direction === 'outgoing';
    return (
      <div className={`module-message module-message--${direction} module-message-friend-request`}>
         {this.renderError(direction === 'incoming')}
        <div className={`module-message__container module-message__container--${direction} module-message-friend-request__container`}>
            <div className={`module-message__text module-message__text--${direction}`}>
                {this.renderContents()}
                {this.renderMetadata()}
                {this.renderButtons()}
            </div>
        </div>
        {this.renderError(direction === 'outgoing')}
      </div>
    );
  }
}
