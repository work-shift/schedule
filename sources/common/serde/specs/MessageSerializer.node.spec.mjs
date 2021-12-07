import {
  randomUUID,
} from 'node:crypto';
import {
  describe,
  before,
  beforeEach,
  it,
  afterEach,
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
} from '../fbs/api/Message/MessageSerializer.node.mjs';
import {
  defineSpecPayloads,
} from './helpers/defineSpecPayloads.mjs';
import {
  Payload,
} from '../fbs/generated/mjs/schedule/payload.mjs';
import {
  serialize as serializeRegistrationRequest,
} from '../fbs/api/RegistrationRequest/serialize.mjs';

describe(MessageSerializer.name, function describeMessageSerializer() {
  let log = () => {};
  let builder = null;
  const payloads = defineSpecPayloads();
  // const serializers = {
  //   [Payload.RegistrationRequest]: (payload = null) => {

  //   },
  //   // [Payload.PublicKeyCredentialCreationOptions]: (payload = null) => {},
  // };

  before(function doBefore() {
    log = inspectlog('serde:specs');
  });

  beforeEach(function doBeforeEach() {
    builder = new flatbuffers.Builder();
  });

  afterEach(function doAfterEach() {
    builder = null;
  });

  it.only('should serialize/deserialize messages', async function useMessageSerializer() {
    const serializers = new Map([
      [
        Payload.RegistrationRequest,
        serializeRegistrationRequest,
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

      log({
        serializedMessage,
      });

      expect(serializedMessage).to.exist;
      expect(serializedMessage).to.be.an.instanceof(Uint8Array);
      expect(serializedMessage).to.not.be.empty;
    }
  });
});
