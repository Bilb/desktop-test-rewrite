import React from 'react';
import { animation, Menu } from 'react-contexify';
import { useSelector } from 'react-redux';
import { ConversationTypeEnum } from '../../../models/conversation';
import { getFocusedSection } from '../../../state/selectors/section';
import { SectionType } from '../ActionsPanel';

import {
  getBlockMenuItem,
  getChangeNicknameMenuItem,
  getClearNicknameMenuItem,
  getCopyMenuItem,
  getDeleteContactMenuItem,
  getDeleteMessagesMenuItem,
  getInviteContactMenuItem,
  getLeaveGroupMenuItem,
  getMarkAllReadMenuItem,
  getPinConversationMenuItem,
} from './Menu';

export type PropsContextConversationItem = {
  id: string;
  triggerId: string;
  type: ConversationTypeEnum;
  isMe: boolean;
  isPublic?: boolean;
  isBlocked?: boolean;
  hasNickname?: boolean;
  isKickedFromGroup?: boolean;
  left?: boolean;
  theme?: any;
};

export const ConversationListItemContextMenu = (props: PropsContextConversationItem) => {
  const {
    id: conversationId,
    triggerId,
    isBlocked,
    isMe,
    isPublic,
    hasNickname,
    type,
    left,
    isKickedFromGroup,
  } = props;

  const isGroup = type === 'group';
  const isMessagesSection = useSelector(getFocusedSection) === SectionType.Message;

  return (
    <>
      <Menu id={triggerId} animation={animation.fade}>
        {getPinConversationMenuItem(isMessagesSection, conversationId)}
        {getBlockMenuItem(isMe, type === ConversationTypeEnum.PRIVATE, isBlocked, conversationId)}
        {getCopyMenuItem(isPublic, isGroup, conversationId)}
        {getMarkAllReadMenuItem(conversationId)}
        {getChangeNicknameMenuItem(isMe, isGroup, conversationId)}
        {getClearNicknameMenuItem(isMe, hasNickname, isGroup, conversationId)}

        {getDeleteMessagesMenuItem(isPublic, conversationId)}
        {getInviteContactMenuItem(isGroup, isPublic, conversationId)}
        {getDeleteContactMenuItem(isMe, isGroup, isPublic, left, isKickedFromGroup, conversationId)}
        {getLeaveGroupMenuItem(isKickedFromGroup, left, isGroup, isPublic, conversationId)}
      </Menu>
    </>
  );
};
