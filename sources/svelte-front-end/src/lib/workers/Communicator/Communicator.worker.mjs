// import {
//   WebsocketErrorCodes,
// } from '@work-shift/lib-websocket-error-codes/WebsocketErrorCodes.mjs';
import {
  ChannelNames,
} from '../../constants/ChannelNames.mjs';
import {
  ProtocolEventNames,
} from '../../constants/ProtocolEventNames.mjs';
import {
  createCommunicatorService,
} from './Communicator.fsm.mjs';

self.name = ChannelNames.COMMUNICATOR;

const ownChannel = new BroadcastChannel(ChannelNames.COMMUNICATOR);
const workersChannel = new BroadcastChannel(ChannelNames.WORKERS);

// eslint-disable-next-line no-unused-vars
let clientConfig = null;
// eslint-disable-next-line no-unused-vars
let client = null;
let service = null;

const serviceConfig = Object.freeze({
  actions: {},
  services: {
    createClient: (...args) => {
      console.log('services.createClient', args);
    },
  },
  delays: {},
  guards: {},
});

const serviceContext = Object.freeze({});

const handleOwnChannelMessages = (messageEvent = null) => {
  typeof messageHandlers[messageEvent.data.type] === 'function'
  ? (messageHandlers[messageEvent.data.type])(messageEvent)
  : () => {
    throw new TypeError('no handler for', messageEvent);
  };
};

ownChannel.addEventListener('message', handleOwnChannelMessages);

const handleMessage = (messageEvent = null) => {
  const messageObject = JSON.parse(messageEvent.data);

  switch (messageObject.type) {
    case 'registrationOptions': {
      console.log({
        messageObject,
      });

      break;
    }
    default: {
      console.error(`${constructor.name}.handleMessage`, messageObject);

      break;
    }
  }
}

const handleError = (errorEvent) => {
  console.error('.handleError', errorEvent);
}

const handleClose = (closeEvent = null) => new Promise((resolve) => {
  client.removeEventListener('close', handleClose);

  console.log(`${constructor.name}.handleClose`, closeEvent);

  resolve();
});

// FIXME: this should be implemented in its own state machine!
const startSocket = (url = null) => new Promise((resolve, reject) => {
  const handleClientOpen = (openEvent = null) => {
    client.removeEventListener('open', handleClientOpen);

    console.log(`${constructor.name}.handleClientOpen`, openEvent);
    
    if (openEvent.isTrusted === false) {
      reject(new Error('openEvent is untrusted'));
    }

    resolve();
  }

  try {
    client = new WebSocket(url, []);
    client.binaryType = 'arraybuffer';
    
    client.addEventListener('open', handleClientOpen);
    client.addEventListener('close', handleClose);
    client.addEventListener('message', handleMessage);
    client.addEventListener('error', handleError);
  } catch(startClientError) {
    reject(startClientError);
  }
});

// eslint-disable-next-line no-unused-vars
async function startClient(messageEvent = null) {
  await startSocket(`${clientConfig.proto}://${clientConfig.host}:${clientConfig.port}${clientConfig.path}`);

  workersChannel.postMessage({
    type: ProtocolEventNames.WORKER_START_RES,
    payload: {
      name: ChannelNames.COMMUNICATOR,
    },
  });
}

function configureClient(messageEvent = null) {
  clientConfig = Object.freeze({
    ...Object.create(null),
    ...messageEvent.data.payload,
  });

  workersChannel.postMessage({
    type: ProtocolEventNames.WORKER_SET_CONFIG_RES,
    payload: {
      name: ChannelNames.COMMUNICATOR,
    },
  });
}

const messageHandlers = Object.freeze({
  [ProtocolEventNames.WORKER_SET_CONFIG_REQ]: configureClient.bind(self),
  [ProtocolEventNames.WORKER_START_REQ]: startClient.bind(self),
});

// const workerProtocolConfigurationRequest = async (messageEvent = null) => {
//   console.log('workerProtocolConfigurationRequest', messageEvent);

//   const {
//     data: {
//       payload: {
//         communicator: {
//           address,
//         }
//       }
//     }
//   } = messageEvent;

//   try {
//     await startClient(address);

//     messageEvent.target.postMessage({
//       type: ProtocolEventNames.CONFIGURATION_RES,
//       payload: null,
//     });
//   } catch (startClientError) {
//     messageEvent.target.postMessage({
//       type: ProtocolEventNames.CONFIGURATION_RES,
//       payload: startClientError,
//     });
//   }
// }

// const workerProtocolStop = () => {
//   client.close(WebsocketErrorCodes.CLOSE_NORMAL, 'CLOSE_MESSAGE');

//   client.removeEventListener('close', handleClose);
//   client.removeEventListener('message', handleMessage);
//   client.removeEventListener('error', handleError);

//   client = undefined;
// };

// const messageHandlers = Object.freeze(new Map([
//   [ProtocolEventNames.WORKER_CONF_REQ, workerProtocolConfigurationRequest],
// ]));

// executeMessage = (messageEvent = null) => {
//   console.log('executeMessage');

//   if (messageHandlers.has(messageEvent.data.type) === true) {
//     (messageHandlers.get(messageEvent.data.type))(messageEvent);
//   } else {
//     throw new ReferenceError(`unknown message type "${messageEvent.data.type}"`);
//   }
// };

// onmessage = (messageEvent = null) => {
//   console.log('Communicator.worker.onmessage', messageEvent);

//   if (messageEvent === null) {
//     throw new ReferenceError('messageEvent is undefined');
//   }

//   if (messageEvent.isTrusted === false) {
//     throw new TypeError('non-trusted message received');
//   }

//   executeMessage(messageEvent);
// };

// onerror = (messageEvent = null) => {
//   console.error('onerror', messageEvent);
// };

service = createCommunicatorService(serviceConfig, serviceContext);
service.start();

workersChannel.postMessage({
  type: ProtocolEventNames.WORKER_CREATED,
  payload: {
    name: ChannelNames.COMMUNICATOR,
  },
});
