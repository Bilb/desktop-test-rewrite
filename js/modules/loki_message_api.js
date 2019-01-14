/* eslint-disable no-await-in-loop */
/* global log, dcodeIO, window, callWorker */

const fetch = require('node-fetch');

// eslint-disable-next-line
const invert  = p  => new Promise((res, rej) => p.then(rej, res));
const firstOf = ps => invert(Promise.all(ps.map(invert)));

// Will be raised (to 3?) when we get more nodes
const MINIMUM_SUCCESSFUL_REQUESTS = 2;
class LokiMessageAPI {

  constructor({ messageServerPort }) {
    this.messageServerPort = messageServerPort
      ? `:${messageServerPort}`
      : '';
  }

  async sendMessage(pubKey, data, messageTimeStamp, ttl) {
    const swarmNodes = await window.LokiSnodeAPI.getSwarmNodesByPubkey(pubKey)
    if (!swarmNodes || swarmNodes.length === 0) {
      throw Error('No swarm nodes to query!');
    }

    const data64 = dcodeIO.ByteBuffer.wrap(data).toString('base64');
    const timestamp = Math.floor(Date.now() / 1000);
    // Nonce is returned as a base64 string to include in header
    let nonce;
    try {
      window.Whisper.events.trigger('calculatingPoW', {
        pubKey,
        timestamp: messageTimeStamp,
      });
      const development = window.getEnvironment() !== 'production';
      nonce = await callWorker('calcPoW', timestamp, ttl, pubKey, data64, development);
    } catch (err) {
      // Something went horribly wrong
      throw err;
    }

    const requests = swarmNodes.map(async node => {
      const options = {
        url: `${node}${this.messageServerPort}/store`,
        type: 'POST',
        responseType: undefined,
        timeout: undefined,
      };

      const fetchOptions = {
        method: options.type,
        body: data64,
        headers: {
          'X-Loki-pow-nonce': nonce,
          'X-Loki-timestamp': timestamp.toString(),
          'X-Loki-ttl': ttl.toString(),
          'X-Loki-recipient': pubKey,
        },
        timeout: options.timeout,
      };

      let response;
      try {
        response = await fetch(options.url, fetchOptions);
      } catch (e) {
        log.error(options.type, options.url, 0, 'Error sending message');
        window.LokiSnodeAPI.unreachableNode(pubKey, node);
        throw HTTPError('fetch error', 0, e.toString());
      }

      let result;
      if (
        options.responseType === 'json' &&
        response.headers.get('Content-Type') === 'application/json'
      ) {
        result = await response.json();
      } else if (options.responseType === 'arraybuffer') {
        result = await response.buffer();
      } else {
        result = await response.text();
      }

      if (response.status >= 0 && response.status < 400) {
        return result;
      }
      log.error(options.type, options.url, response.status, 'Error sending message');
      throw HTTPError('sendMessage: error response', response.status, result);
    });
    try {
      // TODO: Possibly change this to require more than a single response?
      const result = await firstOf(requests);
      return result;
    } catch(err) {
      throw err;
    }
  }

  async retrieveMessages(callback) {
    let ourSwarmNodes = await window.LokiSnodeAPI.getOurSwarmNodes();
    const ourKey = window.textsecure.storage.user.getNumber();
    let completedRequests = 0;

    const doRequest = async (nodeUrl, nodeData) => {
      const options = {
        url: `${nodeUrl}${this.messageServerPort}/retrieve`,
        type: 'GET',
        responseType: 'json',
        timeout: undefined,
      };

      const headers = {
        'X-Loki-recipient': ourKey,
      };

      if (nodeData.lastHash) {
        headers['X-Loki-last-hash'] = nodeData.lastHash;
      }

      const fetchOptions = {
        method: options.type,
        headers,
        timeout: options.timeout,
      };
      let response;
      try {
        response = await fetch(options.url, fetchOptions);
      } catch (e) {
        // TODO: Maybe we shouldn't immediately delete?
        log.error(options.type, options.url, 0, `Error retrieving messages from ${nodeUrl}`);
        window.LokiSnodeAPI.unreachableNode(ourKey, nodeUrl);
        throw HTTPError('fetch error', 0, e.toString());
      }

      let result;
      if (
        options.responseType === 'json' &&
        response.headers.get('Content-Type') === 'application/json'
      ) {
        result = await response.json();
      } else if (options.responseType === 'arraybuffer') {
        result = await response.buffer();
      } else {
        result = await response.text();
      }
      completedRequests += 1;

      if (response.status >= 0 && response.status < 400) {
        if (result.lastHash) {
          window.LokiSnodeAPI.updateLastHash(nodeUrl, result.lastHash);
        }
        return result;
      }
      log.error(options.type, options.url, response.status, 'Error');
      throw HTTPError('retrieveMessages: error response', response.status, result);
    }

    while (completedRequests < MINIMUM_SUCCESSFUL_REQUESTS) {
      const remainingRequests = MINIMUM_SUCCESSFUL_REQUESTS - completedRequests;
      ourSwarmNodes = await window.LokiSnodeAPI.getOurSwarmNodes();
      if (Object.keys(ourSwarmNodes).length < remainingRequests) {
        if (completedRequests !== 0) {
          // TODO: Decide how to handle some completed requests but not enough
        }
        return;
      }

      const requests = await Promise.all(
        Object.entries(ourSwarmNodes)
          .splice(0, remainingRequests)
          .map(([nodeUrl, lastHash]) => doRequest(nodeUrl, lastHash).catch(() => null))
      );
      // Requests is now an array of null for failed requests and the json for success
      requests.filter(v => v !== null && 'messages' in v)
        .forEach(v => callback(v.messages));
    }
  }
}

function HTTPError(message, providedCode, response, stack) {
  const code = providedCode > 999 || providedCode < 100 ? -1 : providedCode;
  const e = new Error(`${message}; code: ${code}`);
  e.name = 'HTTPError';
  e.code = code;
  if (stack) {
    e.stack += `\nOriginal stack:\n${stack}`;
  }
  if (response) {
    e.response = response;
  }
  return e;
}

module.exports = {
  LokiMessageAPI,
};
