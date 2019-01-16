/* global , Whisper, storage */
/* global textsecure: false */

/* eslint-disable more/no-then */

// eslint-disable-next-line func-names
(function() {
  'use strict';

  window.Whisper = window.Whisper || {};

  const blockedNumbers = new Whisper.BlockedNumberCollection();
  window.getBlockedNumbers = () => blockedNumbers;

  window.BlockedNumberController = {
    getAll() {
      try {
        this.load();
      } catch (e) {
        window.log.warn(e);
      }
      return blockedNumbers;
    },
    reset() {
      blockedNumbers.reset([]);
    },
    load() {
      window.log.info('BlockedNumberController: starting initial fetch');

      if (blockedNumbers.length) {
        throw new Error('BlockedNumberController: Already loaded!');
      }

      if (!storage) {
        throw new Error(
          'BlockedNumberController: Could not load blocked numbers'
        );
      }

      // Add the numbers to the collection
      const numbers = storage.getBlockedNumbers();
      blockedNumbers.add(numbers.map(number => ({ number })));
    },
    block(number) {
      const ourNumber = textsecure.storage.user.getNumber();

      // Make sure we don't block ourselves
      if (ourNumber === number) {
        window.log.info('BlockedNumberController: Cannot block yourself!');
        return;
      }

      storage.addBlockedNumber(number);

      // Make sure we don't add duplicates
      if (blockedNumbers.getNumber(number)) return;

      blockedNumbers.add({ number });
    },
    unblock(number) {
      storage.removeBlockedNumber(number);

      // Make sure we don't add duplicates
      const model = blockedNumbers.getNumber(number);
      if (model) {
        blockedNumbers.remove(model);
      }
    },
    unblockAll() {
      const all = blockedNumbers.models;
      all.forEach(number => {
        storage.removeBlockedNumber(number);
        blockedNumbers.remove(number);
      });
    },
    isBlocked(number) {
      return storage.isBlocked(number);
    },
  };
})();
