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
} from '@work-shift/serde-serializers-message/MessageSerializer.node.mjs';
import {
  MessageDeSerializer,
} from '@work-shift/serde-deserializers-message/MessageDeSerializer.node.mjs';
import {
  Payload,
} from '@work-shift/message-definitions/generated/mjs/schedule/payload.mjs';
import {
  serialize as serializeRegistrationRequest,
} from '@work-shift/serde-serializers-registration-request/serialize.mjs';
import {
  deserialize as deserializeRegistrationRequest,
} from '@work-shift/serde-deserializers-registration-request/deserialize.mjs';
import {
  serialize as serializePublicKeyCredentialCreationOptionsObject,
} from '@work-shift/serde-serializers-public-key-credential-creation-options/serialize.mjs';
import {
  deserialize as deserializePublicKeyCredentialCreationOptions,
} from '@work-shift/serde-deserializers-public-key-credential-creation-options/deserialize.mjs';
import {
  defineSpecPayloads,
} from './helpers/defineSpecPayloads.mjs';

describe('serde-specs', function describeSerdeSpecs() {
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
