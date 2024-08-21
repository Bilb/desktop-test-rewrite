import { SessionButtonShape, SessionButtonType } from '../../basic/SessionButton';

import { SessionSettingButtonItem, SessionSettingsTitleWithLink } from '../SessionSettingListItem';
import { saveLogToDesktop } from '../../../util/logging';

export const SettingsCategoryHelp = () => {
  return (
    <>
      <SessionSettingButtonItem
        onClick={() => {
          void saveLogToDesktop();
        }}
        buttonShape={SessionButtonShape.Square}
        buttonType={SessionButtonType.Solid}
        buttonText={window.i18n('showDebugLog')}
        title={window.i18n('reportIssue')}
        description={window.i18n('shareBugDetails')}
      />
      <SessionSettingsTitleWithLink
        title={window.i18n('surveyTitle')}
        link={'https://getsession.org/survey'}
      />
      <SessionSettingsTitleWithLink
        title={window.i18n('helpUsTranslateSession')}
        link={'https://getsession.org/translate'}
      />
      <SessionSettingsTitleWithLink
        title={window.i18n('faq')}
        link={'https://getsession.org/faq'}
      />
      <SessionSettingsTitleWithLink
        title={window.i18n('support')}
        link={'https://sessionapp.zendesk.com/hc/en-us'}
      />
    </>
  );
};
