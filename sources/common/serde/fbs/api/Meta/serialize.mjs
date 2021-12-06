import flatbuffers from 'flatbuffers';
import {
  Meta,
} from '../../generated/mjs/schedule/meta.mjs';

export const BINARY_LENGTH = 72;

// eslint-disable-next-line no-unused-vars
export const serialize = (MetaObject = null, debuglog = () => {}) => {
  if (MetaObject === null) {
    throw new ReferenceError('MetaObject is undefined');
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
