/* global i18n: false */
/* global Whisper: false */
/* global $: false */

/* eslint-disable no-new */

// eslint-disable-next-line func-names
(function() {
  'use strict';

  window.Whisper = window.Whisper || {};

  Whisper.LauncherView = Whisper.View.extend({
    className: 'launcher full-screen-flow',
    templateName: 'launcher',
    initialize() {
      this.render();
    },
    render_attributes() {
      return {
        title: 'Type in your password',
        buttonText: 'Unlock',
      };
    },
  });

})();
