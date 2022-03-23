/* global window */

const { ipcRenderer } = require('electron');
const url = require('url');
const i18n = require('./js/modules/i18n');

const config = url.parse(window.location.toString(), true).query;
const { locale } = config;
const localeMessages = ipcRenderer.sendSync('locale-data');

global.dcodeIO = global.dcodeIO || {};
global.dcodeIO.ByteBuffer = require('bytebuffer');

window.getEnvironment = () => config.environment;
window.getVersion = () => config.version;
window.getCommitHash = () => config.commitHash;
window.getAppInstance = () => config.appInstance;

window.closeAbout = () => ipcRenderer.send('close-about');

window.i18n = i18n.setup(locale, localeMessages);

require('./ts/util/logging');
