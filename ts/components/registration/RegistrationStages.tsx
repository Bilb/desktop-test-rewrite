import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import styled from 'styled-components';
import { Data } from '../../data/data';
import { SettingsKey } from '../../data/settings-key';
import { getSwarmPollingInstance } from '../../session/apis/snode_api';
import { getConversationController } from '../../session/conversations';
import { mnDecode } from '../../session/crypto/mnemonic';
import { PromiseUtils, StringUtils, ToastUtils } from '../../session/utils';
import { TaskTimedOutError } from '../../session/utils/Promise';
import { fromHex } from '../../session/utils/String';
import { trigger } from '../../shims/events';
import {
  setGeneratedRecoveryPhrase,
  setHexGeneratedPubKey,
} from '../../state/onboarding/ducks/registration';
import {
  useRegGeneratedRecoveryPhrase,
  useRegRegistrationPhase,
} from '../../state/onboarding/selectors/registration';
import {
  generateMnemonic,
  registerSingleDevice,
  sessionGenerateKeyPair,
  signInByLinkingDevice,
} from '../../util/accountManager';
import { Storage, setSignInByLinking, setSignWithRecoveryPhrase } from '../../util/storage';
import { Flex } from '../basic/Flex';
import { ModalContainer } from './ModalContainer';
import { SignInTab, SignUpTab } from './stages';

const StyledRegistrationContainer = styled(Flex)`
  width: 289px;

  .session-button {
    width: 80%;
    margin: auto;
  }
`;

export async function resetRegistration() {
  await Data.removeAll();
  Storage.reset();
  await Storage.fetch();
  getConversationController().reset();
  await getConversationController().load();
}

/**
 * Returns undefined if an error happened, or the trim userName.
 *
 * Be sure to use the trimmed userName for creating the account.
 */
const displayNameIsValid = (displayName: string): undefined | string => {
  const trimName = displayName.trim();

  if (!trimName) {
    window?.log?.warn('invalid trimmed name for registration');
    ToastUtils.pushToastError('invalidDisplayName', window.i18n('displayNameEmpty'));
    return undefined;
  }
  return trimName;
};

export async function signUp(signUpDetails: {
  displayName: string;
  generatedRecoveryPhrase: string;
}) {
  const { displayName, generatedRecoveryPhrase } = signUpDetails;
  window?.log?.info('SIGNING UP');

  const trimName = displayNameIsValid(displayName);
  // shows toast to user about the error
  if (!trimName) {
    return;
  }

  try {
    await resetRegistration();
    await registerSingleDevice(generatedRecoveryPhrase, 'english', trimName);
    await Storage.put(SettingsKey.hasSyncedInitialConfigurationItem, Date.now());
    await setSignWithRecoveryPhrase(false);
    trigger('openInbox');
  } catch (e) {
    await resetRegistration();

    ToastUtils.pushToastError('registrationError', `Error: ${e.message || 'Something went wrong'}`);
    window?.log?.warn('exception during registration:', e);
  }
}

/**
 * Sign in/restore from seed.
 * Ask for a display name, as we will drop incoming ConfigurationMessages if any are saved on the swarm.
 * We will handle a ConfigurationMessage
 */
export async function signInWithRecovery(signInDetails: {
  displayName: string;
  userRecoveryPhrase: string;
}) {
  const { displayName, userRecoveryPhrase } = signInDetails;
  window?.log?.info('RESTORING FROM SEED');
  const trimName = displayNameIsValid(displayName);
  // shows toast to user about the error
  if (!trimName) {
    return;
  }

  try {
    await resetRegistration();

    await registerSingleDevice(userRecoveryPhrase, 'english', trimName);
    await setSignWithRecoveryPhrase(true);

    trigger('openInbox');
  } catch (e) {
    await resetRegistration();
    ToastUtils.pushToastError('registrationError', `Error: ${e.message || 'Something went wrong'}`);
    window?.log?.warn('exception during registration:', e);
  }
}

/**
 * This is will try to sign in with the user recovery phrase.
 * If no ConfigurationMessage is received in 60seconds, the loading will be canceled.
 */
export async function signInWithLinking(signInDetails: { userRecoveryPhrase: string }) {
  const { userRecoveryPhrase } = signInDetails;
  window?.log?.info('LINKING DEVICE');

  try {
    await resetRegistration();
    await signInByLinkingDevice(userRecoveryPhrase, 'english');
    let displayNameFromNetwork = '';
    await getSwarmPollingInstance().start();

    await PromiseUtils.waitForTask(done => {
      window.Whisper.events.on('configurationMessageReceived', async (displayName: string) => {
        window.Whisper.events.off('configurationMessageReceived');
        await setSignInByLinking(false);
        await setSignWithRecoveryPhrase(true);
        done(displayName);

        displayNameFromNetwork = displayName;
      });
    }, 60000);
    if (displayNameFromNetwork.length) {
      // display name, avatars, groups and contacts should already be handled when this event was triggered.
      window?.log?.info(`We got a displayName from network: "${displayNameFromNetwork}"`);
    } else {
      window?.log?.info('Got a config message from network but without a displayName...');
      throw new Error('Got a config message from network but without a displayName...');
    }
    // Do not set the lastProfileUpdateTimestamp.
    // We expect to get a display name from a configuration message while we are loading messages of this user
    trigger('openInbox');
  } catch (e) {
    await resetRegistration();
    if (e instanceof TaskTimedOutError) {
      ToastUtils.pushToastError(
        'registrationError',
        'Could not find your display name. Please Sign In by Restoring Your Account instead.'
      );
    } else {
      ToastUtils.pushToastError(
        'registrationError',
        `Error: ${e.message || 'Something went wrong'}`
      );
    }
    window?.log?.warn('exception during registration:', e);
  }
}

export enum RegistrationPhase {
  Start,
  SignIn,
  SignUp,
}

export const RegistrationStages = () => {
  const generatedRecoveryPhrase = useRegGeneratedRecoveryPhrase();
  const registrationPhase = useRegRegistrationPhase();

  const dispatch = useDispatch();

  const generateMnemonicAndKeyPair = async () => {
    if (generatedRecoveryPhrase === '') {
      const mnemonic = await generateMnemonic();

      let seedHex = mnDecode(mnemonic);
      // handle shorter than 32 bytes seeds
      const privKeyHexLength = 32 * 2;
      if (seedHex.length !== privKeyHexLength) {
        seedHex = seedHex.concat('0'.repeat(32));
        seedHex = seedHex.substring(0, privKeyHexLength);
      }
      const seed = fromHex(seedHex);
      const keyPair = await sessionGenerateKeyPair(seed);
      const newHexPubKey = StringUtils.decode(keyPair.pubKey, 'hex');

      dispatch(setGeneratedRecoveryPhrase(mnemonic));
      dispatch(setHexGeneratedPubKey(newHexPubKey)); // our 'frontend' sessionID
    }
  };

  useMount(() => {
    void generateMnemonicAndKeyPair();
    void resetRegistration();
  });

  return (
    <>
      <ModalContainer />
      <StyledRegistrationContainer container={true} flexDirection="column">
        {(registrationPhase === RegistrationPhase.Start ||
          registrationPhase === RegistrationPhase.SignUp) && <SignUpTab />}
        {(registrationPhase === RegistrationPhase.Start ||
          registrationPhase === RegistrationPhase.SignIn) && <SignInTab />}
      </StyledRegistrationContainer>
    </>
  );
};
