import {
  ChannelNames,
} from '../constants/ChannelNames.mjs';
// import {
//   ProtocolEventNames,
// } from '../constants/ProtocolEventNames.mjs';
import CommunicatorWorker from '$lib/workers/Communicator/Communicator.worker.mjs?worker';
import {
  KernelService,
} from './Kernel.fsm.mjs';
import {
  isWorkersCreated,
} from './fsm.guards/isWorkersCreated.mjs';
import {
  createWorkers,
} from './fsm.services/createWorkers.mjs';
import {
  configureWorkers,
} from './fsm.services/configureWorkers.mjs';
import { ProtocolEventNames } from '../constants/ProtocolEventNames.mjs';

export class Kernel  {
  constructor(config = null) {
    this.config = Object.freeze({ ...config });
    this.ownChannel = null;
    this.service = null;

    this.serviceConfig = {
      actions: {
        markWorkerAsStarted: (...args) => {
          console.log('markWorkerAsStarted', ...args);
        },
      },
      services: {
        createWorkers: createWorkers(this.handleWorkerMessage),
        configureWorkers,
      },
      delays: {},
      guards: {
        isWorkersCreated,
      },
    };
    this.serviceContext = {
      workers: {
        communicator: {
          workerClass: CommunicatorWorker,
          worker: null,
          channelName: ChannelNames.COMMUNICATOR,
          channel: null,
        },
      },
    };

    console.log(`${this.constructor.name}.ctor`);
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
      case ProtocolEventNames.WORKER_CTOR: {
        console.log(`handle "${type}" with`, payload);

        break;
      }
      default: {
        throw TypeError(`unknown event type "${type}"`, workerMessageEvent);
      }
    }
  }

  handleOwnMessage(workerMessageEvent = null) {
    const {
      data: {
        type,
        payload,
      },
    } = workerMessageEvent;

    console.log('handleOwnMessage', type, payload);

    switch (type) {
      case ProtocolEventNames.WORKER_CTOR: {
        console.log(`handle "${type}" with`, payload);

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
    }

    this.ownChannel.addEventListener('message', this.handleOwnMessage);

    // this.workers.communicator.channel = new BroadcastChannel(this.workers.communicator.channelName);
    // this.workers.communicator.channel.addEventListener('message', this.handleWorkerMessage);
    // this.workers.communicator.worker = new this.workers.communicator.workerClass();
    // this.workers.communicator.channel.postMessage({
    //   type: ProtocolEventNames.CONFIGURATION_REQ,
    //   payload: this.config,
    // });

    this.service = KernelService(this.serviceConfig, this.serviceContext);
    this.service.start();
  }

  async stop() {
    for (const [name, workerInfo] of Object.entries(this.workers)) {
      const {
        worker,
        channel,
      } = workerInfo;

      channel.removeEventListener('message', this.handleWorkerMessage);
      channel.close();
      worker.terminate();

      this.ownChannel.postMessage({
        type: 'lifecycle',
        payload: {
          method: 'worker.terminate',
          worker: name,
        },
      });
    }

    this.workers = null;

    if (this.ownChannel !== null) {
      this.ownChannel.close();
      this.ownChannel = null;
    }
  }
}