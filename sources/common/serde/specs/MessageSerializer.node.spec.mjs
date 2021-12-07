import {
  randomUUID,
} from 'node:crypto';
import {
  describe,
  before,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
import flatbuffers from 'flatbuffers';
import {
  inspectlog,
} from '@work-shift/node-inspectlog/inspectlog.mjs';
import {
  MessageSerializer,
} from '../api/Message/MessageSerializer.node.mjs';
import {
  MessageDeSerializer,
} from '../api/Message/MessageDeSerializer.node.mjs';
import {
  defineSpecPayloads,
} from './helpers/defineSpecPayloads.mjs';
import {
  Payload,
} from '../fbs/generated/mjs/schedule/payload.mjs';
import {
  serialize as serializeRegistrationRequest,
} from '../api/RegistrationRequest/serialize.mjs';
import {
  deserialize as deserializeRegistrationRequest,
} from '../api/RegistrationRequest/deserialize.mjs';
import {
  serialize as serializePublicKeyCredentialCreationOptionsObject,
} from '../api/PublicKeyCredentialCreationOptions/serialize.mjs';
import {
  deserialize as deserializePublicKeyCredentialCreationOptions,
} from '../api/PublicKeyCredentialCreationOptions/deserialize.mjs';

describe(`${MessageSerializer.name} and ${MessageDeSerializer.name}`, function describeMessageSerializer() {
  let log = () => {};
  let builder = null;

  const payloads = defineSpecPayloads();

  before(function doBefore() {
    log = inspectlog('serde:specs');
    builder = new flatbuffers.Builder();
  });

  it('should serialize/deserialize messages', async function useMessageSerializer() {
    const serializers = new Map([
      [
        Payload.RegistrationRequest,
        serializeRegistrationRequest,
      ],
      [
        Payload.PublicKeyCredentialCreationOptions,
        serializePublicKeyCredentialCreationOptionsObject,
      ],
    ]);
    const deserializers = new Map([
      [
        Payload.RegistrationRequest,
        deserializeRegistrationRequest,
      ],
      [
        Payload.PublicKeyCredentialCreationOptions,
        deserializePublicKeyCredentialCreationOptions,
      ],
    ]);

    for (const payload of payloads) {
      const messageSerializer = new MessageSerializer(builder, serializers, log);
      const messageObject = {
        meta: {
          id: randomUUID(),
          ts: Date.now(),
        },
        payload,
      };

      const serializedMessage = messageSerializer.serialize(messageObject);

      expect(serializedMessage).to.exist;
      expect(serializedMessage).to.be.an.instanceof(Uint8Array);
      expect(serializedMessage).to.not.be.empty;

      const messageDeSerializer = new MessageDeSerializer(builder, deserializers, log);
      const deserializedMessage = messageDeSerializer.deserialize(serializedMessage);

      expect(deserializedMessage).to.exist;
      expect(deserializedMessage).to.not.be.empty;
      expect(deserializedMessage).to.be.frozen;
      expect(deserializedMessage).to.deep.equal(messageObject);
    }
  });
});
