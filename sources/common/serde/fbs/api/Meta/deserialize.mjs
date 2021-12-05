import flatbuffers from 'flatbuffers';
import {
  MetaClass,
} from '../helpers/ClassRegistry/MetaClass.mjs';
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
  const result = new MetaClass();

  result.id = meta.id();
  result.ts = meta.ts();

  return Object.freeze(result);
};
