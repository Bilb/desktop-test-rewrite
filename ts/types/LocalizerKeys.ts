export type LocalizerKeys =
  | 'removePassword'
  | 'newClosedGroup'
  | 'userUnbanFailed'
  | 'changePassword'
  | 'saved'
  | 'startedACall'
  | 'mainMenuWindow'
  | 'unblocked'
  | 'userAddedToModerators'
  | 'to'
  | 'sent'
  | 'requestsPlaceholder'
  | 'closedGroupInviteFailMessage'
  | 'noContactsForGroup'
  | 'linkVisitWarningMessage'
  | 'anonymous'
  | 'viewMenuZoomOut'
  | 'dialogClearAllDataDeletionFailedDesc'
  | 'timerOption_10_seconds_abbreviated'
  | 'enterDisplayName'
  | 'connectToServerFail'
  | 'disableNotifications'
  | 'publicChatExists'
  | 'passwordViewTitle'
  | 'joinOpenGroupAfterInvitationConfirmationTitle'
  | 'notificationMostRecentFrom'
  | 'timerOption_5_minutes'
  | 'linkPreviewsConfirmMessage'
  | 'notificationMostRecent'
  | 'video'
  | 'readReceiptSettingDescription'
  | 'userBanFailed'
  | 'autoUpdateLaterButtonLabel'
  | 'maximumAttachments'
  | 'deviceOnly'
  | 'beginYourSession'
  | 'typingIndicatorsSettingDescription'
  | 'changePasswordToastDescription'
  | 'addingContacts'
  | 'passwordLengthError'
  | 'typingIndicatorsSettingTitle'
  | 'maxPasswordAttempts'
  | 'viewMenuToggleDevTools'
  | 'fileSizeWarning'
  | 'openGroupURL'
  | 'hideRequestBannerDescription'
  | 'hideMenuBarDescription'
  | 'pickClosedGroupMember'
  | 'ByUsingThisService...'
  | 'startConversation'
  | 'unableToCallTitle'
  | 'yourUniqueSessionID'
  | 'typingAlt'
  | 'orJoinOneOfThese'
  | 'members'
  | 'sendRecoveryPhraseMessage'
  | 'timerOption_1_hour'
  | 'youGotKickedFromGroup'
  | 'cannotRemoveCreatorFromGroupDesc'
  | 'incomingError'
  | 'notificationsSettingsTitle'
  | 'ringing'
  | 'tookAScreenshot'
  | 'from'
  | 'thisMonth'
  | 'next'
  | 'addModerators'
  | 'sessionMessenger'
  | 'today'
  | 'appMenuHideOthers'
  | 'sendFailed'
  | 'enterPassword'
  | 'enterSessionIDOfRecipient'
  | 'dialogClearAllDataDeletionFailedMultiple'
  | 'pinConversationLimitToastDescription'
  | 'appMenuQuit'
  | 'windowMenuZoom'
  | 'allUsersAreRandomly...'
  | 'cameraPermissionNeeded'
  | 'requestsSubtitle'
  | 'closedGroupInviteSuccessTitle'
  | 'accept'
  | 'setPasswordTitle'
  | 'editMenuUndo'
  | 'pinConversation'
  | 'lightboxImageAlt'
  | 'linkDevice'
  | 'callMissedNotApproved'
  | 'goToOurSurvey'
  | 'invalidPubkeyFormat'
  | 'disappearingMessagesDisabled'
  | 'spellCheckDescription'
  | 'autoUpdateNewVersionInstructions'
  | 'appMenuUnhide'
  | 'timerOption_30_minutes_abbreviated'
  | 'voiceMessage'
  | 'changePasswordTitle'
  | 'copyMessage'
  | 'messageDeletionForbidden'
  | 'deleteJustForMe'
  | 'changeAccountPasswordTitle'
  | 'onionPathIndicatorDescription'
  | 'timestamp_s'
  | 'mediaPermissionsTitle'
  | 'replyingToMessage'
  | 'welcomeToYourSession'
  | 'editMenuCopy'
  | 'timestamp_m'
  | 'leftTheGroup'
  | 'timerOption_30_minutes'
  | 'nameOnly'
  | 'typeInOldPassword'
  | 'imageAttachmentAlt'
  | 'displayNameEmpty'
  | 'inviteContacts'
  | 'callMediaPermissionsTitle'
  | 'blocked'
  | 'noBlockedContacts'
  | 'leaveGroupConfirmation'
  | 'banUserAndDeleteAll'
  | 'joinOpenGroupAfterInvitationConfirmationDesc'
  | 'invalidNumberError'
  | 'newSession'
  | 'contextMenuNoSuggestions'
  | 'recoveryPhraseRevealButtonText'
  | 'banUser'
  | 'answeredACall'
  | 'sendMessage'
  | 'recoveryPhraseRevealMessage'
  | 'showRecoveryPhrase'
  | 'autoUpdateSettingDescription'
  | 'unlock'
  | 'remove'
  | 'restoreUsingRecoveryPhrase'
  | 'cannotUpdateDetail'
  | 'showRecoveryPhrasePasswordRequest'
  | 'spellCheckDirty'
  | 'debugLogExplanation'
  | 'closedGroupInviteFailTitle'
  | 'setAccountPasswordDescription'
  | 'removeAccountPasswordDescription'
  | 'establishingConnection'
  | 'noModeratorsToRemove'
  | 'moreInformation'
  | 'offline'
  | 'appearanceSettingsTitle'
  | 'mainMenuView'
  | 'mainMenuEdit'
  | 'notificationForConvo_disabled'
  | 'leaveGroupConfirmationAdmin'
  | 'notificationForConvo_all'
  | 'emptyGroupNameError'
  | 'copyOpenGroupURL'
  | 'setPasswordInvalid'
  | 'timerOption_30_seconds_abbreviated'
  | 'removeResidueMembers'
  | 'areYouSureDeleteEntireAccount'
  | 'noGivenPassword'
  | 'closedGroupInviteOkText'
  | 'readReceiptSettingTitle'
  | 'copySessionID'
  | 'timerOption_0_seconds'
  | 'zoomFactorSettingTitle'
  | 'pruneSettingTitle'
  | 'pruneSettingDescription'
  | 'pruneSettingUnit'
  | 'pruneSettingUnits'
  | 'unableToCall'
  | 'callMissedTitle'
  | 'done'
  | 'videoAttachmentAlt'
  | 'message'
  | 'mainMenuHelp'
  | 'open'
  | 'nameAndMessage'
  | 'autoUpdateDownloadedMessage'
  | 'onionPathIndicatorTitle'
  | 'unknown'
  | 'mediaMessage'
  | 'addAsModerator'
  | 'closedGroupInviteFailTitlePlural'
  | 'enterSessionID'
  | 'editGroup'
  | 'incomingCallFrom'
  | 'timerSetOnSync'
  | 'deleteMessages'
  | 'spellCheckTitle'
  | 'translation'
  | 'editMenuSelectAll'
  | 'messageBodyMissing'
  | 'timerOption_12_hours_abbreviated'
  | 'onlyAdminCanRemoveMembersDesc'
  | 'kickedFromTheGroup'
  | 'windowMenuMinimize'
  | 'debugLog'
  | 'timerOption_0_seconds_abbreviated'
  | 'timerOption_5_minutes_abbreviated'
  | 'goToReleaseNotes'
  | 'unpinConversation'
  | 'viewMenuResetZoom'
  | 'startInTrayDescription'
  | 'groupNamePlaceholder'
  | 'stagedPreviewThumbnail'
  | 'helpUsTranslateSession'
  | 'editMenuDeleteGroup'
  | 'unreadMessages'
  | 'documents'
  | 'audioPermissionNeededTitle'
  | 'deleteMessagesQuestion'
  | 'clickToTrustContact'
  | 'closedGroupInviteFailMessagePlural'
  | 'noAudioInputFound'
  | 'timerOption_10_seconds'
  | 'noteToSelf'
  | 'failedToAddAsModerator'
  | 'disabledDisappearingMessages'
  | 'cannotUpdate'
  | 'device'
  | 'replyToMessage'
  | 'messageDeletedPlaceholder'
  | 'notificationFrom'
  | 'displayName'
  | 'invalidSessionId'
  | 'audioPermissionNeeded'
  | 'timestamp_h'
  | 'add'
  | 'messageRequests'
  | 'show'
  | 'cannotMixImageAndNonImageAttachments'
  | 'viewMenuToggleFullScreen'
  | 'goToSupportPage'
  | 'passwordsDoNotMatch'
  | 'createClosedGroupNamePrompt'
  | 'audioMessageAutoplayDescription'
  | 'leaveAndRemoveForEveryone'
  | 'previewThumbnail'
  | 'photo'
  | 'setPassword'
  | 'editMenuDeleteContact'
  | 'hideMenuBarTitle'
  | 'imageCaptionIconAlt'
  | 'clearAll'
  | 'sendRecoveryPhraseTitle'
  | 'multipleJoinedTheGroup'
  | 'databaseError'
  | 'resend'
  | 'copiedToClipboard'
  | 'closedGroupInviteSuccessTitlePlural'
  | 'groupMembers'
  | 'dialogClearAllDataDeletionQuestion'
  | 'unableToLoadAttachment'
  | 'cameraPermissionNeededTitle'
  | 'editMenuRedo'
  | 'changeNicknameMessage'
  | 'close'
  | 'deleteMessageQuestion'
  | 'newMessage'
  | 'windowMenuClose'
  | 'mainMenuFile'
  | 'callMissed'
  | 'getStarted'
  | 'unblockUser'
  | 'blockUser'
  | 'trustThisContactDialogTitle'
  | 'received'
  | 'trimDatabaseConfirmationBody'
  | 'setPasswordFail'
  | 'clearNickname'
  | 'connectToServerSuccess'
  | 'viewMenuZoomIn'
  | 'invalidOpenGroupUrl'
  | 'entireAccount'
  | 'noContactsToAdd'
  | 'cancel'
  | 'decline'
  | 'originalMessageNotFound'
  | 'autoUpdateRestartButtonLabel'
  | 'deleteConversationConfirmation'
  | 'timerOption_6_hours_abbreviated'
  | 'timerOption_1_week_abbreviated'
  | 'timerSetTo'
  | 'notificationSubtitle'
  | 'youChangedTheTimer'
  | 'updatedTheGroup'
  | 'leaveGroup'
  | 'continueYourSession'
  | 'invalidGroupNameTooShort'
  | 'notificationForConvo'
  | 'noNameOrMessage'
  | 'pinConversationLimitTitle'
  | 'noSearchResults'
  | 'changeNickname'
  | 'userUnbanned'
  | 'error'
  | 'clearAllData'
  | 'contactAvatarAlt'
  | 'disappearingMessages'
  | 'autoUpdateNewVersionTitle'
  | 'linkPreviewDescription'
  | 'timerOption_1_day'
  | 'contactsHeader'
  | 'openGroupInvitation'
  | 'callMissedCausePermission'
  | 'mediaPermissionsDescription'
  | 'media'
  | 'noMembersInThisGroup'
  | 'saveLogToDesktop'
  | 'copyErrorAndQuit'
  | 'onlyAdminCanRemoveMembers'
  | 'passwordTypeError'
  | 'createClosedGroupPlaceholder'
  | 'editProfileModalTitle'
  | 'noCameraFound'
  | 'setAccountPasswordTitle'
  | 'callMediaPermissionsDescription'
  | 'recoveryPhraseSecureTitle'
  | 'yesterday'
  | 'closedGroupInviteSuccessMessage'
  | 'youDisabledDisappearingMessages'
  | 'updateGroupDialogTitle'
  | 'surveyTitle'
  | 'userRemovedFromModerators'
  | 'timerOption_5_seconds'
  | 'failedToRemoveFromModerator'
  | 'conversationsHeader'
  | 'setPasswordToastDescription'
  | 'audio'
  | 'startInTrayTitle'
  | 'cannotRemoveCreatorFromGroup'
  | 'editMenuCut'
  | 'markAllAsRead'
  | 'failedResolveOns'
  | 'showDebugLog'
  | 'autoUpdateDownloadButtonLabel'
  | 'dialogClearAllDataDeletionFailedTitleQuestion'
  | 'autoUpdateDownloadInstructions'
  | 'dialogClearAllDataDeletionFailedTitle'
  | 'loading'
  | 'blockedSettingsTitle'
  | 'appMenuHide'
  | 'removeAccountPasswordTitle'
  | 'recoveryPhraseEmpty'
  | 'noAudioOutputFound'
  | 'save'
  | 'privacySettingsTitle'
  | 'changeAccountPasswordDescription'
  | 'notificationSettingsDialog'
  | 'invalidOldPassword'
  | 'audioMessageAutoplayTitle'
  | 'removePasswordInvalid'
  | 'password'
  | 'usersCanShareTheir...'
  | 'nicknamePlaceholder'
  | 'linkPreviewsTitle'
  | 'continue'
  | 'learnMore'
  | 'passwordCharacterError'
  | 'autoUpdateSettingTitle'
  | 'deleteForEveryone'
  | 'createSessionID'
  | 'multipleLeftTheGroup'
  | 'enterSessionIDOrONSName'
  | 'quoteThumbnailAlt'
  | 'timerOption_1_week'
  | 'deleteContactConfirmation'
  | 'timerOption_30_seconds'
  | 'createAccount'
  | 'timerOption_1_minute_abbreviated'
  | 'timerOption_1_hour_abbreviated'
  | 'timerOption_12_hours'
  | 'unblockToSend'
  | 'timerOption_1_minute'
  | 'yourSessionID'
  | 'deleteAccountWarning'
  | 'deleted'
  | 'closedGroupMaxSize'
  | 'messagesHeader'
  | 'joinOpenGroup'
  | 'callMediaPermissionsDialogContent'
  | 'timerOption_1_day_abbreviated'
  | 'about'
  | 'ok'
  | 'multipleKickedFromTheGroup'
  | 'trimDatabase'
  | 'recoveryPhraseSavePromptMain'
  | 'editMenuPaste'
  | 'areYouSureDeleteDeviceOnly'
  | 'or'
  | 'removeModerators'
  | 'destination'
  | 'invalidGroupNameTooLong'
  | 'youLeftTheGroup'
  | 'theyChangedTheTimer'
  | 'userBanned'
  | 'addACaption'
  | 'timerOption_5_seconds_abbreviated'
  | 'removeFromModerators'
  | 'enterRecoveryPhrase'
  | 'stagedImageAttachment'
  | 'thisWeek'
  | 'savedTheFile'
  | 'mediaEmptyState'
  | 'linkVisitWarningTitle'
  | 'invalidPassword'
  | 'endCall'
  | 'connectingToServer'
  | 'settingsHeader'
  | 'autoUpdateNewVersionMessage'
  | 'oneNonImageAtATimeToast'
  | 'removePasswordTitle'
  | 'iAmSure'
  | 'selectMessage'
  | 'enterAnOpenGroupURL'
  | 'delete'
  | 'changePasswordInvalid'
  | 'unblockGroupToSend'
  | 'timerOption_6_hours'
  | 'confirmPassword'
  | 'downloadAttachment'
  | 'trimDatabaseDescription'
  | 'showUserDetails'
  | 'titleIsNow'
  | 'removePasswordToastDescription'
  | 'recoveryPhrase'
  | 'newMessages'
  | 'you'
  | 'documentsEmptyState'
  | 'unbanUser'
  | 'notificationForConvo_mentions_only'
  | 'trustThisContactDialogDescription'
  | 'unknownCountry'
  | 'searchFor...'
  | 'joinedTheGroup'
  | 'editGroupName'
  | 'trimDatabase'
  | 'trimDatabaseDescription'
  | 'trimDatabaseConfirmationBody'
  | 'respondingToRequestWarning'
  | 'messageRequestPending'
  | 'messageRequestAccepted'
  | 'messageRequestAcceptedOurs'
  | 'messageRequestAcceptedOursNoName'
  | 'declineRequestMessage'
  | 'openMessageRequestInbox'
  | 'hideRequestBanner'
  | 'noMessageRequestsPending'
  | 'noMediaUntilApproved'
  | 'mustBeApproved'
  | 'youHaveANewFriendRequest'
  | 'clearAllConfirmationTitle'
  | 'clearAllConfirmationBody'
  | 'hideBanner'
  | 'reportIssue';
