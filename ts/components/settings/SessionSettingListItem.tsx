import React from 'react';
import {
  SessionButton2,
  SessionButtonColor,
  SessionButtonShape,
  SessionButtonType,
} from '../basic/SessionButton2';
import { SessionToggle } from '../basic/SessionToggle';
import { SessionConfirmDialogProps } from '../dialog/SessionConfirm';
import styled from 'styled-components';
import { SessionIconButton } from '../icon';

type ButtonSettingsProps = {
  title?: string;
  description?: string;
  buttonColor?: SessionButtonColor;
  buttonType?: SessionButtonType;
  buttonShape?: SessionButtonShape;
  buttonText: string;
  dataTestId?: string;
  onClick: () => void;
};

export const StyledDescriptionSettingsItem = styled.div`
  font-family: var(--font-default);
  font-size: var(--font-size-sm);
  font-weight: 400;
  max-width: 700px;
  color: var(--color-text-subtle);
`;

export const StyledTitleSettingsItem = styled.div`
  line-height: 1.7;
  font-size: var(--font-size-lg);
  font-weight: bold;
`;

const StyledInfo = styled.div`
  padding-inline-end: var(--margins-lg);
`;

const StyledDescriptionContainer = styled(StyledDescriptionSettingsItem)`
  display: flex;
  align-items: center;
`;

export const StyledSettingItem = styled.div`
  font-size: var(--font-size-md);
  padding: var(--margins-lg);

  background: var(--color-cell-background);
  color: var(--color-text);
  border-bottom: var(--border-session);
`;

const StyledSettingItemInline = styled(StyledSettingItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: var(--default-duration);
`;

const StyledSettingItemClickable = styled(StyledSettingItemInline)`
  :hover {
    background: var(--color-clickable-hovered);
    cursor: pointer;
  }
`;

export const SettingsTitleAndDescription = (props: {
  title?: string;
  description?: string;
  childrenDescription?: React.ReactNode;
}) => {
  const { description, childrenDescription, title } = props;
  return (
    <StyledInfo>
      <StyledTitleSettingsItem>{title}</StyledTitleSettingsItem>
      <StyledDescriptionContainer>
        {description && (
          <StyledDescriptionSettingsItem>{description}</StyledDescriptionSettingsItem>
        )}
        <>{childrenDescription}</>
      </StyledDescriptionContainer>
    </StyledInfo>
  );
};

export const SessionSettingsItemWrapper = (props: {
  inline: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  childrenDescription?: React.ReactNode;
}) => {
  const { inline, children, description, title, childrenDescription } = props;
  const ComponentToRender = inline ? StyledSettingItemInline : StyledSettingItem;
  return (
    <ComponentToRender>
      <SettingsTitleAndDescription
        title={title}
        description={description}
        childrenDescription={childrenDescription}
      />
      {children}
    </ComponentToRender>
  );
};

export const SessionSettingsTitleWithLink = (props: { title: string; onClick: () => void }) => {
  const { onClick, title } = props;
  return (
    <StyledSettingItemClickable onClick={onClick}>
      <SettingsTitleAndDescription title={title} />
      <SessionIconButton iconSize={'large'} iconType="chevron" iconRotation={270} />
    </StyledSettingItemClickable>
  );
};

export const SessionToggleWithDescription = (props: {
  title?: string;
  description?: string;
  active: boolean;
  onClickToggle: () => void;
  confirmationDialogParams?: SessionConfirmDialogProps;
  childrenDescription?: React.ReactNode; // if set, those elements will be appended next to description field (only used for typing message settings as of now)
}) => {
  const {
    title,
    description,
    active,
    onClickToggle,
    confirmationDialogParams,
    childrenDescription,
  } = props;

  return (
    <SessionSettingsItemWrapper
      title={title}
      description={description}
      inline={true}
      childrenDescription={childrenDescription}
    >
      <SessionToggle
        active={active}
        onClick={onClickToggle}
        confirmationDialogParams={confirmationDialogParams}
      />
    </SessionSettingsItemWrapper>
  );
};

export const SessionSettingButtonItem = (props: ButtonSettingsProps) => {
  const {
    title,
    description,
    buttonColor,
    buttonType,
    buttonShape,
    buttonText,
    dataTestId,
    onClick,
  } = props;

  return (
    <SessionSettingsItemWrapper title={title} description={description} inline={true}>
      <SessionButton2
        dataTestId={dataTestId}
        text={buttonText}
        buttonColor={buttonColor}
        buttonType={buttonType}
        buttonShape={buttonShape}
        onClick={onClick}
      />
    </SessionSettingsItemWrapper>
  );
};
