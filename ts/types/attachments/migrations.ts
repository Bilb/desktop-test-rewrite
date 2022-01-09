import * as GoogleChrome from '../../../ts/util/GoogleChrome';
import * as MIME from '../../../ts/types/MIME';
import { toLogFormat } from './Errors';
import { arrayBufferToBlob, blobToArrayBuffer, dataURLToBlob } from 'blob-util';

import loadImage from 'blueimp-load-image';
import { isString } from 'lodash';
import {
  getImageDimensions,
  makeImageThumbnailBuffer,
  makeObjectUrl,
  makeVideoScreenshot,
  revokeObjectUrl,
  THUMBNAIL_CONTENT_TYPE,
  THUMBNAIL_SIDE,
} from './VisualAttachment';
import {
  deleteOnDisk,
  getAbsoluteAttachmentPath,
  readAttachmentData,
  writeNewAttachmentData,
} from '../MessageAttachment';

const DEFAULT_JPEG_QUALITY = 0.85;

// File | Blob | URLString -> LoadImageOptions -> Promise<DataURLString>
//
// Documentation for `options` (`LoadImageOptions`):
// https://github.com/blueimp/JavaScript-Load-Image/tree/v2.18.0#options
export const autoOrientImage = async (
  fileOrBlobOrURL: string | File | Blob,
  options = {}
): Promise<string> => {
  const optionsWithDefaults = {
    type: 'image/jpeg',
    quality: DEFAULT_JPEG_QUALITY,
    ...options,

    canvas: true,
    orientation: true,
    maxHeight: 4096, // ATTACHMENT_DEFAULT_MAX_SIDE
    maxWidth: 4096,
  };

  return new Promise((resolve, reject) => {
    loadImage(
      fileOrBlobOrURL,
      canvasOrError => {
        if ((canvasOrError as any).type === 'error') {
          const error = new Error('autoOrientImage: Failed to process image');
          (error as any).cause = canvasOrError;
          reject(error);
          return;
        }

        const canvas = canvasOrError as HTMLCanvasElement;
        const dataURL = canvas.toDataURL(optionsWithDefaults.type, optionsWithDefaults.quality);

        resolve(dataURL);
      },
      optionsWithDefaults
    );
  });
};

// Returns true if `rawAttachment` is a valid attachment based on our current schema.
// Over time, we can expand this definition to become more narrow, e.g. require certain
// fields, etc.
export const isValid = (rawAttachment: any) => {
  // NOTE: We cannot use `_.isPlainObject` because `rawAttachment` is
  // deserialized by protobuf:
  if (!rawAttachment) {
    return false;
  }

  return true;
};

const UNICODE_LEFT_TO_RIGHT_OVERRIDE = '\u202D';
const UNICODE_RIGHT_TO_LEFT_OVERRIDE = '\u202E';
const UNICODE_REPLACEMENT_CHARACTER = '\uFFFD';
const INVALID_CHARACTERS_PATTERN = new RegExp(
  `[${UNICODE_LEFT_TO_RIGHT_OVERRIDE}${UNICODE_RIGHT_TO_LEFT_OVERRIDE}]`,
  'g'
);

// Upgrade steps
// NOTE: This step strips all EXIF metadata from JPEG images as
// part of re-encoding the image:
export const autoOrientJPEG = async (attachment: {
  contentType: string;
  data: ArrayBuffer;
}): Promise<{ contentType: string; data: ArrayBuffer; shouldDeleteDigest: boolean }> => {
  if (!attachment.contentType || !MIME.isJPEG(attachment.contentType)) {
    return { ...attachment, shouldDeleteDigest: false };
  }

  // If we haven't downloaded the attachment yet, we won't have the data
  if (!attachment.data) {
    return { ...attachment, shouldDeleteDigest: false };
  }

  const dataBlob = arrayBufferToBlob(attachment.data, attachment.contentType);
  const newDataBlob = dataURLToBlob(await autoOrientImage(dataBlob));
  const newDataArrayBuffer = await blobToArrayBuffer(newDataBlob);

  // IMPORTANT: We overwrite the existing `data` `ArrayBuffer` losing the original
  // image data. Ideally, we’d preserve the original image data for users who want to
  // retain it but due to reports of data loss, we don’t want to overburden IndexedDB
  // by potentially doubling stored image data.
  // See: https://github.com/signalapp/Signal-Desktop/issues/1589
  // Also, `digest` is no longer valid for auto-oriented image data, so we discard it:

  return {
    contentType: attachment.contentType,
    shouldDeleteDigest: true,
    data: newDataArrayBuffer,
  };
};
// NOTE: Expose synchronous version to do property-based testing using `testcheck`,
// which currently doesn’t support async testing:
// https://github.com/leebyron/testcheck-js/issues/45
export const _replaceUnicodeOrderOverridesSync = (attachment: any) => {
  if (!isString(attachment.fileName)) {
    return attachment;
  }

  const normalizedFilename = attachment.fileName.replace(
    INVALID_CHARACTERS_PATTERN,
    UNICODE_REPLACEMENT_CHARACTER
  );
  const newAttachment = { ...attachment, fileName: normalizedFilename };

  return newAttachment;
};

// const replaceUnicodeOrderOverrides = async (attachment: any) =>
//   _replaceUnicodeOrderOverridesSync(attachment);

// // \u202A-\u202E is LRE, RLE, PDF, LRO, RLO
// // \u2066-\u2069 is LRI, RLI, FSI, PDI
// // \u200E is LRM
// // \u200F is RLM
// // \u061C is ALM
// const V2_UNWANTED_UNICODE = /[\u202A-\u202E\u2066-\u2069\u200E\u200F\u061C]/g;

