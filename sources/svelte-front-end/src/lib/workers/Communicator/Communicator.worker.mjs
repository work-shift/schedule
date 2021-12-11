import {
  WebsocketErrorCodes,
} from '@work-shift/lib-websocket-error-codes/WebsocketErrorCodes.mjs';

self.client = null;

self.handleMessage = (messageEvent = null) => {
  const messageObject = JSON.parse(messageEvent.data);

  switch (messageObject.type) {
    case 'registrationOptions': {
      console.log({
        messageObject,
      });

      break;
    }
    default: {
      console.error(`${self.constructor.name}.handleMessage`, messageObject);

      break;
    }
  }
}

self.handleError = (errorEvent) => {
  console.error('.handleError', errorEvent);
}

self.handleClose = (closeEvent = null) => new Promise((resolve) => {
  self.client.removeEventListener('close', self.handleClose);

  console.log(`${self.constructor.name}.handleClose`, closeEvent);

  resolve();
});


self.startClient = (url = null) => new Promise((resolve, reject) => {
  const handleClientOpen = (openEvent = null) => {
    self.client.removeEventListener('open', handleClientOpen);

    console.log('.handleOpenEvent', openEvent);
    
    if (openEvent.isTrusted === false) {
      reject(new Error('openEvent is untrusted'));
    }

    resolve();
  }

  try {
    self.client = new WebSocket(url, []);
    self.client.binaryType = 'arraybuffer';
    
    self.client.addEventListener('open', handleClientOpen);
    self.client.addEventListener('close', self.handleClose);
    self.client.addEventListener('message', self.handleMessage);
    self.client.addEventListener('error', self.handleError);
  } catch(startClientError) {
    reject(startClientError);
  }
});

self.workerProtocolStart = async (messageEvent = null) => {
  const {
    data: {
      payload: {
        communicator: {
          address,
        }
      }
    }
  } = messageEvent;

  try {
    await self.startClient(address);

    messageEvent.target.postMessage({
      type: 'protocol:start:res',
      payload: null,
    });
  } catch (startClientError) {
    messageEvent.target.postMessage({
      type: 'error',
      payload: startClientError,
    });
  }
}

self.workerProtocolStop = () => {
  self.client.close(WebsocketErrorCodes.CLOSE_NORMAL, self.CLOSE_MESSAGE);

  self.client.removeEventListener('close', self.handleClose);
  self.client.removeEventListener('message', self.handleMessage);
  self.client.removeEventListener('error', self.handleError);

  self.client = undefined;
};

const messageHandlers = Object.freeze(new Map([
  ['protocol:start:req', self.workerProtocolStart],
  ['protocol:stop:req', self.workerProtocolStop],
]));

self.executeMessage = (messageEvent = null) => {
  if (messageHandlers.has(messageEvent.data.type) === true) {
    (messageHandlers.get(messageEvent.data.type))(messageEvent);
  } else {
    throw new ReferenceError(`unknown message type "${messageEvent.data.type}"`);
  }
};

onmessage = (messageEvent = null) => {
  if (messageEvent === null) {
    throw new ReferenceError('messageEvent is undefined');
  }

  if (messageEvent.isTrusted === false) {
    throw new TypeError('non-trusted message received');
  }

  self.executeMessage(messageEvent);
};