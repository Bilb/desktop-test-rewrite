(function () {
    'use strict';

    window.Whisper = window.Whisper || {};

    Whisper.AppView = Backbone.View.extend({
        initialize: function(options) {
          this.inboxView = null;
          this.installView = null;
        },
        events: {
            'click .openInstaller': 'openInstaller',
            'click .openStandalone': 'openStandalone',
            'openInbox': 'openInbox',
        },
        openView: function(view) {
          this.el.innerHTML = "";
          this.el.append(view.el);
          this.delegateEvents();
        },
        openDebugLog: function() {
            this.closeDebugLog();
            this.debugLogView = new Whisper.DebugLogView();
            this.debugLogView.$el.appendTo(this.el);
        },
        closeDebugLog: function() {
          if (this.debugLogView) {
            this.debugLogView.remove();
            this.debugLogView = null;
          }
        },
        openInstallChoice: function() {
          this.closeInstallChoice();
          var installChoice = this.installChoice = new Whisper.InstallChoiceView();

          this.listenTo(installChoice, 'install-new', this.openInstaller.bind(this));
          this.listenTo(installChoice, 'install-import', this.openImporter.bind(this));

          this.openView(this.installChoice);
        },
        closeInstallChoice: function() {
          if (this.installChoice) {
            this.installChoice.remove();
            this.installChoice = null;
          }
        },
        openImporter: function() {
          this.closeImporter();
          this.closeInstallChoice();
          var importView = this.importView = new Whisper.ImportView();
          this.listenTo(importView, 'cancel', this.openInstallChoice.bind(this));
          this.openView(this.importView);
        },
        closeImporter: function() {
          if (this.importView) {
            this.importView.remove();
            this.importView = null;
          }
        },
        openInstaller: function() {
          this.closeInstaller();
          this.closeInstallChoice();
          var installView = this.installView = new Whisper.InstallView();
          this.listenTo(installView, 'cancel', this.openInstallChoice.bind(this));
          this.openView(this.installView);
        },
        closeInstaller: function() {
          if (this.installView) {
            this.installView.remove();
            this.installView = null;
          }
        },
        openStandalone: function() {
          if (window.config.environment !== 'production') {
            this.closeInstaller();
            this.installView = new Whisper.StandaloneRegistrationView();
            this.openView(this.installView);
          }
        },
        openInbox: function(options) {
          options = options || {};
          _.defaults(options, {initialLoadComplete: false});

          console.log('open inbox');
          this.closeInstaller();

          if (!this.inboxView) {
            // We create the inbox immediately to make sure we're ready to receive the
            //   empty event after getting down to zero messages in the queue.
            this.inboxView = new Whisper.InboxView({
              model: self,
              window: window,
              initialLoadComplete: options.initialLoadComplete
            });
            return ConversationController.loadPromise().then(function() {
                this.openView(this.inboxView);
            }.bind(this));
          } else {
            if (!$.contains(this.el, this.inboxView.el)) {
                this.openView(this.inboxView);
            }
            window.focus(); // FIXME
            return Promise.resolve();
          }
        },
        onEmpty: function() {
          var view = this.inboxView;
          if (view) {
            view.onEmpty();
          }
        },
        onProgress: function(count) {
          var view = this.inboxView;
          if (view) {
            view.onProgress(count);
          }
        },
        openConversation: function(conversation) {
          if (conversation) {
            this.openInbox().then(function() {
              this.inboxView.openConversation(null, conversation);
            }.bind(this));
          }
        },
    });
})();
