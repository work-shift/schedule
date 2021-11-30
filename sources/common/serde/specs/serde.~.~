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
  serializeMessage,
} from '../serializeMessage.mjs';
import {
  deserializeMessage,
} from '../deserializeMessage.mjs';
import {
  MessageTypes,
} from '../MessageTypes.mjs';

describe('serde', function describeEncodeDecode() {
  const debuglog = util.debuglog('serde:specs');

  it('should serde a message', async function encodeDecodeArray() {
    const message = {
      type: MessageTypes.sec.PUBLIC_KEY_CREDENTIAL_CREATION_OPTS,
      payload: {
        challenge: Uint8Array.from(randomUUID()),
        rp: {
          name: `rp:${randomUUID()}`,
          id: 'localhost',
        },
        user: {
          id: Uint8Array.from(randomUUID()),
          name: randomUUID(),
          displayName: randomUUID(),
        },
        pubKeyCredParams: [{
          alg: -7,
          type: 'public-key',
        }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
        attestation: 'direct', // direct
      },
    };

    const serializedMessage = await serializeMessage(message, debuglog);

    debuglog({
      serializedMessage: util.inspect(serializedMessage),
    });

    const deserializedMessage = await deserializeMessage(serializedMessage, debuglog);

    debuglog({
      deserializedMessage: util.inspect(deserializedMessage),
    });

    return expect(deserializedMessage).to.deep.equal(message);
  });
});
