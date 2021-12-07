import flatbuffers from 'flatbuffers';
import {
  Message,
} from '../../../fbs/generated/mjs/schedule/message.mjs';

export class MessageDeSerializer {
  #builder = null;
  #deserializers = null;
  #debuglog = null;

  constructor(builder = null, deserializers = null, debuglog = null) {
    if (builder === null) {
      throw new ReferenceError('builder is undefined');
    }

    this.#builder = builder;

    if (deserializers === null) {
      throw new ReferenceError('serializers is undefined');
    }

    if (deserializers.size === 0) {
      throw new RangeError('serializers is empty');
    }

    this.#debuglog = debuglog ?? (() => {});
    this.#deserializers = deserializers;
  }

  deserialize(messageBuffer = null) {
    if (messageBuffer === null) {
      throw new ReferenceError('messageBuffer is undefined');
    }

    if ((messageBuffer instanceof Uint8Array) === false) {
      throw new TypeError('messageBuffer IS NOT AN instance of Uint8Array');
    }

    const buffer = new flatbuffers.ByteBuffer(messageBuffer);
    const message = Message.getRootAsMessage(buffer);
    const deserialize = this.#deserializers.get(message.payloadType());

    return Object.freeze({
      ...Object.create(null),
      ...{
        meta: {
          id: message.meta().id(),
          ts: message.meta().ts(),
        },
        payload: deserialize(message, this.#debuglog),
      },
    });
  }
}
