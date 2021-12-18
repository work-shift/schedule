import {
  ChannelNames,
} from '../constants/ChannelNames.mjs';
import {
  ProtocolEventNames,
} from '../constants/ProtocolEventNames.mjs';
import {
  WorkerManager,
} from '$lib/workers/WorkerManager.mjs';

export class Kernel  {
  constructor(config = null) {
    this.config = Object.freeze({ ...config });
    this.uiChannel = null;
    this.ownChannel = null;
    this.workerManagerChannel = null;
    this.workerManager = null;

    this.handleWorkerManagerChannel = this.handleWorkerManagerChannel.bind(this);

    console.log(`${this.constructor.name}.ctor`);
  }

  handleWorkerManagerChannel(messageEvent = null) {
    console.log(`${this.constructor.name}.handleWorkerManagerChannel`, messageEvent.data);

    switch (messageEvent.data.type) {
      case ProtocolEventNames.CONFIGURATION_RES: {
        this.uiChannel.postMessage(messageEvent.data);

        break;
      }
      default: {
        console.error(`${this.constructor.name}.handleWorkerManagerChannel::unknown message type`, messageEvent);

        break;
      }
    }
  }

  async start() {
    if (this.ownChannel === null) {
      this.ownChannel = new BroadcastChannel(ChannelNames.KERNEL);
    }

    if (this.workerManagerChannel === null) {
      this.workerManagerChannel = new BroadcastChannel(ChannelNames.WORKER_MANAGER);

      this.workerManagerChannel.addEventListener('message', this.handleWorkerManagerChannel);
    }

    if (this.uiChannel === null) {
      this.uiChannel = new BroadcastChannel(ChannelNames.UI);
    }

    if (this.workerManager === null) {
      this.workerManager = new WorkerManager();

      await this.workerManager.start();

      this.workerManagerChannel.postMessage({
        type: ProtocolEventNames.CONFIGURATION_REQ,
        payload: this.config,
      });
    }
  }

  async stop() {
    if (this.workerManager !== null) {
      this.workerManagerChannel.removeEventListener('message', this.handleWorkerManagerChannel);
      this.workerManagerChannel.close();

      await this.workerManager.stop();

      this.workerManager = null;
    }

    if (this.uiChannel !== null) {
      this.uiChannel.close();
      this.uiChannel = null;
    }

    if (this.ownChannel !== null) {
      this.ownChannel.close();
      this.ownChannel = null;
    }
  }
}