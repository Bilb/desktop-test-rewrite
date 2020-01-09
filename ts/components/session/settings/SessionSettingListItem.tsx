import React from 'react';
import { SessionToggle } from '../SessionToggle';
import { SessionButton, SessionButtonColor, SessionButtonType } from '../SessionButton';



export enum SessionSettingType {
  Toggle = 'toggle',
  Options = 'options',
  Button = 'button',
}

interface Props {
  title: string;
  description?: string;
  type: SessionSettingType;
  value: boolean | string;
  onClick?: any;
  buttonText?: string;
  buttonColor?: SessionButtonColor;
}

export class SessionSettingListItem extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.state = {
    };
  }



  public render(): JSX.Element {
    const { title, description, type, value, onClick, buttonText, buttonColor } = this.props

    return (
      <div className="session-settings-item">
        <div className="session-settings-item__info">
          <div className="session-settings-item__title">
            { title }
          </div>

          { description && (
            <div className="session-settings-item__description">
              { description }
            </div>
          )}
        </div>

        { type === SessionSettingType.Toggle && (
          <div className="session-sessings-item__selection">
            <SessionToggle
              active={ Boolean(value) }
              onClick = { onClick }
            />
          </div>
        )}

        { type === SessionSettingType.Button && (
          <SessionButton
            text = { buttonText }
            buttonColor = { buttonColor }
            onClick = { onClick }
          />
        )}
        
      </div>
    );
  }

}
