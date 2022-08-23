import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUpdate from 'react-use/lib/useUpdate';
import { SettingsKey } from '../../../data/settings-key';
import { useSet } from '../../../hooks/useSet';
import { ToastUtils } from '../../../session/utils';
import { toggleAudioAutoplay } from '../../../state/ducks/userConfig';
import { getBlockedPubkeys } from '../../../state/selectors/conversations';
import { getAudioAutoplay } from '../../../state/selectors/userConfig';
import { MemberListItem } from '../../MemberListItem';

import {
  SessionSettingsItemWrapper,
  SessionToggleWithDescription,
} from '../SessionSettingListItem';

async function toggleCommunitiesPruning() {
  try {
    const newValue = !(await window.getOpengroupPruning());

    // make sure to write it here too, as this is the value used on the UI to mark the toggle as true/false
    await window.setSettingValue(SettingsKey.settingsOpengroupPruning, newValue);
    await window.setOpengroupPruning(newValue);
    ToastUtils.pushRestartNeeded();
  } catch (e) {
    window.log.warn('toggleCommunitiesPruning change error:', e);
  }
}

const CommunitiesPruningSetting = () => {
  const forceUpdate = useUpdate();
  const isOpengroupPruningEnabled = Boolean(
    window.getSettingValue(SettingsKey.settingsOpengroupPruning)
  );
  return (
    <SessionToggleWithDescription
      onClickToggle={async () => {
        await toggleCommunitiesPruning();
        forceUpdate();
      }}
      title={window.i18n('pruneSettingTitle')}
      description={window.i18n('pruneSettingDescription')}
      active={isOpengroupPruningEnabled}
    />
  );
};

const SpellCheckSetting = () => {
  const forceUpdate = useUpdate();

  const isSpellCheckActive =
    window.getSettingValue(SettingsKey.settingsSpellCheck) === undefined
      ? true
      : window.getSettingValue(SettingsKey.settingsSpellCheck);
  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        window.toggleSpellCheck();
        forceUpdate();
      }}
      title={window.i18n('spellCheckTitle')}
      description={window.i18n('spellCheckDescription')}
      active={isSpellCheckActive}
    />
  );
};

const AudioMessageAutoPlaySetting = () => {
  const audioAutoPlay = useSelector(getAudioAutoplay);
  const dispatch = useDispatch();
  const forceUpdate = useUpdate();

  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        dispatch(toggleAudioAutoplay());
        forceUpdate();
      }}
      title={window.i18n('audioMessageAutoplayTitle')}
      description={window.i18n('audioMessageAutoplayDescription')}
      active={audioAutoPlay}
    />
  );
};

const NoBlockedContacts = () => {
  return (
    <SessionSettingsItemWrapper
      inline={true}
      description={window.i18n('noBlockedContacts')}
      title={''}
    />
  );
};

const BlockedContactsList = (props: { blockedNumbers: Array<string> }) => {
  const {
    uniqueValues: selectedIds,
    addTo: addToSelected,
    removeFrom: removeFromSelected,
  } = useSet<string>([]);

  const blockedEntries = props.blockedNumbers.map(blockedEntry => {
    return (
      <MemberListItem
        pubkey={blockedEntry}
        isSelected={selectedIds.includes(blockedEntry)}
        key={blockedEntry}
        onSelect={addToSelected}
        onUnselect={removeFromSelected}
      />
    );
  });

  return (
    <>
      <SessionSettingsItemWrapper
        title={window.i18n('blockedSettingsTitle')}
        inline={false}
        children={blockedEntries}
      />
    </>
  );
};

export const CategoryConversations = () => {
  const blockedNumbers = useSelector(getBlockedPubkeys);

  return (
    <>
      <CommunitiesPruningSetting />
      <SpellCheckSetting />
      <AudioMessageAutoPlaySetting />

      {blockedNumbers?.length ? (
        <BlockedContactsList blockedNumbers={blockedNumbers} />
      ) : (
        <NoBlockedContacts />
      )}
    </>
  );
};
