import {
  Communicator,
} from './Communicator/Communicator.mjs';
import {
  Serializer,
} from './Serializer/Serializer.mjs';

export class WorkerManager {
  constructor(communicatorConfig = null) {
    this.communicatorConfig = Object.freeze({ ...communicatorConfig });
    this.communicator = null;
    this.serializer = null;

    console.log(`${this.constructor.name}.ctor`);
  }

  async start() {
    this.serializer = new Serializer();
    this.communicator = new Communicator();

    await this.serializer.start();
    await this.communicator.start(`${this.communicatorConfig.address}/`);

    console.log(`${this.constructor.name}.start`);
  }

  async stop() {
    await this.communicator.stop();

    console.log(`${this.constructor.name}.stop`);
  }
}
