import CommunicatorWorker from '$lib/workers/Communicator/Communicator.worker.mjs?worker';

export class WorkerManager {
  constructor(config = null) {
    this.config = Object.freeze({ ...config });
    this.communicator = null;

    console.log(`${this.constructor.name}.ctor`);
  }

  handleCustomEvent(customEvent = null) {
    console.log({
      customEvent,
    });
  }

  async start() {
    this.communicator = new CommunicatorWorker();
    this.communicator.addEventListener('message', (messageEvent = null) => {
      console.log('message from CommunicatorWorker:', messageEvent);
    });
    this.communicator.postMessage({
      type: 'protocol:start:req',
      payload: this.config,
    });

    window.addEventListener('message', this.handleCustomEvent);

    console.log(`${this.constructor.name}.start`);
  }

  async stop() {
    window.removeEventListener('message', this.handleCustomEvent);

    this.communicator.postMessage({
      type: 'protocol:stop:req',
      payload: this.config,
    });
    // FIXME: terminate() only after the communicator sends back the protocol:stop:res
    this.communicator.terminate();

    console.log(`${this.constructor.name}.stop`);
  }
}
