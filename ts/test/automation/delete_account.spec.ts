import { _electron, Page, test } from '@playwright/test';
import { forceCloseAllWindows } from './setup/beforeEach';
import { openAppsAndNewUsers, openAppsNoNewUsers } from './setup/new_user';
import { sendNewMessage } from './send_message';
import { clickOnMatchingText, clickOnTestIdWithText, typeIntoInput } from './utils';
import { sleepFor } from '../../session/utils/Promise';
// tslint:disable: no-console

let windows: Array<Page> = [];
test.afterEach(() => forceCloseAllWindows(windows));

test('Delete account from swarm', async () => {
  const testMessage = `A -> B: ${Date.now()}`;
  const testReply = `B -> A: ${Date.now()}`;
  const windowLoggedIn = await openAppsAndNewUsers(2);
  windows = windowLoggedIn.windows;
  const [windowA, windowB] = windows;
  const [userA, userB] = windowLoggedIn.users;
  // Create contact and send new message
  await Promise.all([
    sendNewMessage(windowA, userB.sessionid, testMessage),
    sendNewMessage(windowB, userA.sessionid, testReply),
  ]);
  // Delete all data from device
  // Click on settings tab
  await clickOnTestIdWithText(windowA, 'settings-section');
  // Click on clear all data
  await clickOnMatchingText(windowA, 'Clear All Data');
  // Select entire account
  await clickOnMatchingText(windowA, 'Entire Account');
  // Confirm deletion by clicking i am sure
  await clickOnMatchingText(windowA, 'I am sure');
  await windowA.waitForTimeout(7500);
  // Wait for window to close and reopen
  await sleepFor(10000, true);
  // await windowA.close();
  const restoringWindows = await openAppsNoNewUsers(1);
  const [restoringWindow] = restoringWindows;
  // Sign in with deleted account and check that nothing restores
  await clickOnTestIdWithText(restoringWindow, 'restore-using-recovery', 'Restore your account');
  // Fill in recovery phrase
  await typeIntoInput(restoringWindow, 'recovery-phrase-input', userA.recoveryPhrase);
  // Enter display name
  await typeIntoInput(restoringWindow, 'display-name-input', userA.userName);
  // Click continue
  await clickOnTestIdWithText(restoringWindow, 'continue-session-button');
  // Check if message from user B is restored (we don't want it to be)
  const errorDesc = 'Test Message should not be found';
  try {
    const elemShouldNotBeFound = restoringWindow.locator(testMessage);
    if (elemShouldNotBeFound) {
      console.error('Test message was not found');
      throw new Error(errorDesc);
    }
  } catch (e) {
    if (e.message !== errorDesc) {
      throw e;
    }
  }

  await clickOnTestIdWithText(restoringWindow, 'new-conversation-button'); // Expect contacts list to be empty

  const errorDesc2 = 'Should not be found';
  try {
    const elemShouldNotBeFound = restoringWindow.locator(userB.userName);
    if (elemShouldNotBeFound) {
      console.error('Contact not found');
      throw new Error(errorDesc2);
    }
  } catch (e) {
    if (e.message !== errorDesc2) {
      throw e;
    }
  }
  await forceCloseAllWindows(restoringWindows);
});
