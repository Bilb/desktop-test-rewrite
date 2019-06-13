/* global textsecure */
const https = require('https');
const EventEmitter = require('events');
const natUpnp = require('nat-upnp');

const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
};

class LocalLokiServer extends EventEmitter {
  /**
   * Creates an instance of LocalLokiServer.
   * Sends out a `message` event when a new message is received.
   */
  constructor(pems) {
    super();
    const options = {
      key: pems.private,
      cert: pems.cert,
    };
    this.upnpClient = natUpnp.createClient();
    this.server = https.createServer(options, (req, res) => {
      let body = [];

      const sendResponse = (statusCode, message = null) => {
        const headers = message && {
          'Content-Type': 'text/plain',
        };
        res.writeHead(statusCode, headers);
        res.end(message);
      };

      if (req.method !== 'POST') {
        sendResponse(STATUS.METHOD_NOT_ALLOWED);
        return;
      }

      // Check endpoints
      req
        .on('error', () => {
          // Internal server error
          sendResponse(STATUS.INTERNAL_SERVER_ERROR);
        })
        .on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          try {
            body = Buffer.concat(body).toString();
          } catch (e) {
            // Internal server error: failed to convert body to string
            sendResponse(STATUS.INTERNAL_SERVER_ERROR);
          }

          // Check endpoints here
          if (req.url === '/storage_rpc/v1') {
            try {
              const bodyObject = JSON.parse(body);
              if (bodyObject.method !== 'store') {
                sendResponse(STATUS.NOT_FOUND, 'Invalid endpoint!');
                return;
              }
              this.emit('message', {
                message: bodyObject.params.data,
                onSuccess: () => sendResponse(STATUS.OK),
                onFailure: () => sendResponse(STATUS.NOT_FOUND),
              });
            } catch (e) {
              // Bad Request: Failed to decode json
              sendResponse(STATUS.BAD_REQUEST, 'Failed to decode JSON');
            }
          } else {
            sendResponse(STATUS.NOT_FOUND, 'Invalid endpoint!');
          }
        });
    });
  }

  async start(port, ip) {
    // Close the old server
    await this.close();

    // Start a listening on new server
    return new Promise((res, rej) => {
      this.server.listen(port, ip, async (err) => {
        if (err) {
          rej(err);
        } else {
          try{
            const publicPort = await this.punchHole();
            res(publicPort);
          } catch(e) {
            if (e instanceof textsecure.HolePunchingError)
            await this.close();
            rej(e);
          }
        }
      });
    });
  }

  async punchHole() {
    const privatePort = this.server.address().port;
    const portStart = 22100;
    const portEnd = 22200;
    const publicPortsInUse = await new Promise((resolve) => {
      this.upnpClient.getMappings({ local: true }, (err, results) => {
        if (err) {
          resolve([]);
        }
        else {
          resolve(results.map(entry => entry.public.port));
        }
      });
    });

    for (let publicPort = portStart; publicPort <= portEnd; publicPort += 1) {
      if (publicPortsInUse.includes(publicPort))
        // eslint-disable-next-line no-continue
        continue;
      const p = new Promise((resolve, reject) => {
        this.upnpClient.portMapping({
          public: publicPort,
          private: privatePort,
          ttl: 100000,
        }, (err) => {
          if (err)
            reject(err);
          else
            resolve();
        });
      });
      try {
        // eslint-disable-next-line no-await-in-loop
        await p;
        this.publicPort = publicPort;
        return publicPort;
      } catch(e) {
        // continue
      }
    }
    throw new textsecure.HolePunchingError(`Could not punch hole. Public ports: ${portStart}-${portEnd}`);
  }
  // Async wrapper for http server close
  close() {
    if (this.publicPort) {
      this.upnpClient.portUnmapping({
        public: this.publicPort,
      });
      this.publicPort = null;
    }
    if (this.server) {
      return new Promise(res => {
        this.server.close(() => res());
      });
    }

    return Promise.resolve();
  }

  getPort() {
    if (this.server.listening) {
      return this.server.address().port;
    }

    return null;
  }

  getPublicPort() {
    return this.publicPort;
  }

  isListening() {
    return this.server.listening;
  }
}

module.exports = LocalLokiServer;
