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

  start() {
    return new Promise((resolve, reject) => {
      if (this.#handle) {
        this.#debuglog(`${this.constructor.name} has ALREADY been started on ${this.#config.host}:${this.#config.port}`);

        resolve();
      } else {
        this.#server = uWS
          .App({})
          .ws(Paths.ROOT, handleRootPath())
          .any('/*', (res) => {
            res.end('go away');
          })
          .listen(this.#config.port, this.#config.host, (handle) => {
            if (handle) {
              this.#handle = handle;

              this.#debuglog(`${this.constructor.name} started on ${this.#config.host}:${this.#config.port}`);

              resolve();
            } else {
              reject(new Error(`${this.constructor.name} FAILED to start on ${this.#config.host}:${this.#config.port}`));
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

    this.#debuglog(`${this.constructor.name} stopped listening to ${this.#config.host}:${this.#config.port}`);
  }
}
