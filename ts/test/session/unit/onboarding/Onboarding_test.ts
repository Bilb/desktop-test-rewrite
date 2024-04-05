import { expect } from 'chai';
import Sinon from 'sinon';
import { displayNameIsValid } from '../../../../components/registration/utils';
import { PubKey } from '../../../../session/types';
import {
  generateMnemonic,
  registerSingleDevice,
  signInByLinkingDevice,
} from '../../../../util/accountManager';
import { TestUtils } from '../../../test-utils';
import { stubI18n, stubWindow, stubWindowLog } from '../../../test-utils/utils';

describe('Onboarding', () => {
  stubWindowLog();
  stubI18n();
  // TODO[epic=ses-1560] set mnemonic generateMnemonic() ?

  beforeEach(() => {
    TestUtils.stubData('removeItemById').resolves();
    TestUtils.stubData('createOrUpdateItem').resolves();
    stubWindow('setOpengroupPruning', () => {});
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('displayNameIsValid', () => {
    it('should throw an error if the display name is undefined', async () => {
      try {
        displayNameIsValid(undefined);
      } catch (error) {
        error.should.be.an.instanceOf(Error);
        error.message.should.equal(window.i18n('displayNameEmpty'));
      }
    });
    it('should throw an error if the display name is empty after trimming', async () => {
      try {
        displayNameIsValid('    ');
      } catch (error) {
        error.should.be.an.instanceOf(Error);
        error.message.should.equal(window.i18n('displayNameEmpty'));
      }
    });
    it('if the display name is valid it should be returned', async () => {
      try {
        const displayName = 'Hello World';
        const validDisplayName = displayNameIsValid(displayName);
        expect(validDisplayName, `should equal ${displayName}`).to.equal(displayName);
      } catch (error) {
        error.should.not.be.an.instanceOf(Error);
        error.message.should.not.equal(window.i18n('displayNameEmpty'));
      }
    });
  });

  describe('registerSingleDevice', () => {
    it('should return a valid pubkey/account id given a valid recovery password and display name', async () => {
      const recoveryPassword = await generateMnemonic();
      const validDisplayName = 'Hello World';
      let accountId = null;

      await registerSingleDevice(
        recoveryPassword,
        'english',
        validDisplayName,
        async (pubkey: string) => {
          accountId = pubkey;
        }
      );

      expect(accountId, 'should not be null').to.not.be.null;
      expect(accountId, 'should be a string').to.be.a('string');
      expect(PubKey.validate(accountId!), 'should be a valid pubkey').to.equal(true);
    });
    it('should throw an error if the recovery password is empty', async () => {
      try {
        const recoveryPassword = '';
        const validDisplayName = 'Hello World';

        await registerSingleDevice(recoveryPassword, 'english', validDisplayName, async () => {});
      } catch (error) {
        error.should.be.an.instanceOf(Error);
        error.message.should.equal(
          'Session always need a mnemonic. Either generated or given by the user'
        );
      }
    });
    it('should throw an error if the mnemonicLanguage is empty', async () => {
      try {
        const recoveryPassword = await generateMnemonic();
        const validDisplayName = 'Hello World';

        await registerSingleDevice(recoveryPassword, '', validDisplayName, async () => {});
      } catch (error) {
        error.should.be.an.instanceOf(Error);
        error.message.should.equal('We always need a mnemonicLanguage');
      }
    });
    it('should throw an error if the display name is empty', async () => {
      try {
        const recoveryPassword = await generateMnemonic();
        const validDisplayName = '';

        await registerSingleDevice(recoveryPassword, 'english', validDisplayName, async () => {});
      } catch (error) {
        error.should.be.an.instanceOf(Error);
        error.message.should.equal('We always need a displayName');
      }
    });
  });

  describe('signInByLinkingDevice', () => {
    const abortController = new AbortController();

    it('should return a valid pubkey/account id and display name given a valid recovery password', async () => {
      // TODO[epic=ses-1560]  still needs stubbing to pass tests and it error conditions
      // TODO[epic=ses-1560] remember to stub polling
      const recoveryPassword = await generateMnemonic();
      const { displayName, pubKeyString } = await signInByLinkingDevice(
        recoveryPassword,
        'english',
        abortController.signal
      );

      expect(pubKeyString, 'should not be null').to.not.be.null;
      expect(pubKeyString, 'should be a string').to.be.a('string');
      expect(PubKey.validate(pubKeyString!), 'should be a valid pubkey').to.equal(true);
      expect(displayName, 'should not be null').to.not.be.null;
      expect(displayName, 'should be a string').to.be.a('string');
    });
  });
});
