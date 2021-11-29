import util from 'util';
import {
  randomUUID,
} from 'node:crypto';
import {
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
import {
  encode,
} from '../encode.mjs';
import {
  decode,
} from '../decode.mjs';

describe('encode/decode', function describeEncodeDecode() {
  const debuglog = util.debuglog('encoding:specs');

  it('should encode and decode a Uint8Array', async function encodeDecodeArray() {
    const stringValue = randomUUID();
    const value = Uint8Array.from(stringValue);
    const encodedValue = encode(value, debuglog);
    const decodedValue = decode(encodedValue, debuglog);

    return expect(decodedValue).to.deep.equal(value);
  });
});
