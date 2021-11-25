import util from 'util';
import uWS from 'uWebSockets.js';
import {
  Paths,
} from './paths/Paths.mjs';
import {
  handleRootPath,
} from './paths/root/handleRootPath.mjs';

export class LibWebsocketServer {
  // eslint-disable-next-line class-methods-use-this
  #debuglog = () => {};
  #config = null;
  #server = null;
  #handle = null;

  constructor(config = null) {
    this.#debuglog = util.debuglog(this.constructor.name);
    this.#config = Object.freeze({ ...config });
  }

  #getOptsByPath(path = null) {
    return {
      ...this.#config.pathOpts[path],
      ...{
        compression: uWS.SHARED_COMPRESSOR,
      },
    } ?? null;
  }

  start() {
    return new Promise((resolve, reject) => {
      if (this.#handle) {
        this.#debuglog(`${this.constructor.name} has ALREADY been started on ${this.#config.host}:${this.#config.port}`);

        resolve();
      } else {
        this.#server = uWS
          .App({})
          .ws(Paths.ROOT, handleRootPath({
            wsOpts: this.#getOptsByPath(Paths.ROOT),
            debuglog: this.#debuglog,
          }))
          .any('/*', (res) => {
            res.end('go away');
          })
          .listen(this.#config.server.port, this.#config.server.host, (handle) => {
            if (handle) {
              this.#handle = handle;

              this.#debuglog(`${this.constructor.name} started on ${this.#config.server.host}:${this.#config.server.port}`);

              resolve();
            } else {
              reject(new Error(`${this.constructor.name} FAILED to start on ${this.#config.server.host}:${this.#config.server.port}`));
            }
          });
      }
    });
  }

  stop() {
    if (this.#handle) {
      uWS.us_listen_socket_close(this.#handle);
      this.#handle = null;
    }

    this.#debuglog(`${this.constructor.name} stopped listening on ${this.#config.server.host}:${this.#config.server.port}`);
  }
}
