/* global textsecure: false */
/* global Whisper: false */
/* global i18n: false */
/* global loadImage: false */
/* global Backbone: false */
/* global _: false */
/* global Signal: false */

// eslint-disable-next-line func-names
(function() {
  'use strict';

  window.Whisper = window.Whisper || {};

  const { MIME, VisualAttachment } = window.Signal.Types;

  Whisper.FileSizeToast = Whisper.ToastView.extend({
    templateName: 'file-size-modal',
    render_attributes() {
      return {
        'file-size-warning': i18n('fileSizeWarning'),
        limit: this.model.limit,
        units: this.model.units,
      };
    },
  });
  Whisper.UnableToLoadToast = Whisper.ToastView.extend({
    render_attributes() {
      return { toastMessage: i18n('unableToLoadAttachment') };
    },
  });

  Whisper.DangerousFileTypeToast = Whisper.ToastView.extend({
    template: i18n('dangerousFileType'),
  });
  Whisper.OneNonImageAtATimeToast = Whisper.ToastView.extend({
    template: i18n('oneNonImageAtATimeToast'),
  });
  Whisper.CannotMixImageAndNonImageAttachmentsToast = Whisper.ToastView.extend({
    template: i18n('cannotMixImageAdnNonImageAttachments'),
  });
  Whisper.MaxAttachmentsToast = Whisper.ToastView.extend({
    template: i18n('maximumAttachments'),
  });
  Whisper.MaxOneAttachmentToast = Whisper.ToastView.extend({
    template: i18n('maxOneAttachmentToast'),
  });

  Whisper.FileInputView = Backbone.View.extend({
    tagName: 'span',
    className: 'file-input',
    initialize() {
      this.attachments = [];

      this.attachmentListView = new Whisper.ReactWrapperView({
        el: this.el,
        Component: window.Signal.Components.AttachmentList,
        props: this.getPropsForAttachmentList(),
      });
    },

    remove() {
      if (this.attachmentListView) {
        this.attachmentListView.remove();
      }
      if (this.captionEditorView) {
        this.captionEditorView.remove();
      }

      Backbone.View.prototype.remove.call(this);
    },

    render() {
      this.attachmentListView.update(this.getPropsForAttachmentList());
    },

    getPropsForAttachmentList() {
      const { attachments } = this;

      // We never want to display voice notes in our attachment list
      if (_.any(attachments, attachment => Boolean(attachment.isVoiceNote))) {
        return {
          attachments: [],
        };
      }

      return {
        attachments,
        onClickAttachment: this.onClickAttachment.bind(this),
        onCloseAttachment: this.onCloseAttachment.bind(this),
        onClose: this.onClose.bind(this),
      };
    },

    onClickAttachment(attachment) {
      const getProps = () => ({
        url: attachment.videoUrl || attachment.url,
        caption: attachment.caption,
        attachment,
        onChangeCaption,
      });

      const update = () => {
        this.captionEditorView.update(getProps());
      };

      const onChangeCaption = caption => {
        // eslint-disable-next-line no-param-reassign
        attachment.caption = caption;
        this.render();
        update();
      };

      this.captionEditorView = new Whisper.ReactWrapperView({
        className: 'attachment-list-wrapper',
        Component: window.Signal.Components.CaptionEditor,
        props: getProps(),
        onClose: () => Signal.Backbone.Views.Lightbox.hide(),
      });
      Signal.Backbone.Views.Lightbox.show(this.captionEditorView.el);
    },

    onCloseAttachment(attachment) {
      this.attachments = _.without(this.attachments, attachment);
      this.trigger('attachments-changed');
      this.render();
    },

    onClose() {
      this.attachments = [];
      this.trigger('attachments-changed');
      this.render();
    },

    // These event handlers are called by ConversationView, which listens for these events

    onDragOver(e) {
      if (e.originalEvent.dataTransfer.types[0] !== 'Files') {
        return;
      }

      e.stopPropagation();
      e.preventDefault();
      this.$el.addClass('dropoff');
    },

    onDragLeave(e) {
      if (e.originalEvent.dataTransfer.types[0] !== 'Files') {
        return;
      }

      e.stopPropagation();
      e.preventDefault();
      this.$el.removeClass('dropoff');
    },

    onDrop(e) {
      if (e.originalEvent.dataTransfer.types[0] !== 'Files') {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      // eslint-disable-next-line prefer-destructuring
      const file = e.originalEvent.dataTransfer.files[0];
      this.maybeAddAttachment(file);
      this.$el.removeClass('dropoff');
    },

    onPaste(e) {
      const { items } = e.originalEvent.clipboardData;
      let imgBlob = null;
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].type.split('/')[0] === 'image') {
          imgBlob = items[i].getAsFile();
        }
      }
      if (imgBlob !== null) {
        const file = imgBlob;
        this.maybeAddAttachment(file);

        e.stopPropagation();
        e.preventDefault();
      }
    },

    // Public interface

    hasFiles() {
      return this.attachments.length > 0;
    },

    async getFiles() {
      const files = await Promise.all(
        this.attachments.map(attachment => this.getFile(attachment))
      );
      this.clearAttachments();
      return files;
    },

    clearAttachments() {
      this.attachments.forEach(attachment => {
        if (attachment.url) {
          URL.revokeObjectURL(attachment.url);
        }
        if (attachment.videoUrl) {
          URL.revokeObjectURL(attachment.videoUrl);
        }
      });

      this.attachments = [];
      this.render();
      this.$el.trigger('force-resize');
    },

    // Show errors

    showLoadFailure() {
      const toast = new Whisper.UnableToLoadToast();
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    showDangerousError() {
      const toast = new Whisper.DangerousFileTypeToast();
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    showFileSizeError({ limit, units, u }) {
      const toast = new Whisper.FileSizeToast({
        model: { limit, units: units[u] },
      });
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    showCannotMixError() {
      const toast = new Whisper.CannotMixImageAndNonImageAttachmentsToast();
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    showMultipleNonImageError() {
      const toast = new Whisper.OneNonImageAtATimeToast();
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    showMaximumAttachmentsError() {
      const toast = new Whisper.MaxAttachmentsToast();
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    showMaxOneAttachmentError() {
      const toast = new Whisper.MaxOneAttachmentToast();
      toast.$el.insertAfter(this.$el);
      toast.render();
    },

    // Housekeeping

    addAttachment(attachment) {
      if (attachment.isVoiceNote && this.attachments.length > 0) {
        throw new Error('A voice note cannot be sent with other attachments');
      }

      this.attachments.push(attachment);
      this.render();
      this.trigger('attachments-changed');
    },

    async maybeAddAttachment(file) {
      if (!file) {
        return;
      }

      const fileName = file.name;
      const contentType = file.type;

      // TODO: remove this when clients are ready to remove multiple image attachments
      if (this.attachments.length > 0) {
        this.showMaxOneAttachmentError();
        return;
      }

      if (window.Signal.Util.isFileDangerous(fileName)) {
        this.showDangerousError();
        return;
      }

      if (this.attachments.length >= 32) {
        this.showMaximumAttachmentsError();
        return;
      }

      const haveNonImage = _.any(
        this.attachments,
        attachment => !MIME.isImage(attachment.contentType)
      );
      // You can't add another attachment if you already have a non-image staged
      if (haveNonImage) {
        this.showMultipleNonImageError();
        return;
      }

      // You can't add a non-image attachment if you already have attachments staged
      if (!MIME.isImage(contentType) && this.attachments.length > 0) {
        this.showCannotMixError();
        return;
      }

      const renderVideoPreview = async () => {
        const objectUrl = URL.createObjectURL(file);
        try {
          const type = 'image/png';
          const thumbnail = await VisualAttachment.makeVideoScreenshot({
            objectUrl,
            contentType: type,
            logger: window.log,
          });
          const data = await VisualAttachment.blobToArrayBuffer(thumbnail);
          const url = Signal.Util.arrayBufferToObjectURL({
            data,
            type,
          });
          this.addAttachment({
            file,
            size: file.size,
            fileName,
            contentType,
            videoUrl: objectUrl,
            url,
          });
        } catch (error) {
          URL.revokeObjectURL(objectUrl);
        }
      };

      const renderImagePreview = async () => {
        if (!MIME.isJPEG(contentType)) {
          const url = URL.createObjectURL(file);
          if (!url) {
            throw new Error('Failed to create object url for image!');
          }
          this.addAttachment({
            file,
            size: file.size,
            fileName,
            contentType,
            url,
          });
          return;
        }

        const url = await window.autoOrientImage(file);
        this.addAttachment({
          file,
          size: file.size,
          fileName,
          contentType,
          url,
        });
      };

      try {
        const blob = await this.autoScale({
          contentType,
          file,
        });
        let limitKb = 1000000;
        const blobType =
          file.type === 'image/gif' ? 'gif' : contentType.split('/')[0];

        switch (blobType) {
          case 'image':
            limitKb = 6000;
            break;
          case 'gif':
            limitKb = 25000;
            break;
          case 'audio':
            limitKb = 100000;
            break;
          case 'video':
            limitKb = 100000;
            break;
          default:
            limitKb = 100000;
            break;
        }
        if ((blob.size / 1024).toFixed(4) >= limitKb) {
          const units = ['kB', 'MB', 'GB'];
          let u = -1;
          let limit = limitKb * 1000;
          do {
            limit /= 1000;
            u += 1;
          } while (limit >= 1000 && u < units.length - 1);
          this.showFileSizeError({ limit, units, u });
          return;
        }
      } catch (error) {
        window.log.error(
          'Error ensuring that image is properly sized:',
          error && error.stack ? error.stack : error
        );

        this.showLoadFailure();
        return;
      }

      try {
        if (Signal.Util.GoogleChrome.isImageTypeSupported(contentType)) {
          await renderImagePreview();
        } else if (Signal.Util.GoogleChrome.isVideoTypeSupported(contentType)) {
          await renderVideoPreview();
        } else {
          this.addAttachment({
            file,
            size: file.size,
            contentType,
            fileName,
          });
        }
      } catch (e) {
        window.log.error(
          `Was unable to generate thumbnail for file type ${contentType}`,
          e && e.stack ? e.stack : e
        );
        this.addAttachment({
          file,
          size: file.size,
          contentType,
          fileName,
        });
      }
    },

    autoScale(attachment) {
      const { contentType, file } = attachment;
      if (
        contentType.split('/')[0] !== 'image' ||
        contentType === 'image/tiff'
      ) {
        // nothing to do
        return Promise.resolve(attachment);
      }

      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.onerror = reject;
        img.onload = () => {
          URL.revokeObjectURL(url);

          const maxSize = 6000 * 1024;
          const maxHeight = 4096;
          const maxWidth = 4096;
          if (
            img.naturalWidth <= maxWidth &&
            img.naturalHeight <= maxHeight &&
            file.size <= maxSize
          ) {
            resolve(attachment);
            return;
          }

          const gifMaxSize = 25000 * 1024;
          if (file.type === 'image/gif' && file.size <= gifMaxSize) {
            resolve(attachment);
            return;
          }

          if (file.type === 'image/gif') {
            reject(new Error('GIF is too large'));
            return;
          }

          const canvas = loadImage.scale(img, {
            canvas: true,
            maxWidth,
            maxHeight,
          });

          let quality = 0.95;
          let i = 4;
          let blob;
          do {
            i -= 1;
            blob = window.dataURLToBlobSync(
              canvas.toDataURL('image/jpeg', quality)
            );
            quality = quality * maxSize / blob.size;
            // NOTE: During testing with a large image, we observed the
            // `quality` value being > 1. Should we clamp it to [0.5, 1.0]?
            // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Syntax
            if (quality < 0.5) {
              quality = 0.5;
            }
          } while (i > 0 && blob.size > maxSize);

          resolve({
            ...attachment,
            file: blob,
          });
        };
        img.src = url;
      });
    },

    async getFile(attachment) {
      if (!attachment) {
        return Promise.resolve();
      }

      const attachmentFlags = attachment.isVoiceNote
        ? textsecure.protobuf.AttachmentPointer.Flags.VOICE_MESSAGE
        : null;

      const scaled = await this.autoScale(attachment);
      const fileRead = await this.readFile(scaled);
      return {
        ...fileRead,
        url: undefined,
        videoUrl: undefined,
        flags: attachmentFlags || null,
      };
    },

    readFile(attachment) {
      return new Promise((resolve, reject) => {
        const FR = new FileReader();
        FR.onload = e => {
          resolve({
            ...attachment,
            data: e.target.result,
          });
        };
        FR.onerror = reject;
        FR.onabort = reject;
        FR.readAsArrayBuffer(attachment.file);
      });
    },
  });
})();
