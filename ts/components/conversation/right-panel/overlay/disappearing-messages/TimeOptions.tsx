import { isEmpty } from 'lodash';

import { DisappearTimeOptionDataTestId } from 'react';
import { TimerOptionsArray } from '../../../../../session/disappearing_messages/timerOptions';
import { PanelButtonGroup, PanelLabel } from '../../../../buttons/PanelButton';
import { PanelRadioButton } from '../../../../buttons/PanelRadioButton';
import { Localizer } from '../../../../basic/Localizer';

type TimerOptionsProps = {
  options: TimerOptionsArray | null;
  selected: number;
  setSelected: (value: number) => void;
  hasOnlyOneMode?: boolean;
  disabled?: boolean;
};

export const TimeOptions = (props: TimerOptionsProps) => {
  const { options, selected, setSelected, hasOnlyOneMode, disabled } = props;

  if (!options || isEmpty(options)) {
    return null;
  }

  return (
    <>
      {!hasOnlyOneMode && (
        <PanelLabel>
          <Localizer token="disappearingMessagesTimer" />
        </PanelLabel>
      )}
      <PanelButtonGroup>
        {options.map(option => {
          // we want  "time-option-3600-seconds", etc as accessibility id
          const parentDataTestId: DisappearTimeOptionDataTestId = `time-option-${option.value}-seconds`;
          return (
            <PanelRadioButton
              key={option.name}
              text={option.name}
              value={option.name}
              isSelected={selected === option.value}
              onSelect={() => {
                setSelected(option.value);
              }}
              disabled={disabled}
              dataTestId={parentDataTestId}
              radioInputDataTestId={`input-${parentDataTestId}`}
            />
          );
        })}
      </PanelButtonGroup>
    </>
  );
};
