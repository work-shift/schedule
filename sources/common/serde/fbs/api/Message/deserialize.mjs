import flatbuffers from 'flatbuffers';
import {
  Message,
} from '../../generated/mjs/schedule/message.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (MessageBuffer = null, debuglog = () => {}) => {
  if (MessageBuffer === null) {
    throw new ReferenceError('MessageBuffer is undefined');
  }

  const buffer = new flatbuffers.ByteBuffer(MessageBuffer);
  // eslint-disable-next-line no-unused-vars
  const message = Message.getRootAsMessage(buffer);
  const result = {};

  return Object.freeze(result);
};
