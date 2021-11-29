import {
  Communicator,
} from './components/Communicator/Communicator.mjs';

export class Ldr {
  constructor(communicatorConfig = null) {
    this.communicatorConfig = Object.freeze({ ...communicatorConfig });
    this.communicator = null;

    console.log(`${this.constructor.name}.ctor`);
  }

  async start() {
    this.communicator = new Communicator();

    await this.communicator.start(`${this.communicatorConfig.address}/${this.communicatorConfig.endpoints.register}`);

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
