import {
  Payload,
} from '../../generated/mjs/schedule/payload.mjs';

export class MessageSerializer {
  #builder = null;
  #serializers = null;
  #debuglog = null;

  constructor(builder = null, serializers = null, debuglog = null) {
    if (builder === null) {
      throw new ReferenceError('builder is undefined');
    }

    this.#builder = builder;

    if (serializers === null) {
      throw new ReferenceError('serializers is undefined');
    }

    if (Object.getOwnPropertyNames(serializers).length === 0) {
      throw new RangeError('serializers is empty');
    }

    this.#debuglog = debuglog ?? (() => {});
    this.#serializers = serializers;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  serialize(messageObject = null, objectType = null) {
    if (messageObject === null) {
      throw ReferenceError('messageObject is undefined');
    }

    if (objectType === null) {
      throw ReferenceError('objectType is undefined');
    }

    this.#debuglog({
      messageObject,
      serializers: this.#serializers,
    });

    const serializerId = (Payload[objectType]);

    this.#debuglog({
      serializerId,
      objectType,
      Payload,
    });

    const serialize = this.#serializers[objectType] ?? (() => {
      throw new ReferenceError(`no serializer found for ${objectType}`);
    });

    const payloadOffset = serialize(this.#builder, messageObject.payload, this.#debuglog);

    return payloadOffset;
  }
}
