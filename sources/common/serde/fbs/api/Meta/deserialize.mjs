import flatbuffers from 'flatbuffers';
import {
  Meta,
} from '../../generated/mjs/schedule/meta.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (MetaBuffer = null, debuglog = () => {}) => {
  if (MetaBuffer === null) {
    throw new ReferenceError('MetaBuffer is undefined');
  }

  const buffer = new flatbuffers.ByteBuffer(MetaBuffer);
  const meta = Meta.getRootAsMeta(buffer);
  const result = {};

  result.id = meta.id();
  result.ts = meta.ts();

  return Object.freeze(result);
};
