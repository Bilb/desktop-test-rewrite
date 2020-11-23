import { MessageModel } from '../../js/models/messages';
import _ from 'lodash';

import * as Data from '../../js/modules/data';

export async function downloadAttachment(attachment: any) {
  const serverUrl = new URL(attachment.url).origin;

  // The fileserver adds the `-static` part for some reason
  const defaultFileserver = _.includes(
    ['https://file-static.lokinet.org', 'https://file.getsession.org'],
    serverUrl
  );

  let res: any;

  // TODO: we need attachments to remember which API should be used to retrieve them
  if (!defaultFileserver) {
    const serverAPI = await window.lokiPublicChatAPI.findOrCreateServer(
      serverUrl
    );

    if (serverAPI) {
      res = await serverAPI.downloadAttachment(attachment.url);
    }
  }

  // Fallback to using the default fileserver
  if (defaultFileserver || !res || !res.ok) {
    res = await window.lokiFileServerAPI.downloadAttachment(attachment.url);
  }

  // FIXME "178" test to remove once this is fixed server side.
  if (!res.response || !res.response.data || res.response.data.length === 178) {
    if (res?.response?.data?.length === 178) {
      window.log.error(
        'Data of 178 length corresponds of a 404 returned as 200 by file.getsession.org.'
      );
    }
    throw new Error(
      `downloadAttachment: invalid response for ${attachment.url}`
    );
  }

  // The attachment id is actually just the absolute url of the attachment
  let data = new Uint8Array(res.response.data).buffer;
  if (!attachment.isRaw) {
    const { key, digest, size } = attachment;

    data = await window.textsecure.crypto.decryptAttachment(
      data,
      window.Signal.Crypto.base64ToArrayBuffer(key),
      window.Signal.Crypto.base64ToArrayBuffer(digest)
    );

    if (!size || size !== data.byteLength) {
      throw new Error(
        `downloadAttachment: Size ${size} did not match downloaded attachment size ${data.byteLength}`
      );
    }
  }

  return {
    ..._.omit(attachment, 'digest', 'key'),
    data,
  };
}

async function processLongAttachments(
  message: MessageModel,
  attachments: Array<any>
): Promise<boolean> {
  if (attachments.length === 0) {
    return false;
  }

  if (attachments.length > 1) {
    window.log.error(
      `Received more than one long message attachment in message ${message.idForLogging()}`
    );
  }

  const attachment = attachments[0];

  message.set({ bodyPending: true });
  await window.Signal.AttachmentDownloads.addJob(attachment, {
    messageId: message.id,
    type: 'long-message',
    index: 0,
  });

  return true;
}

async function processNormalAttachments(
  message: MessageModel,
  normalAttachments: Array<any>
): Promise<number> {
  const attachments = await Promise.all(
    normalAttachments.map((attachment: any, index: any) => {
      return window.Signal.AttachmentDownloads.addJob(attachment, {
        messageId: message.id,
        type: 'attachment',
        index,
      });
    })
  );

  message.set({ attachments });

  return attachments.length;
}

async function processPreviews(message: MessageModel): Promise<number> {
  let addedCount = 0;

  const preview = await Promise.all(
    (message.get('preview') || []).map(async (item: any, index: any) => {
      if (!item.image) {
        return item;
      }
      addedCount += 1;

      const image = await window.Signal.AttachmentDownloads.addJob(item.image, {
        messageId: message.id,
        type: 'preview',
        index,
      });

      return { ...item, image };
    })
  );

  message.set({ preview });

  return addedCount;
}

async function processAvatars(message: MessageModel): Promise<number> {
  let addedCount = 0;

  const contacts = message.get('contact') || [];

  const contact = await Promise.all(
    contacts.map(async (item: any, index: any) => {
      if (!item.avatar || !item.avatar.avatar) {
        return item;
      }

      addedCount += 1;

      const avatarJob = await window.Signal.AttachmentDownloads.addJob(
        item.avatar.avatar,
        {
          messaeId: message.id,
          type: 'contact',
          index,
        }
      );

      return {
        ...item,
        avatar: {
          ...item.avatar,
          avatar: avatarJob,
        },
      };
    })
  );

  message.set({ contact });

  return addedCount;
}

async function processQuoteAttachments(message: MessageModel): Promise<number> {
  let addedCount = 0;

  const quote = message.get('quote');

  if (!quote || !quote.attachments || !quote.attachments.length) {
    return 0;
  }

  quote.attachments = await Promise.all(
    quote.attachments.map(async (item: any, index: any) => {
      // If we already have a path, then we copied this image from the quoted
      //    message and we don't need to download the attachment.
      if (!item.thumbnail || item.thumbnail.path) {
        return item;
      }

      addedCount += 1;

      const thumbnail = await window.Signal.AttachmentDownloads.addJob(
        item.thumbnail,
        {
          messageId: message.id,
          type: 'quote',
          index,
        }
      );

      return { ...item, thumbnail };
    })
  );

  message.set({ quote });

  return addedCount;
}

async function processGroupAvatar(message: MessageModel): Promise<boolean> {
  let group = message.get('group');

  if (!group || !group.avatar) {
    return false;
  }

  group = {
    ...group,
    avatar: await window.Signal.AttachmentDownloads.addJob(group.avatar, {
      messageId: message.id,
      type: 'group-avatar',
      index: 0,
    }),
  };

  message.set({ group });

  return true;
}

export async function queueAttachmentDownloads(
  message: MessageModel
): Promise<boolean> {
  const { Whisper } = window;

  let count = 0;

  const [longMessageAttachments, normalAttachments] = _.partition(
    message.get('attachments') || [],
    (attachment: any) =>
      attachment.contentType === Whisper.Message.LONG_MESSAGE_CONTENT_TYPE
  );

  if (await processLongAttachments(message, longMessageAttachments)) {
    count += 1;
  }

  count += await processNormalAttachments(message, normalAttachments);

  count += await processPreviews(message);

  count += await processAvatars(message);

  count += await processQuoteAttachments(message);

  if (await processGroupAvatar(message)) {
    count += 1;
  }

  if (count > 0) {
    await Data.saveMessage(message.attributes, {
      Message: Whisper.Message,
    });

    return true;
  }

  return false;
}
