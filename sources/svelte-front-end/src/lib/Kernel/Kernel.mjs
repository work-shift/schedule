import {
  ChannelNames,
} from '../constants/ChannelNames.mjs';
// import {
//   ProtocolEventNames,
// } from '../constants/ProtocolEventNames.mjs';
import CommunicatorWorker from '$lib/workers/Communicator/Communicator.worker.mjs?worker';
import {
  createKernelService,
} from './Kernel.fsm.mjs';
import {
  isWorkersCreated,
} from './fsm.guards/isWorkersCreated.mjs';
import {
  isWorkersConfigured,
} from './fsm.guards/isWorkersConfigured.mjs';
import {
  isWorkersStarted,
} from './fsm.guards/isWorkersStarted.mjs';
import {
  createWorkers,
} from './fsm.services/createWorkers.mjs';
import {
  configureWorkers,
} from './fsm.services/configureWorkers.mjs';
import {
  startWorkers,
} from './fsm.services/startWorkers.mjs';
import {
  markWorkerAsCreated,
} from './fsm.actions/markWorkerAsCreated.mjs';
import {
  markWorkerAsConfigured,
} from './fsm.actions/markWorkerAsConfigured.mjs';
import {
  markWorkerAsStarted,
} from './fsm.actions/markWorkerAsStarted.mjs';
import {
  reportKernelReady,
} from './fsm.services/reportKernelReady.mjs';
import { ProtocolEventNames } from '../constants/ProtocolEventNames.mjs';

export class Kernel  {
  constructor(config = null) {
    this.config = Object.freeze({ ...config });
    this.ownChannel = null;
    this.workersChannel = null;
    this.service = null;

    this.handleOwnMessage = this.handleOwnMessage.bind(this);
    this.handleWorkerMessage = this.handleWorkerMessage.bind(this);

    this.serviceConfig = {
      actions: {
        markWorkerAsCreated,
        markWorkerAsConfigured,
        markWorkerAsStarted,
      },
      services: {
        createWorkers: createWorkers(this.handleWorkerMessage),
        configureWorkers,
        startWorkers,
        reportKernelReady,
      },
      delays: {},
      guards: {
        isWorkersCreated,
        isWorkersConfigured,
        isWorkersStarted,
      },
    };
    this.serviceContext = {
      workers: {
        communicator: {
          workerClass: CommunicatorWorker,
          worker: null,
          channelName: ChannelNames.COMMUNICATOR,
          channel: null,
          isCreated: false,
          isConfigured: false,
          isStarted: false,
          // FIXME: the following items should be populated either from env vars, or should be GET'ed
          config: {
            proto: 'ws',
            host: '127.0.0.1',
            port: '9090',
            path: '/',
          },
        },
      },
    };

    console.log(`${this.constructor.name}.ctor`);
  }

  handleOwnMessage(workerMessageEvent = null) {
    const {
      data: {
        type,
        payload,
      },
    } = workerMessageEvent;

    switch (type) {
      case ProtocolEventNames.WORKER_CREATED: {
        console.log(`${this.constructor.name} handle ${payload.name}.ctor`);

        this.service.send({
          type: ProtocolEventNames.WORKER_CONF_REQ,
          payload: {
            worker: payload.name,
            config: 'params',
          },
        });

        break;
      }
      case ProtocolEventNames.KERNEL_READY: {
        break;
      }
      default: {
        throw TypeError(`unknown event type "${type}"`, workerMessageEvent);
      }
    }
  }

  handleWorkerMessage(workerMessageEvent = null) {
    const {
      data: {
        type,
        payload,
      },
    } = workerMessageEvent;

    console.log('handleWorkerMessage', type, payload);

    switch (type) {
      case ProtocolEventNames.WORKER_CREATED: {
        this.service.send({
          type: type,
          payload: {
            name: payload.name,
          },
        });

        break;
      }
      case ProtocolEventNames.WORKER_SET_CONFIG_RES: {
        this.service.send({
          type: type,
          payload: {
            name: payload.name,
          },
        });

        break;
      }
      case ProtocolEventNames.WORKER_START_REQ: {
        console.warn(`not really expecting message of ${type} type`, payload);

        break;
      }
      case ProtocolEventNames.WORKER_START_RES: {
        this.service.send({
          type: type,
          payload: {
            name: payload.name,
          },
        });

        break;
      }
      default: {
        throw TypeError(`unknown event type "${type}"`, workerMessageEvent);
      }
    }
  }

  start() {
    if (this.ownChannel === null) {
      this.ownChannel = new BroadcastChannel(ChannelNames.KERNEL);
      this.ownChannel.addEventListener('message', this.handleOwnMessage);
    }

    if (this.workersChannel === null) {
      this.workersChannel = new BroadcastChannel(ChannelNames.WORKERS);
      this.workersChannel.addEventListener('message', this.handleWorkerMessage);
    }

    if (this.service === null) {
      this.service = createKernelService(this.serviceConfig, this.serviceContext);
      this.service.start();
    }
  }

  async stop() {
    for (const [name, workerInfo] of Object.entries(this.serviceContext.workers)) {
      const {
        worker,
      } = workerInfo;

      if (typeof worker !== 'undefined' || worker !== null) {
        worker.terminate();
      }

      console.debug(`${this.constructor.name}.stop: stopped ${name} worker`);
    }

    if (this.workersChannel !== null || typeof this.workersChannel !== 'undefined') {
      this.workersChannel.removeEventListener('message', this.handleWorkerMessage);
    }

    this.serviceContext.workers = null;

    if (typeof this.ownChannel !== 'undefined' || this.ownChannel !== null) {
      this.ownChannel.close();
      this.ownChannel = null;
    }
  }
}