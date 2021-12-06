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

    if (serializers.size === 0) {
      throw new RangeError('serializers is empty');
    }

    this.#debuglog = debuglog ?? (() => {});
    this.#serializers = serializers;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  serialize(messageObject = null) {
    if (messageObject === null) {
      throw ReferenceError('messageObject is undefined');
    }

    this.#debuglog({
      messageObject,
      serializers: this.#serializers,
    });

    this.#debuglog({
      serializerId: messageObject.payload.type,
      Payload,
    });

    const serialize = this.#serializers.get(messageObject.payload.type) ?? (() => {
      throw new ReferenceError(`no serializer found for ${messageObject.payload.type}`);
    });

    delete messageObject.payload.type;

    return serialize(this.#builder, messageObject.payload, this.#debuglog);
  }
}
