import React from 'react';
import classNames from 'classnames';

import { icons, SessionIconSize, SessionIconType } from './icon/Icons';

export interface Props {
  iconType: SessionIconType;
  iconSize: SessionIconSize;
  iconColor: string;
  iconPadded: boolean;
  iconRotation: number;
  onClick: any;
}

export class SessionIcon extends React.PureComponent<Props> {
  public static defaultProps = {
    iconSize: SessionIconSize.Medium,
    iconColor: '',
    iconRotation: 0,
    iconPadded: false,
    onClick: () => null,
  };

  constructor(props: any) {
    super(props);
  }

  public render() {
    const {
      iconType,
      iconSize,
      iconColor,
      iconRotation,
      iconPadded,
    } = this.props;

    let iconDimensions;
    switch (iconSize) {
      case SessionIconSize.Small:
        iconDimensions = '15';
        break;
      case SessionIconSize.Medium:
        iconDimensions = '20';
        break;
      case SessionIconSize.Large:
        iconDimensions = '30';
        break;
      default:
        iconDimensions = '20';
    }

    const iconDef = icons[iconType];

    const styles = {
      transform: `rotate(${iconRotation}deg)`,
    };

    return (
      <svg
        className={classNames(
          'session-icon',
          iconType,
          iconPadded ? 'padded' : ''
        )}
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        viewBox={iconDef.viewBox}
        width={iconDimensions}
        height={iconDimensions}
        style={styles}
      >
        <path d={iconDef.path} fill={iconColor} />
      </svg>
    );
  }
}
