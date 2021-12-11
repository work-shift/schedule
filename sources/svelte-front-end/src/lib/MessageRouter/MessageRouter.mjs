export class MessageRouter {
  constructor(config = null) {
    this.config = Object.freeze({ ...config });
    console.log(`${this.constructor.name}.ctor`);
  }

  async start() {

  }

  async stop() {

  }
}