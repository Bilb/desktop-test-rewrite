export type LocalizerKeys =
  | 'about'
  | 'accept'
  | 'accountIDCopy'
  | 'accountIdEnter'
  | 'accountIdEnterYourFriends'
  | 'accountIdYours'
  | 'activeMembers'
  | 'add'
  | 'addACaption'
  | 'addAsModerator'
  | 'addModerator'
  | 'addModerators'
  | 'addingContacts'
  | 'anonymous'
  | 'answeredACall'
  | 'appMenuHide'
  | 'appMenuHideOthers'
  | 'appMenuQuit'
  | 'appMenuUnhide'
  | 'appearanceSettingsTitle'
  | 'areYouSureClearDevice'
  | 'areYouSureDeleteDeviceOnly'
  | 'areYouSureDeleteEntireAccount'
  | 'audio'
  | 'audioMessageAutoplayDescription'
  | 'audioMessageAutoplayTitle'
  | 'audioNotificationsSettingsTitle'
  | 'audioPermissionNeeded'
  | 'audioPermissionNeededTitle'
  | 'autoUpdateDownloadButtonLabel'
  | 'autoUpdateDownloadInstructions'
  | 'autoUpdateDownloadedMessage'
  | 'autoUpdateLaterButtonLabel'
  | 'autoUpdateNewVersionInstructions'
  | 'autoUpdateNewVersionMessage'
  | 'autoUpdateNewVersionTitle'
  | 'autoUpdateRestartButtonLabel'
  | 'autoUpdateSettingDescription'
  | 'autoUpdateSettingTitle'
  | 'banUser'
  | 'banUserAndDeleteAll'
  | 'blindedMsgReqsSettingDesc'
  | 'blindedMsgReqsSettingTitle'
  | 'block'
  | 'blocked'
  | 'blockedSettingsTitle'
  | 'callMediaPermissionsDescription'
  | 'callMediaPermissionsDialogContent'
  | 'callMediaPermissionsDialogTitle'
  | 'callMediaPermissionsTitle'
  | 'callMissed'
  | 'callMissedCausePermission'
  | 'callMissedNotApproved'
  | 'callMissedTitle'
  | 'cameraPermissionNeeded'
  | 'cameraPermissionNeededTitle'
  | 'cancel'
  | 'cannotMixImageAndNonImageAttachments'
  | 'cannotRemoveCreatorFromGroup'
  | 'cannotRemoveCreatorFromGroupDesc'
  | 'cannotUpdate'
  | 'cannotUpdateDetail'
  | 'changeAccountPasswordDescription'
  | 'changeAccountPasswordTitle'
  | 'changeNickname'
  | 'changeNicknameMessage'
  | 'changePassword'
  | 'changePasswordInvalid'
  | 'changePasswordTitle'
  | 'changePasswordToastDescription'
  | 'chooseAnAction'
  | 'classicDarkThemeTitle'
  | 'classicLightThemeTitle'
  | 'clear'
  | 'clearAll'
  | 'clearAllConfirmationBody'
  | 'clearAllConfirmationTitle'
  | 'clearAllData'
  | 'clearAllReactions'
  | 'clearDataSettingsTitle'
  | 'clearDevice'
  | 'clearNickname'
  | 'clickToTrustContact'
  | 'close'
  | 'closedGroupInviteFailMessage'
  | 'closedGroupInviteFailMessagePlural'
  | 'closedGroupInviteFailTitle'
  | 'closedGroupInviteFailTitlePlural'
  | 'closedGroupInviteOkText'
  | 'closedGroupInviteSuccessMessage'
  | 'closedGroupInviteSuccessTitle'
  | 'closedGroupInviteSuccessTitlePlural'
  | 'closedGroupMaxSize'
  | 'confirm'
  | 'confirmNewPassword'
  | 'confirmPassword'
  | 'connectToServerFail'
  | 'connectToServerSuccess'
  | 'connectingToServer'
  | 'contactAvatarAlt'
  | 'contactsHeader'
  | 'contextMenuNoSuggestions'
  | 'continue'
  | 'continueYourSession'
  | 'conversationsHeader'
  | 'conversationsNone'
  | 'conversationsSettingsTitle'
  | 'copiedToClipboard'
  | 'copyErrorAndQuit'
  | 'copyMessage'
  | 'copyOpenGroupURL'
  | 'couldntFindServerMatching'
  | 'create'
  | 'createClosedGroupNamePrompt'
  | 'createClosedGroupPlaceholder'
  | 'createConversationNewContact'
  | 'createConversationNewGroup'
  | 'createGroup'
  | 'createPassword'
  | 'databaseError'
  | 'debugLog'
  | 'debugLogExplanation'
  | 'decline'
  | 'declineRequestMessage'
  | 'delete'
  | 'deleteAccountFromLogin'
  | 'deleteAccountWarning'
  | 'deleteContactConfirmation'
  | 'deleteConversation'
  | 'deleteConversationConfirmation'
  | 'deleteConversationFailed'
  | 'deleteConversationFailedPleaseTryAgain'
  | 'deleteForEveryone'
  | 'deleteJustForMe'
  | 'deleteMessageQuestion'
  | 'deleteMessages'
  | 'deleteMessagesConfirmation'
  | 'deleteMessagesQuestion'
  | 'deleted'
  | 'destination'
  | 'device'
  | 'deviceOnly'
  | 'dialogClearAllDataDeletionFailedDesc'
  | 'dialogClearAllDataDeletionFailedMultiple'
  | 'dialogClearAllDataDeletionFailedTitle'
  | 'dialogClearAllDataDeletionFailedTitleQuestion'
  | 'dialogClearAllDataDeletionQuestion'
  | 'disabledDisappearingMessages'
  | 'disappearingMessages'
  | 'disappearingMessagesDisabled'
  | 'disappearingMessagesModeAfterRead'
  | 'disappearingMessagesModeAfterReadSubtitle'
  | 'disappearingMessagesModeAfterSend'
  | 'disappearingMessagesModeAfterSendSubtitle'
  | 'disappearingMessagesModeLabel'
  | 'disappearingMessagesModeLegacy'
  | 'disappearingMessagesModeLegacySubtitle'
  | 'disappearingMessagesModeOff'
  | 'disappearingMessagesModeOutdated'
  | 'disappears'
  | 'displayName'
  | 'displayNameDescription'
  | 'displayNameEmpty'
  | 'displayNameErrorDescriptionShorter'
  | 'displayNameErrorNew'
  | 'displayNameNew'
  | 'displayNamePick'
  | 'displayNameTooLong'
  | 'document'
  | 'documents'
  | 'documentsEmptyState'
  | 'done'
  | 'downloadAttachment'
  | 'duration'
  | 'editGroup'
  | 'editGroupName'
  | 'editMenuCopy'
  | 'editMenuCut'
  | 'editMenuDeleteContact'
  | 'editMenuDeleteGroup'
  | 'editMenuPaste'
  | 'editMenuRedo'
  | 'editMenuSelectAll'
  | 'editMenuUndo'
  | 'editProfileModalTitle'
  | 'emptyGroupNameError'
  | 'enable'
  | 'endCall'
  | 'enterAnOpenGroupURL'
  | 'enterDisplayName'
  | 'enterKeySettingDescription'
  | 'enterKeySettingTitle'
  | 'enterNewLineDescription'
  | 'enterNewPassword'
  | 'enterPassword'
  | 'enterSendNewMessageDescription'
  | 'entireAccount'
  | 'error'
  | 'establishingConnection'
  | 'expandedReactionsText'
  | 'expirationDuration'
  | 'expirationType'
  | 'failed'
  | 'failedResolveOns'
  | 'failedToAddAsModerator'
  | 'failedToRemoveFromModerator'
  | 'failedToSendMessage'
  | 'faq'
  | 'fileId'
  | 'fileSize'
  | 'fileSizeWarning'
  | 'fileType'
  | 'followSetting'
  | 'followSettingDisabled'
  | 'followSettingTimeAndType'
  | 'from'
  | 'getStarted'
  | 'goToReleaseNotes'
  | 'goToSupportPage'
  | 'groupMembers'
  | 'groupNamePlaceholder'
  | 'helpSettingsTitle'
  | 'helpUsTranslateSession'
  | 'hide'
  | 'hideBanner'
  | 'hideConversation'
  | 'hideMenuBarDescription'
  | 'hideMenuBarTitle'
  | 'hideNoteToSelfConfirmation'
  | 'hideRequestBanner'
  | 'hideRequestBannerDescription'
  | 'iAmSure'
  | 'image'
  | 'imageAttachmentAlt'
  | 'imageCaptionIconAlt'
  | 'incomingCallFrom'
  | 'incomingError'
  | 'invalidAccountId'
  | 'invalidGroupNameTooLong'
  | 'invalidGroupNameTooShort'
  | 'invalidOldPassword'
  | 'invalidOpenGroupUrl'
  | 'invalidPassword'
  | 'invalidPubkeyFormat'
  | 'inviteContacts'
  | 'join'
  | 'joinACommunity'
  | 'joinOpenGroup'
  | 'joinOpenGroupAfterInvitationConfirmationDesc'
  | 'joinOpenGroupAfterInvitationConfirmationTitle'
  | 'joinedTheGroup'
  | 'keepDisabled'
  | 'kickedFromTheGroup'
  | 'learnMore'
  | 'leave'
  | 'leaveAndRemoveForEveryone'
  | 'leaveCommunity'
  | 'leaveCommunityFailed'
  | 'leaveCommunityFailedPleaseTryAgain'
  | 'leaveGroup'
  | 'leaveGroupConfirmation'
  | 'leaveGroupConfirmationAdmin'
  | 'leaveGroupConfirmationOnlyAdmin'
  | 'leaveGroupConfirmationOnlyAdminWarning'
  | 'leaveGroupConrirmationOnlyAdminLegacy'
  | 'leaveGroupFailed'
  | 'leaveGroupFailedPleaseTryAgain'
  | 'leaving'
  | 'leftTheGroup'
  | 'lightboxImageAlt'
  | 'linkDevice'
  | 'linkPreviewDescription'
  | 'linkPreviewsConfirmMessage'
  | 'linkPreviewsTitle'
  | 'linkVisitWarningMessage'
  | 'linkVisitWarningTitle'
  | 'loadAccountProgressMessage'
  | 'loading'
  | 'mainMenuEdit'
  | 'mainMenuFile'
  | 'mainMenuHelp'
  | 'mainMenuView'
  | 'mainMenuWindow'
  | 'markAllAsRead'
  | 'markUnread'
  | 'matchThemeSystemSettingDescription'
  | 'matchThemeSystemSettingTitle'
  | 'maxPasswordAttempts'
  | 'maximumAttachments'
  | 'media'
  | 'mediaEmptyState'
  | 'mediaMessage'
  | 'mediaPermissionsDescription'
  | 'mediaPermissionsTitle'
  | 'members'
  | 'message'
  | 'messageBody'
  | 'messageBodyMissing'
  | 'messageDeletedPlaceholder'
  | 'messageDeletionForbidden'
  | 'messageHash'
  | 'messageInfo'
  | 'messageNewDescription'
  | 'messageRequestAccepted'
  | 'messageRequestAcceptedOurs'
  | 'messageRequestAcceptedOursNoName'
  | 'messageRequestPending'
  | 'messageRequests'
  | 'messageRequestsAcceptDescription'
  | 'messageWillDisappear'
  | 'messagesHeader'
  | 'moreInformation'
  | 'multipleJoinedTheGroup'
  | 'multipleKickedFromTheGroup'
  | 'multipleLeftTheGroup'
  | 'mustBeApproved'
  | 'nameAndMessage'
  | 'nameOnly'
  | 'newMessage'
  | 'newMessages'
  | 'next'
  | 'nicknamePlaceholder'
  | 'noAudioInputFound'
  | 'noAudioOutputFound'
  | 'noBlockedContacts'
  | 'noCameraFound'
  | 'noContactsForGroup'
  | 'noContactsToAdd'
  | 'noGivenPassword'
  | 'noMediaUntilApproved'
  | 'noMembersInThisGroup'
  | 'noMessageRequestsPending'
  | 'noMessagesInBlindedDisabledMsgRequests'
  | 'noMessagesInEverythingElse'
  | 'noMessagesInNoteToSelf'
  | 'noMessagesInReadOnly'
  | 'noModeratorsToRemove'
  | 'noNameOrMessage'
  | 'noSearchResults'
  | 'notApplicable'
  | 'noteToSelf'
  | 'notificationForConvo'
  | 'notificationForConvo_all'
  | 'notificationForConvo_disabled'
  | 'notificationForConvo_mentions_only'
  | 'notificationFrom'
  | 'notificationMostRecent'
  | 'notificationMostRecentFrom'
  | 'notificationPreview'
  | 'notificationSettingsDialog'
  | 'notificationSubtitle'
  | 'notificationsSettingsContent'
  | 'notificationsSettingsTitle'
  | 'oceanDarkThemeTitle'
  | 'oceanLightThemeTitle'
  | 'offline'
  | 'ok'
  | 'onboardingAccountCreate'
  | 'onboardingAccountCreated'
  | 'onboardingAccountExists'
  | 'onboardingBubbleWelcomeToSession'
  | 'onboardingHitThePlusButton'
  | 'onboardingRecoveryPassword'
  | 'onboardingTosPrivacy'
  | 'oneNonImageAtATimeToast'
  | 'onionPathIndicatorDescription'
  | 'onionPathIndicatorTitle'
  | 'onlyAdminCanRemoveMembers'
  | 'onlyAdminCanRemoveMembersDesc'
  | 'onlyGroupAdminsCanChange'
  | 'onsErrorNotRecognised'
  | 'open'
  | 'openGroupInvitation'
  | 'openGroupURL'
  | 'openMessageRequestInbox'
  | 'openMessageRequestInboxDescription'
  | 'or'
  | 'orJoinOneOfThese'
  | 'originalMessageNotFound'
  | 'otherPlural'
  | 'otherSingular'
  | 'password'
  | 'passwordCharacterError'
  | 'passwordCreate'
  | 'passwordLengthError'
  | 'passwordTypeError'
  | 'passwordViewTitle'
  | 'passwordsDoNotMatch'
  | 'permissionsSettingsTitle'
  | 'photo'
  | 'pickClosedGroupMember'
  | 'pinConversation'
  | 'pleaseWaitOpenAndOptimizeDb'
  | 'previewThumbnail'
  | 'primaryColor'
  | 'primaryColorBlue'
  | 'primaryColorGreen'
  | 'primaryColorOrange'
  | 'primaryColorPink'
  | 'primaryColorPurple'
  | 'primaryColorRed'
  | 'primaryColorYellow'
  | 'privacyPolicy'
  | 'privacySettingsTitle'
  | 'pruneSettingDescription'
  | 'pruneSettingTitle'
  | 'publicChatExists'
  | 'quoteThumbnailAlt'
  | 'rateLimitReactMessage'
  | 'reactionListCountPlural'
  | 'reactionListCountSingular'
  | 'reactionNotification'
  | 'reactionPopup'
  | 'reactionPopupMany'
  | 'reactionPopupOne'
  | 'reactionPopupThree'
  | 'reactionPopupTwo'
  | 'read'
  | 'readReceiptSettingDescription'
  | 'readReceiptSettingTitle'
  | 'received'
  | 'recoveryPasswordEnter'
  | 'recoveryPasswordErrorMessageGeneric'
  | 'recoveryPasswordErrorMessageIncorrect'
  | 'recoveryPasswordErrorMessageShort'
  | 'recoveryPasswordWarningSendDescription'
  | 'recoveryPhraseSavePromptMain'
  | 'remove'
  | 'removeAccountPasswordDescription'
  | 'removeAccountPasswordTitle'
  | 'removeFromModerators'
  | 'removeModerators'
  | 'removePassword'
  | 'removePasswordInvalid'
  | 'removePasswordTitle'
  | 'removePasswordToastDescription'
  | 'removeResidueMembers'
  | 'replyToMessage'
  | 'replyingToMessage'
  | 'reportIssue'
  | 'requestsPlaceholder'
  | 'requestsSubtitle'
  | 'resend'
  | 'resolution'
  | 'ringing'
  | 'save'
  | 'saveLogToDesktop'
  | 'saveRecoveryPassword'
  | 'saveRecoveryPasswordDescription'
  | 'saved'
  | 'savedMessages'
  | 'savedTheFile'
  | 'searchFor...'
  | 'searchForContactsOnly'
  | 'searchMessagesHeader'
  | 'selectMessage'
  | 'sendFailed'
  | 'sendMessage'
  | 'sending'
  | 'sent'
  | 'serverId'
  | 'sessionMessenger'
  | 'sessionRecoveryPassword'
  | 'set'
  | 'setAccountPasswordDescription'
  | 'setAccountPasswordTitle'
  | 'setDisplayPicture'
  | 'setPassword'
  | 'setPasswordFail'
  | 'setPasswordInvalid'
  | 'setPasswordTitle'
  | 'setPasswordToastDescription'
  | 'settingAppliesToEveryone'
  | 'settingAppliesToYourMessages'
  | 'settingsHeader'
  | 'shareBugDetails'
  | 'show'
  | 'showDebugLog'
  | 'showUserDetails'
  | 'someOfYourDeviceUseOutdatedVersion'
  | 'spellCheckDescription'
  | 'spellCheckDirty'
  | 'spellCheckTitle'
  | 'stagedImageAttachment'
  | 'stagedPreviewThumbnail'
  | 'startConversation'
  | 'startInTrayDescription'
  | 'startInTrayTitle'
  | 'startedACall'
  | 'support'
  | 'surveyTitle'
  | 'termsOfService'
  | 'themesSettingTitle'
  | 'theyChangedTheTimer'
  | 'theyChangedTheTimerLegacy'
  | 'theyDisabledTheirDisappearingMessages'
  | 'theySetTheirDisappearingMessages'
  | 'thisMonth'
  | 'thisWeek'
  | 'timer'
  | 'timerModeRead'
  | 'timerModeSent'
  | 'timerOption_0_seconds'
  | 'timerOption_0_seconds_abbreviated'
  | 'timerOption_10_seconds'
  | 'timerOption_10_seconds_abbreviated'
  | 'timerOption_12_hours'
  | 'timerOption_12_hours_abbreviated'
  | 'timerOption_1_day'
  | 'timerOption_1_day_abbreviated'
  | 'timerOption_1_hour'
  | 'timerOption_1_hour_abbreviated'
  | 'timerOption_1_minute'
  | 'timerOption_1_minute_abbreviated'
  | 'timerOption_1_week'
  | 'timerOption_1_week_abbreviated'
  | 'timerOption_2_weeks'
  | 'timerOption_2_weeks_abbreviated'
  | 'timerOption_30_minutes'
  | 'timerOption_30_minutes_abbreviated'
  | 'timerOption_30_seconds'
  | 'timerOption_30_seconds_abbreviated'
  | 'timerOption_5_minutes'
  | 'timerOption_5_minutes_abbreviated'
  | 'timerOption_5_seconds'
  | 'timerOption_5_seconds_abbreviated'
  | 'timerOption_6_hours'
  | 'timerOption_6_hours_abbreviated'
  | 'timerSetTo'
  | 'titleIsNow'
  | 'to'
  | 'today'
  | 'tookAScreenshot'
  | 'trimDatabase'
  | 'trimDatabaseConfirmationBody'
  | 'trimDatabaseDescription'
  | 'trustThisContactDialogDescription'
  | 'trustThisContactDialogTitle'
  | 'tryAgain'
  | 'typeInOldPassword'
  | 'typingAlt'
  | 'typingIndicatorsSettingDescription'
  | 'typingIndicatorsSettingTitle'
  | 'unableToCall'
  | 'unableToCallTitle'
  | 'unableToLoadAttachment'
  | 'unbanUser'
  | 'unblock'
  | 'unblockGroupToSend'
  | 'unblockToSend'
  | 'unblocked'
  | 'unknown'
  | 'unknownCountry'
  | 'unknownError'
  | 'unpinConversation'
  | 'unreadMessages'
  | 'updateGroupDialogTitle'
  | 'updatedTheGroup'
  | 'urlOpen'
  | 'urlOpenBrowser'
  | 'userAddedToModerators'
  | 'userBanFailed'
  | 'userBanned'
  | 'userRemovedFromModerators'
  | 'userUnbanFailed'
  | 'userUnbanned'
  | 'video'
  | 'videoAttachmentAlt'
  | 'viewMenuResetZoom'
  | 'viewMenuToggleDevTools'
  | 'viewMenuToggleFullScreen'
  | 'viewMenuZoomIn'
  | 'viewMenuZoomOut'
  | 'voiceMessage'
  | 'waitOneMoment'
  | 'warning'
  | 'welcomeToYourSession'
  | 'windowMenuClose'
  | 'windowMenuMinimize'
  | 'windowMenuZoom'
  | 'yesterday'
  | 'you'
  | 'youChangedTheTimer'
  | 'youChangedTheTimerLegacy'
  | 'youDisabledDisappearingMessages'
  | 'youDisabledYourDisappearingMessages'
  | 'youGotKickedFromGroup'
  | 'youHaveANewFriendRequest'
  | 'youLeftTheGroup'
  | 'youSetYourDisappearingMessages'
  | 'zoomFactorSettingTitle';
