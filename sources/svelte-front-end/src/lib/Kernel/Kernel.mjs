import {
  WorkerManager,
} from '$lib/workers/WorkerManager.mjs';
import {
  MessageRouter,
} from '$lib/MessageRouter/MessageRouter.mjs';

export class Kernel  {
  constructor(config = null) {
    this.config = Object.freeze({ ...config });
    this.messageRouter = new MessageRouter(this.config);
    this.workerManager = new WorkerManager(this.config);

    console.log(`${this.constructor.name}.ctor`);
  }

  async start() {
    await this.messageRouter.start();
    await this.workerManager.start();
  }

  async stop() {
    if (typeof this.messageRouter !== 'undefined') {
      await this.messageRouter.stop();
    }

    if (typeof this.workerManager !== 'undefined') {
      await this.workerManager.stop();
    }
  }
}