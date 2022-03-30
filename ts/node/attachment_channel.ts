import { ipcMain } from 'electron';
import rimraf from 'rimraf';

import { deleteAll, ensureDirectory, getAllAttachments, getPath } from '../attachments/attachments';
// tslint:disable: no-console
import { sqlNode } from './sql'; // checked - only node

let initialized = false;

const ERASE_ATTACHMENTS_KEY = 'erase-attachments';
const CLEANUP_ORPHANED_ATTACHMENTS_KEY = 'cleanup-orphaned-attachments';

async function cleanupOrphanedAttachments(userDataPath: string) {
  const allAttachments = await getAllAttachments(userDataPath);
  const orphanedAttachments = sqlNode.removeKnownAttachments(allAttachments); //sql.js
  await deleteAll({
    userDataPath,
    attachments: orphanedAttachments,
  });
}

export async function initAttachmentsChannel({ userDataPath }: { userDataPath: string }) {
  if (initialized) {
    throw new Error('initialze: Already initialized!');
  }
  initialized = true;

  console.log('Ensure attachments directory exists');
  await ensureDirectory(userDataPath);

  const attachmentsDir = getPath(userDataPath);

  ipcMain.on(ERASE_ATTACHMENTS_KEY, event => {
    try {
      rimraf.sync(attachmentsDir);
      event.sender.send(`${ERASE_ATTACHMENTS_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`erase attachments error: ${errorForDisplay}`);
      event.sender.send(`${ERASE_ATTACHMENTS_KEY}-done`, error);
    }
  });

  ipcMain.on(CLEANUP_ORPHANED_ATTACHMENTS_KEY, async event => {
    try {
      await cleanupOrphanedAttachments(userDataPath);
      event.sender.send(`${CLEANUP_ORPHANED_ATTACHMENTS_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`cleanup orphaned attachments error: ${errorForDisplay}`);
      event.sender.send(`${CLEANUP_ORPHANED_ATTACHMENTS_KEY}-done`, error);
    }
  });
}
