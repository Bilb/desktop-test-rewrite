// The idea with this file is to make it webpackable for the style guide

const Backbone = require('../../ts/backbone');
const Crypto = require('./crypto');
const Database = require('./database');
const Emoji = require('../../ts/util/emoji');
const Message = require('./types/message');
const Notifications = require('../../ts/notifications');
const OS = require('../../ts/OS');
const Settings = require('./settings');
const Startup = require('./startup');
const Util = require('../../ts/util');

// Components
const {
  ContactDetail,
} = require('../../ts/components/conversation/ContactDetail');
const { ContactName } = require('../../ts/components/conversation/ContactName');
const {
  ConversationTitle,
} = require('../../ts/components/conversation/ConversationTitle');
const {
  EmbeddedContact,
} = require('../../ts/components/conversation/EmbeddedContact');
const { Emojify } = require('../../ts/components/conversation/Emojify');
const { Lightbox } = require('../../ts/components/Lightbox');
const { LightboxGallery } = require('../../ts/components/LightboxGallery');
const {
  MediaGallery,
} = require('../../ts/components/conversation/media-gallery/MediaGallery');
const { MessageBody } = require('../../ts/components/conversation/MessageBody');
const { Quote } = require('../../ts/components/conversation/Quote');

// Migrations
const {
  getPlaceholderMigrations,
} = require('./migrations/get_placeholder_migrations');

const Migrations0DatabaseWithAttachmentData = require('./migrations/migrations_0_database_with_attachment_data');
const Migrations1DatabaseWithoutAttachmentData = require('./migrations/migrations_1_database_without_attachment_data');

// Types
const AttachmentType = require('./types/attachment');
const Contact = require('../../ts/types/Contact');
const Conversation = require('../../ts/types/Conversation');
const Errors = require('./types/errors');
const MediaGalleryMessage = require('../../ts/components/conversation/media-gallery/types/Message');
const MIME = require('../../ts/types/MIME');
const SettingsType = require('../../ts/types/Settings');

// Views
const Initialization = require('./views/initialization');

// Workflow
const { IdleDetector } = require('./idle_detector');
const MessageDataMigrator = require('./messages_data_migrator');

function initializeMigrations({
  Attachments,
  userDataPath,
  Type,
  getRegionCode,
}) {
  if (!Attachments) {
    return null;
  }

  const attachmentsPath = Attachments.getPath(userDataPath);
  const readAttachmentData = Attachments.createReader(attachmentsPath);
  const loadAttachmentData = Type.loadData(readAttachmentData);

  return {
    attachmentsPath,
    deleteAttachmentData: Type.deleteData(
      Attachments.createDeleter(attachmentsPath)
    ),
    getAbsoluteAttachmentPath: Attachments.createAbsolutePathGetter(
      attachmentsPath
    ),
    getPlaceholderMigrations,
    loadAttachmentData,
    loadMessage: Message.createAttachmentLoader(loadAttachmentData),
    Migrations0DatabaseWithAttachmentData,
    Migrations1DatabaseWithoutAttachmentData,
    upgradeMessageSchema: message =>
      Message.upgradeSchema(message, {
        writeNewAttachmentData: Attachments.createWriterForNew(attachmentsPath),
        getRegionCode,
      }),
    writeMessageAttachments: Message.createAttachmentDataWriter(
      Attachments.createWriterForExisting(attachmentsPath)
    ),
  };
}

exports.setup = (options = {}) => {
  const { Attachments, userDataPath, getRegionCode } = options;

  const Migrations = initializeMigrations({
    Attachments,
    userDataPath,
    Type: AttachmentType,
    getRegionCode,
  });

  const Components = {
    ContactDetail,
    ContactName,
    ConversationTitle,
    EmbeddedContact,
    Emojify,
    Lightbox,
    LightboxGallery,
    MediaGallery,
    MessageBody,
    Types: {
      Message: MediaGalleryMessage,
    },
    Quote,
  };

  const Types = {
    Attachment: AttachmentType,
    Contact,
    Conversation,
    Errors,
    Message,
    MIME,
    Settings: SettingsType,
  };

  const Views = {
    Initialization,
  };

  const Workflow = {
    IdleDetector,
    MessageDataMigrator,
  };

  return {
    Backbone,
    Components,
    Crypto,
    Database,
    Emoji,
    Migrations,
    Notifications,
    OS,
    Settings,
    Startup,
    Types,
    Util,
    Views,
    Workflow,
  };
};