// const replaceUnicodeV2 = async (attachment: any) => {
//   if (!isString(attachment.fileName)) {
//     return attachment;
//   }

//   const fileName = attachment.fileName.replace(V2_UNWANTED_UNICODE, UNICODE_REPLACEMENT_CHARACTER);

//   return {
//     ...attachment,
//     fileName,
//   };
// };

// const removeSchemaVersion = ({ attachment }: any) => {
//   if (!isValid(attachment)) {
//     window.log.error('Attachment.removeSchemaVersion: Invalid input attachment:', attachment);
//     return attachment;
//   }

//   const attachmentWithoutSchemaVersion = { ...attachment };
//   delete attachmentWithoutSchemaVersion.schemaVersion;
//   return attachmentWithoutSchemaVersion;
// };

//      hasData :: Attachment -> Boolean
export const hasData = (attachment: any) =>
  attachment.data instanceof ArrayBuffer || ArrayBuffer.isView(attachment.data);

//      loadData :: (RelativePath -> IO (Promise ArrayBuffer))
//                  Attachment ->
//                  IO (Promise Attachment)
export const loadData = () => {
  return async (attachment: any) => {
    if (!isValid(attachment)) {
      throw new TypeError("'attachment' is not valid");
    }

    const isAlreadyLoaded = hasData(attachment);

    if (isAlreadyLoaded) {
      return attachment;
    }

    if (!isString(attachment.path)) {
      throw new TypeError("'attachment.path' is required");
    }

    const data = await readAttachmentData(attachment.path);
    return { ...attachment, data };
  };
};

//      deleteData :: (RelativePath -> IO Unit)
//                    Attachment ->
//                    IO Unit
export const deleteData = () => {
  return async (attachment: { path: string; thumbnail: any; screenshot: any }) => {
    if (!isValid(attachment)) {
      throw new TypeError('deleteData: attachment is not valid');
    }

    const { path, thumbnail, screenshot } = attachment;
    if (isString(path)) {
      await deleteOnDisk(path);
    }

    if (thumbnail && isString(thumbnail.path)) {
      await deleteOnDisk(thumbnail.path);
    }

    if (screenshot && isString(screenshot.path)) {
      await deleteOnDisk(screenshot.path);
    }
  };
};
type CaptureDimensionType = { contentType: string; path: string };

export const captureDimensionsAndScreenshot = async (
  attachment: CaptureDimensionType
): Promise<| CaptureDimensionType
| (CaptureDimensionType & {
    width: number;
    height: number;
    thumbnail: {
      path: string;
      contentType: string;
      width: number;
      height: number;
    };
  })
| (CaptureDimensionType & {
    width: number;
    height: number;
    thumbnail: {
      path: string;
      contentType: string;
      width: number;
      height: number;
    };
    screenshot: {
      path: string;
      contentType: string;
      width: number;
      height: number;
    };
  })> => {
  const { contentType } = attachment;

  if (
    !contentType ||
    (!GoogleChrome.isImageTypeSupported(contentType) &&
      !GoogleChrome.isVideoTypeSupported(contentType))
  ) {
    return attachment;
  }

  // If the attachment hasn't been downloaded yet, we won't have a path
  if (!attachment.path) {
    return attachment;
  }

  const absolutePath = getAbsoluteAttachmentPath(attachment.path);

  if (GoogleChrome.isImageTypeSupported(contentType)) {
    try {
      const { width, height } = await getImageDimensions({
        objectUrl: absolutePath,
      });
      const thumbnailBuffer = await makeImageThumbnailBuffer({
        objectUrl: absolutePath,
        contentType,
      });

      const thumbnailPath = await writeNewAttachmentData(thumbnailBuffer);
      return {
        ...attachment,
        width,
        height,
        thumbnail: {
          path: thumbnailPath,
          contentType: THUMBNAIL_CONTENT_TYPE,
          width: THUMBNAIL_SIDE,
          height: THUMBNAIL_SIDE,
        },
      };
    } catch (error) {
      window.log.error(
        'captureDimensionsAndScreenshot:',
        'error processing image; skipping screenshot generation',
        toLogFormat(error)
      );
      return attachment;
    }
  }

  let screenshotObjectUrl;
  try {
    const screenshotBuffer = await blobToArrayBuffer(
      await makeVideoScreenshot({
        objectUrl: absolutePath,
        contentType: THUMBNAIL_CONTENT_TYPE,
      })
    );
    screenshotObjectUrl = makeObjectUrl(screenshotBuffer, THUMBNAIL_CONTENT_TYPE);
    const { width, height } = await getImageDimensions({
      objectUrl: screenshotObjectUrl,
    });
    const screenshotPath = await writeNewAttachmentData(screenshotBuffer);

    const thumbnailBuffer = await makeImageThumbnailBuffer({
      objectUrl: screenshotObjectUrl,
      contentType: THUMBNAIL_CONTENT_TYPE,
    });

    const thumbnailPath = await writeNewAttachmentData(thumbnailBuffer);

    return {
      ...attachment,
      screenshot: {
        contentType: THUMBNAIL_CONTENT_TYPE,
        path: screenshotPath,
        width,
        height,
      },
      thumbnail: {
        path: thumbnailPath,
        contentType: THUMBNAIL_CONTENT_TYPE,
        width: THUMBNAIL_SIDE,
        height: THUMBNAIL_SIDE,
      },
      width,
      height,
    };
  } catch (error) {
    window.log.error(
      'captureDimensionsAndScreenshot: error processing video; skipping screenshot generation',
      toLogFormat(error)
    );
    return attachment;
  } finally {
    if (screenshotObjectUrl) {
      revokeObjectUrl(screenshotObjectUrl);
    }
  }
};
