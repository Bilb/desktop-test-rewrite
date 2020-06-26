import { LocalizerType } from '../types/Util';
import LokiMessageAPI from '../../js/modules/loki_message_api';
import LokiPublicChatFactoryAPI from '../../js/modules/loki_public_chat_api';
import { LibsignalProtocol } from '../../libtextsecure/libsignal-protocol';
import { SignalInterface } from '../../js/modules/signal';
import { Libloki } from '../libloki';

/*
We declare window stuff here instead of global.d.ts because we are importing other declarations.
If you import anything in global.d.ts, the type system won't work correctly.
*/
declare global {
  interface Window {
    CONSTANTS: any;
    ConversationController: any;
    Events: any;
    Lodash: any;
    LokiAppDotNetServerAPI: any;
    LokiFileServerAPI: any;
    LokiPublicChatAPI: any;
    LokiRssAPI: any;
    LokiSnodeAPI: any;
    MessageController: any;
    SenderKeyAPI: any;
    Session: any;
    Signal: SignalInterface;
    StringView: any;
    StubAppDotNetApi: any;
    StubMessageAPI: any;
    WebAPI: any;
    Whisper: any;
    attemptConnection: any;
    clearLocalData: any;
    clipboard: any;
    confirmationDialog: any;
    dcodeIO: any;
    deleteAccount: any;
    displayNameRegex: any;
    friends: any;
    generateID: any;
    getAccountManager: any;
    getConversations: any;
    getFriendsFromContacts: any;
    getSettingValue: any;
    i18n: LocalizerType;
    libloki: Libloki;
    libsignal: LibsignalProtocol;
    log: any;
    lokiFeatureFlags: any;
    lokiFileServerAPI: LokiFileServerInstance;
    lokiMessageAPI: LokiMessageAPI;
    lokiPublicChatAPI: LokiPublicChatFactoryAPI;
    mnemonic: any;
    onLogin: any;
    passwordUtil: any;
    pushToast: any;
    resetDatabase: any;
    restart: any;
    seedNodeList: any;
    setPassword: any;
    setSettingValue: any;
    shortenPubkey: any;
    showEditProfileDialog: any;
    showPasswordDialog: any;
    showQRDialog: any;
    showSeedDialog: any;
    storage: any;
    textsecure: any;
    toggleLinkPreview: any;
    toggleMediaPermissions: any;
    toggleMenuBar: any;
    toggleSpellCheck: any;
    toggleTheme: any;
    userConfig: any;
    versionInfo: any;
  }
}
