import {
  Communicator,
} from './Communicator/Communicator.mjs';

export class WorkerManager {
  constructor(communicatorConfig = null) {
    this.communicatorConfig = Object.freeze({ ...communicatorConfig });
    this.communicator = null;

    console.log(`${this.constructor.name}.ctor`);
  }

  async start() {
    this.communicator = new Communicator();

    await this.communicator.start(`${this.communicatorConfig.address}/`);

    // window.postMessage({
    //   type: 'register:start',
    //   payload: {},
    // });

    console.log(`${this.constructor.name}.start`);
  }

  async stop() {
    await this.communicator.stop();

    console.log(`${this.constructor.name}.stop`);
  }
}
