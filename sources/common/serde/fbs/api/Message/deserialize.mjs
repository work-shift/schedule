import flatbuffers from 'flatbuffers';
import {
  MessageClass,
} from '../helpers/ClassRegistry/MessageClass.mjs';
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
  const result = new MessageClass();

  return Object.freeze(result);
};
