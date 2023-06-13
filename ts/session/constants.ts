// tslint:disable: binary-expression-operand-order

const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

export const DURATION = {
  SECONDS: seconds, // in ms
  MINUTES: minutes, // in ms
  HOURS: hours, // in ms
  DAYS: days, // in ms
};

export const TTL_DEFAULT = {
  TYPING_MESSAGE: 20 * DURATION.SECONDS,
  CALL_MESSAGE: 5 * 60 * DURATION.SECONDS,
  TTL_MAX: 14 * DURATION.DAYS,
  TTL_CONFIG: 30 * DURATION.DAYS,
};

export const SWARM_POLLING_TIMEOUT = {
  ACTIVE: DURATION.SECONDS * 5,
  MEDIUM_ACTIVE: DURATION.SECONDS * 60,
  INACTIVE: DURATION.SECONDS * 120,
};

export const PROTOCOLS = {
  // tslint:disable-next-line: no-http-string
  HTTP: 'http:',
  HTTPS: 'https:',
};

// User Interface
export const CONVERSATION = {
  DEFAULT_MEDIA_FETCH_COUNT: 50,
  DEFAULT_DOCUMENTS_FETCH_COUNT: 100,
  DEFAULT_MESSAGE_FETCH_COUNT: 30,
  MAX_MESSAGE_FETCH_COUNT: 1000,
  // Maximum voice message duraton of 5 minutes
  // which equates to 1.97 MB
  MAX_VOICE_MESSAGE_DURATION: 300,
  MAX_UNREAD_COUNT: 999,
};

/**
 * The file server and onion request max upload size is 10MB precisely.
 * 10MB is still ok, but one byte more is not.
 */
export const MAX_ATTACHMENT_FILESIZE_BYTES = 10 * 1000 * 1000;

export const VALIDATION = {
  MAX_GROUP_NAME_LENGTH: 30,
  CLOSED_GROUP_SIZE_LIMIT: 100,
};

export const UI = {
  COLORS: {
    // COMMON
    GREEN: '#00F782',
  },
};

// we keep 150 chars, because quoting someone with 66 hex chars need to be kept in full so we can render it in the quote with its name
export const QUOTED_TEXT_MAX_LENGTH = 150;

export const DEFAULT_RECENT_REACTS = ['😂', '🥰', '😢', '😡', '😮', '😈'];

export const MAX_USERNAME_BYTES = 64;

export const FEATURE_RELEASE_TIMESTAMPS = {
  // TODO update to agreed value between platforms for `disappearing_messages`
  DISAPPEARING_MESSAGES_V2: 1706778000000, // unix 01/02/2024 09:00
  // NOTE for testing purposes only
  // DISAPPEARING_MESSAGES_V2: 1677488400000, // unix 27/02/2023 09:00

  // TODO update to agreed value between platforms for `user_config_libsession`
  // FIXME once we are done with testing the user config over libsession feature
  // FIXME the flag is forced on currently in releaseFeature.ts
  USER_CONFIG: 1677488400000, // testing: unix 27/02/2023 09:00
  // return 1706778000000; // unix 01/02/2024 09:00;
};
