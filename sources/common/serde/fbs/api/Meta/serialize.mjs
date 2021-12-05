import flatbuffers from 'flatbuffers';
import {
  MetaClass,
} from '../helpers/ClassRegistry/MetaClass.mjs';
import {
  Meta,
} from '../../generated/mjs/schedule/meta.mjs';

export const BINARY_LENGTH = 72;

// eslint-disable-next-line no-unused-vars
export const serialize = (MetaObject = null, debuglog = () => {}) => {
  if (MetaObject === null) {
    throw new ReferenceError('MetaObject is undefined');
  }

  if (MetaObject instanceof MetaClass === false) {
    throw new TypeError(`MetaObject is not an instance of ${MetaClass.name}`);
  }

  const builder = new flatbuffers.Builder(BINARY_LENGTH);
  const result_offset = Meta.createMeta(
    builder,
    builder.createString(MetaObject.id),
    MetaObject.ts,
  );

  builder.finish(result_offset);

  return builder.asUint8Array();
};
