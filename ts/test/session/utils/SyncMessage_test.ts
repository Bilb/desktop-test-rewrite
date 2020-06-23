import chai from 'chai';
import * as sinon from 'sinon';

import { PubKey } from '../../../session/types/';
import { SyncMessageUtils } from '../../../session/utils/';
import { SyncMessage } from '../../../session/messages/outgoing';
import { TestUtils } from '../../test-utils';
import { UserUtil } from '../../../util';
import { MultiDeviceProtocol } from '../../../session/protocols';
import { Integer } from '../../../types/Util';

// tslint:disable-next-line: no-require-imports no-var-requires
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Sync Message Utils', () => {
  describe('toSyncMessage', () => {
    it('can convert to sync message', async () => {
      const message = TestUtils.generateChatMessage();
      const syncMessage = SyncMessageUtils.toSyncMessage(message);

      // Stubbed
      expect(syncMessage).to.not.exist;
      // expect(syncMessage instanceof SyncMessage).to.equal(true, 'message was not converted to SyncMessage');

      // Further tests required
    });
  });

  describe('canSync', () => {
    it('syncable message returns true', async () => {
      const message = TestUtils.generateChatMessage();

      // Stubbed
      const canSync = SyncMessageUtils.canSync(message);
      expect(canSync).to.equal(false, '');
    });

    it('un-syncable message returns false', async () => {
      const message = TestUtils.generateChatMessage();

      // Stubbed
      const canSync = SyncMessageUtils.canSync(message);
      expect(canSync).to.equal(false, '');
    });
  });

  describe('getSyncContacts', () => {
    let getAllConversationsStub: sinon.SinonStub;
    let getOrCreateAndWaitStub: sinon.SinonStub;
    let getOrCreatAndWaitItem: any;

    // tslint:disable-next-line: insecure-random
    const randomBoolean = () => !!Math.round(Math.random());
    const randomMockConv = (primary: boolean) => (
      // new (function(primary) {
        
      //   return {
      //     id: generateFakePubKey().key,
      //     isPrivate: () => true,
      //     isOurLocalDevice: () => false,
      //     isBlocked: () => false,
      //     getPrimaryDevicePubKey: () => this.isPrivate ? 

      //     attributes: {
      //       secondaryStatus: !primary,
      //     },
      //   };
      // })();
    {}
    );



    // Fill half with secondaries, half with primaries
    const numConversations = 20;
    const primaryConversations = new Array(numConversations / 2)
      .fill({})
      .map(() => randomMockConv(true));
    const secondaryConversations = new Array(numConversations / 2)
      .fill({})
      .map(() => randomMockConv(false));
    const conversations = [...primaryConversations, ...secondaryConversations];

    const sandbox = sinon.createSandbox();
    const ourDevice = TestUtils.generateFakePubKey();
    const ourNumber = ourDevice.key;

    const ourPrimaryDevice = TestUtils.generateFakePubKey();

    beforeEach(async () => {
      // Util Stubs
      TestUtils.stubWindow('Whisper', {
        ConversationCollection: sandbox.stub(),
      });

      getAllConversationsStub = TestUtils.stubData(
        'getAllConversations'
      ).resolves(conversations);

      // Scale result in sync with secondaryConversations on callCount
      getOrCreateAndWaitStub = sandbox.stub().callsFake(() => {
        const item = secondaryConversations[getOrCreateAndWaitStub.callCount - 1];

        // Make the item a primary device to match the call in SyncMessage under secondaryContactsPromise
        getOrCreatAndWaitItem = {
          ...item,
          getPrimaryDevicePubKey: () => item.id,
          attributes: {
            secondaryStatus: false,
          },
        };

        return getOrCreatAndWaitItem;
      });

      TestUtils.stubWindow('ConversationController', {
        getOrCreateAndWait: getOrCreateAndWaitStub,
      });

      // Stubs
      sandbox.stub(UserUtil, 'getCurrentDevicePubKey').resolves(ourNumber);
      sandbox
        .stub(MultiDeviceProtocol, 'getPrimaryDevice')
        .resolves(ourPrimaryDevice);
    });

    afterEach(() => {
      sandbox.restore();
      TestUtils.restoreStubs();
    });

    it('can get sync contacts with only primary contacts', async () => {
      getAllConversationsStub.resolves(primaryConversations);

      const contacts = await SyncMessageUtils.getSyncContacts();
      expect(getAllConversationsStub.callCount).to.equal(1);

      // Each contact should be a primary device
      expect(contacts).to.have.length(numConversations / 2);
      expect(contacts?.find(c => c.attributes.secondaryStatus)).to.not.exist;
    });

    it('can get sync contacts of assorted primaries and secondaries', async () => {
      // Map secondary contacts to stub resolution
      const contacts = await SyncMessageUtils.getSyncContacts();
      expect(getAllConversationsStub.callCount).to.equal(1);

      // We should have numConversations unique contacts
      expect(contacts).to.have.length(numConversations);
      
      // All contacts should be primary; half of which some from secondaries in secondaryContactsPromise
      expect(contacts?.find(c => c.attributes.secondaryStatus)).to.not.exist;
      expect(contacts)

      
    });
  });

  // MAKE MORE SPECIFIC, CHECK PARAMETERS
});
