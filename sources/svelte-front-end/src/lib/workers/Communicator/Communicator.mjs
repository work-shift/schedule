import {
  WebsocketErrorCodes,
} from '@work-shift/lib-websocket-error-codes/WebsocketErrorCodes.mjs';

export class Communicator {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
    this.CLOSE_MESSAGE = this.encoder.encode('bye');

    this.client = null;

    this.startClient = this.startClient.bind(this);
    this.handleCustomEvent = this.handleCustomEvent.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    console.log(`${this.constructor.name}.ctor`);
  }

  handleClose(closeEvent) {
    console.log(`${this.constructor.name}.handleClose`, closeEvent);
  }

  handleMessage(messageEvent) {
    const messageObject = JSON.parse(messageEvent.data);

    switch(messageObject.type) {
      case 'registrationOptions': {
        console.log({
          messageObject
        });

        break;
      }
      default: {
        console.error(`${this.constructor.name}.handleMessage`, messageObject);

        break;
      }
    }
  }

  handleError(errorEvent) {
    console.log(`${this.constructor.name}.handleError`, errorEvent);
  }

  handleCustomEvent(customEvent = null) {
    if (customEvent === null || customEvent.isTrusted === false) {
      return;
    }

    switch (customEvent.data.type) {
      case 'register:start': {
        console.log(`${this.constructor.name}.handleCustomEvent:`, customEvent.data);

        const binaryMessage = this.encoder.encode(JSON.stringify(customEvent.data));

        this.client.send(binaryMessage);

        break;
      }
      default: {
        console.error(`${this.constructor.name}.handleCustomEvent::unknown`, customEvent);

        break;
      }
    }
  }

  startClient(url = null) {
    return new Promise((resolve, reject) => {
      try {
        this.client = new WebSocket(url, []);
        this.client.binaryType = 'arraybuffer';

        this.client.onopen = function handleOpenEvent (openEvent) {
          console.log(`${this.constructor.name}.handleOpenEvent`, openEvent);

          if (openEvent.isTrusted === false) {
            return reject(new Error('openEvent is untrusted'));
          }
  
          this.client.onopen = undefined;

          resolve();
        }.bind(this);
        this.client.addEventListener('close', this.handleClose);
        this.client.addEventListener('message', this.handleMessage);
        this.client.addEventListener('error', this.handleError);
        
      } catch (clientError) {
        reject(clientError);
      }
    });
  }

  async start(url = null) {
    if (this.client !== null) {
      return;
    }

    await this.startClient(url);

    window.addEventListener('message', this.handleCustomEvent);

    console.log(`${this.constructor.name}.start`);
  }

  async stop() {
    if (typeof this.client !== 'undefined') {
      // FIXME: should wait for the close event
      this.client.close(WebsocketErrorCodes.CLOSE_NORMAL, this.CLOSE_MESSAGE);

      window.removeEventListener('message', this.handleCustomEvent);

      this.client.removeEventListener('close', this.handleClose);
      this.client.removeEventListener('message', this.handleMessage);
      this.client.removeEventListener('error', this.handleError);

      this.client = undefined;
    }
    console.log(`${this.constructor.name}.stop`);
  }
}
