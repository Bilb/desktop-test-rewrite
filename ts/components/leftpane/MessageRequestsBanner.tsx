import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getConversationRequests } from '../../state/selectors/conversations';
import { getIsMessageRequestsEnabled } from '../../state/selectors/userConfig';
import { SessionIcon, SessionIconSize, SessionIconType } from '../icon';

const StyledMessageRequestBanner = styled.div`
  height: 64px;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  padding: 8px 12px; // adjusting for unread border always being active
  align-items: center;
  cursor: pointer;

  background: var(--color-request-banner-background);

  transition: var(--session-transition-duration);

  &:hover {
    background: var(--color-clickable-hovered);
  }
`;

const StyledMessageRequestBannerHeader = styled.span`
  font-weight: bold;
  font-size: 15px;
  color: var(--color-text-subtle);
  padding-left: var(--margins-xs);
  margin-inline-start: 12px;
  line-height: 18px;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledCircleIcon = styled.div`
  padding-left: var(--margins-xs);
`;

const StyledUnreadCounter = styled.div`
  font-weight: bold;
  border-radius: var(--margins-sm);
  background-color: var(--color-request-banner-unread-background);
  margin-left: 10px;
  min-width: 20px;
  height: 20px;
  line-height: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--margins-xs);
`;

const StyledGridContainer = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  background-color: var(--color-request-banner-icon-background);
`;

export const CirclularIcon = (props: { iconType: SessionIconType; iconSize: SessionIconSize }) => {
  const { iconSize, iconType } = props;

  return (
    <StyledCircleIcon>
      <StyledGridContainer>
        <SessionIcon
          iconType={iconType}
          iconSize={iconSize}
          iconColor="var(--color-request-banner-icon)"
        />
      </StyledGridContainer>
    </StyledCircleIcon>
  );
};

export const MessageRequestsBanner = (props: { handleOnClick: () => any }) => {
  const { handleOnClick } = props;
  const conversationRequests = useSelector(getConversationRequests);
  const showRequestBannerEnabled = useSelector(getIsMessageRequestsEnabled);

  if (!conversationRequests.length || !showRequestBannerEnabled) {
    return null;
  }

  return (
    <StyledMessageRequestBanner onClick={handleOnClick}>
      <CirclularIcon iconType="messageRequest" iconSize="medium" />
      <StyledMessageRequestBannerHeader>
        {window.i18n('messageRequests')}
      </StyledMessageRequestBannerHeader>
      <StyledUnreadCounter>
        <div>{conversationRequests.length || 0}</div>
      </StyledUnreadCounter>
    </StyledMessageRequestBanner>
  );
};
