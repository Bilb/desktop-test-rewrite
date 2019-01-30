/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* global log, dcodeIO, window, callWorker */

const fetch = require('node-fetch');
const _ = require('lodash');

// Will be raised (to 3?) when we get more nodes
const MINIMUM_SUCCESSFUL_REQUESTS = 2;

class LokiMessageAPI {
  constructor({ messageServerPort }) {
    this.messageServerPort = messageServerPort ? `:${messageServerPort}` : '';
  }

  async sendMessage(pubKey, data, messageTimeStamp, ttl) {
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
      nonce = await callWorker(
        'calcPoW',
        timestamp,
        ttl,
        pubKey,
        data64,
        development
      );
    } catch (err) {
      // Something went horribly wrong
      throw err;
    }
    const completedNodes = [];
    let successfulRequests = 0;
    let canResolve = true;

    const doRequest = async nodeUrl => {
      // TODO: Confirm sensible timeout
      const options = {
        url: `${nodeUrl}${this.messageServerPort}/store`,
        type: 'POST',
        responseType: undefined,
        timeout: 10000,
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
        if (e.code === 'ENOTFOUND') {
          // TODO: Handle the case where lokinet is not working
          canResolve = false;
          return;
        }
        log.error(options.type, options.url, 0, 'Error sending message');
        if (window.LokiSnodeAPI.unreachableNode(pubKey, nodeUrl)) {
          completedNodes.push(nodeUrl);
          swarmNodes = swarmNodes.filter(node => node !== nodeUrl);
        }
        return;
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
        completedNodes.push(nodeUrl);
        swarmNodes = swarmNodes.filter(node => node !== nodeUrl);
        successfulRequests += 1;
        return;
      }
      log.error(
        options.type,
        options.url,
        response.status,
        'Error sending message'
      );
      throw HTTPError('sendMessage: error response', response.status, result);
    };

    let swarmNodes = await window.LokiSnodeAPI.getSwarmNodesByPubkey(pubKey);
    while (successfulRequests < MINIMUM_SUCCESSFUL_REQUESTS) {
      if (!canResolve) {
        throw new window.textsecure.DNSResolutionError('Sending messages');
      }
      if (swarmNodes.length === 0) {
        swarmNodes = await window.LokiSnodeAPI.getFreshSwarmNodes(pubKey);
        swarmNodes = _.difference(swarmNodes, completedNodes);
        if (swarmNodes.length === 0) {
          if (successfulRequests !== 0) {
            // TODO: Decide how to handle some completed requests but not enough
            return;
          }
          throw new window.textsecure.EmptySwarmError(
            pubKey,
            new Error('Ran out of swarm nodes to query')
          );
        }
        await window.LokiSnodeAPI.saveSwarmNodes(pubKey, swarmNodes);
      }
      const remainingRequests =
        MINIMUM_SUCCESSFUL_REQUESTS - completedNodes.length;
      await Promise.all(
        swarmNodes
          .splice(0, remainingRequests)
          .map(nodeUrl => doRequest(nodeUrl))
      );
    }
  }

  async retrieveMessages(callback) {
    const ourKey = window.textsecure.storage.user.getNumber();
    const completedNodes = [];
    let canResolve = true;
    let successfulRequests = 0;

    const doRequest = async (nodeUrl, nodeData) => {
      // TODO: Confirm sensible timeout
      const options = {
        url: `${nodeUrl}${this.messageServerPort}/retrieve`,
        type: 'GET',
        responseType: 'json',
        timeout: 10000,
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
        if (e.code === 'ENOTFOUND') {
          // TODO: Handle the case where lokinet is not working
          canResolve = false;
          return;
        }
        log.error(
          options.type,
          options.url,
          0,
          `Error retrieving messages from ${nodeUrl}`
        );
        if (window.LokiSnodeAPI.unreachableNode(ourKey, nodeUrl)) {
          completedNodes.push(nodeUrl);
          delete ourSwarmNodes[nodeUrl];
        }
        return;
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
      completedNodes.push(nodeUrl);
      delete ourSwarmNodes[nodeUrl];

      if (response.status === 200) {
        if (result.lastHash) {
          window.LokiSnodeAPI.updateLastHash(nodeUrl, result.lastHash);
          callback(result.messages);
        }
        successfulRequests += 1;
        return;
      }
      // Handle error from snode
      log.error(options.type, options.url, response.status, 'Error');
    };

    let ourSwarmNodes;
    try {
      ourSwarmNodes = await window.LokiSnodeAPI.getOurSwarmNodes();
    } catch (e) {
      throw new window.textsecure.EmptySwarmError(
        window.textsecure.storage.user.getNumber(),
        e
      );
    }
    while (successfulRequests < MINIMUM_SUCCESSFUL_REQUESTS) {
      if (!canResolve) {
        throw new window.textsecure.DNSResolutionError('Retrieving messages');
      }
      if (Object.keys(ourSwarmNodes).length === 0) {
        try {
          ourSwarmNodes = await window.LokiSnodeAPI.getOurSwarmNodes();
          // Filter out the nodes we have already got responses from
          completedNodes.forEach(nodeUrl => delete ourSwarmNodes[nodeUrl]);
        } catch (e) {
          throw new window.textsecure.EmptySwarmError(
            window.textsecure.storage.user.getNumber(),
            e
          );
        }
        if (Object.keys(ourSwarmNodes).length === 0) {
          if (successfulRequests !== 0) {
            // TODO: Decide how to handle some completed requests but not enough
            return;
          }
          throw new window.textsecure.EmptySwarmError(
            window.textsecure.storage.user.getNumber(),
            new Error('Ran out of swarm nodes to query')
          );
        }
      }

      const remainingRequests =
        MINIMUM_SUCCESSFUL_REQUESTS - completedNodes.length;
      await Promise.all(
        Object.entries(ourSwarmNodes)
          .splice(0, remainingRequests)
          .map(([nodeUrl, lastHash]) => doRequest(nodeUrl, lastHash))
      );
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
