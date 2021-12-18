import {
  ChannelNames,
} from '../constants/ChannelNames.mjs';
import {
  ProtocolEventNames,
} from '../constants/ProtocolEventNames.mjs';
import CommunicatorWorker from '$lib/workers/Communicator/Communicator.worker.mjs?worker';

export class WorkerManager {
  constructor() {
    this.ownChannel = null;
    this.kernelChannel = null;
    this.config = null;
    this.communicator = null;
    this.communicatorChannel = null;

    this.handleOwnChannelMessage = this.handleOwnChannelMessage.bind(this);
    this.handleProtocolConfigurationRequest = this.handleProtocolConfigurationRequest.bind(this);
    this.handleCommunicatorMessage = this.handleCommunicatorMessage.bind(this);

    this.workers = {
      communicator: {
        worker: CommunicatorWorker,
        status: null,
      },
    };

    this.messageHandlers = new Map([
      [ProtocolEventNames.CONFIGURATION_REQ, this.handleProtocolConfigurationRequest],
    ]);

    console.log(`${this.constructor.name}.ctor`);
  }

  handleCommunicatorMessage(messageEvent = null) {
    console.log(`${this.constructor.name}.handleCommunicatorMessage`, messageEvent.data.type, ProtocolEventNames.CONFIGURATION_RES);

    switch (messageEvent.data.type) {
      case ProtocolEventNames.CONFIGURATION_RES: {
        this.kernelChannel.postMessage(messageEvent.data);

        break;
      }
      default: {
        console.error(`unexpected message type from the Communicator`, messageEvent);

        break;
      }
    }
  }

  handleProtocolConfigurationRequest(messageEvent = null) {
    console.log(`${this.constructor.name}.handleProtocolConfigurationRequest`, messageEvent.data, this.communicatorChannel);

    this.config = Object.freeze(messageEvent.data.payload);
    this.communicatorChannel.postMessage({
      type: ProtocolEventNames.CONFIGURATION_REQ,
      payload: this.config,
    });
  }

  handleOwnChannelMessage(messageEvent = null) {
    console.log(`${this.constructor.name}.handleOwnChannelMessage`, messageEvent.data);

    switch (messageEvent.data.type) {
      case ProtocolEventNames.WORKER: {
        console.log('worker', messageEvent.data);

        break;
      }
      case ProtocolEventNames.CONFIGURATION_REQ: {
        this.handleProtocolConfigurationRequest(messageEvent);

        break;
      }
      default: {
        console.error(`unexpected message type from the Communicator`, messageEvent);

        break;
      }
    }

    // if (this.messageHandlers.has(messageEvent.data.type) === true) {
    //   (this.messageHandlers.get(messageEvent.data.type))(messageEvent);
    // } else {
    //   throw new ReferenceError(`no handle for message of "${messageEvent.data.type}" type`);
    // }
  }

  async start() {
    if (this.communicator === null) {
      this.communicator = new CommunicatorWorker();

      if (this.communicatorChannel == null) {
        this.communicatorChannel = new BroadcastChannel(ChannelNames.COMMUNICATOR);
        this.communicatorChannel.addEventListener('message', this.handleCommunicatorMessage);
      }
    }


    if (this.ownChannel === null) {
      this.ownChannel = new BroadcastChannel(ChannelNames.WORKER_MANAGER);
      this.ownChannel.addEventListener('message', this.handleOwnChannelMessage);
    }

    if (this.kernelChannel === null) {
      this.kernelChannel = new BroadcastChannel(ChannelNames.KERNEL);
    }

  }

  async stop() {
    if (this.ownChannel !== null) {
      this.ownChannel.close();
      this.ownChannel = null;
    }

    if (this.kernelChannel !== null) {
      this.kernelChannel.close();
      this.kernelChannel = null;
    }

    if (this.communicatorChannel !== null) {
      this.communicatorChannel.close();
      this.communicatorChannel = null;
    }
  }

  // async start() {
  //   this.communicator = new CommunicatorWorker();
  //   this.communicator.addEventListener('message', (messageEvent = null) => {
  //     console.log('message from CommunicatorWorker:', messageEvent);
  //   });
  //   this.communicator.postMessage({
  //     type: 'protocol:start:req',
  //     payload: this.config,
  //   });

  //   console.log(`${this.constructor.name}.start`);
  // }

  // async stop() {
  //   this.ownChannel.close();

  //   this.communicator.postMessage({
  //     type: 'protocol:stop:req',
  //     payload: this.config,
  //   });
  //   // FIXME: terminate() only after the communicator sends back the protocol:stop:res
  //   this.communicator.terminate();

  //   console.log(`${this.constructor.name}.stop`);
  // }
}
