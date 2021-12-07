import {
  Meta,
} from '../../generated/mjs/schedule/meta.mjs';
import {
  Message,
} from '../../generated/mjs/schedule/message.mjs';

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

    if (this.#serializers.has(messageObject.payload.type) === true) {
      const serialize = this.#serializers.get(messageObject.payload.type);

      const metaOffset = Meta.createMeta(
        this.#builder,
        this.#builder.createString(messageObject.meta.id),
        messageObject.meta.ts,
      );
      const payloadOffset = serialize(this.#builder, messageObject.payload, this.#debuglog);
      const resultOffset = Message.createMessage(
        this.#builder,
        metaOffset,
        messageObject.payload.type,
        payloadOffset,
      );

      this.#builder.finish(resultOffset);

      return this.#builder.asUint8Array();
    }

    throw new ReferenceError(`no serializer found for ${messageObject.payload.type}`);
  }
}
