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
import {
  inspectlog,
} from '@work-shift/node-inspectlog/inspectlog.mjs';
import {
  serialize as serializeMessageClass,
} from '../fbs/api/Message/serialize.mjs';
// import {
//   deserialize as deserializeMessageClass,
// } from '../fbs/api/Message/deserialize.mjs';
import {
  defineSpecPayloads,
} from './helpers/defineSpecPayloads.mjs';

describe('Message', function describePublicKeyCredentialCreationOptions() {
  let log = () => {};
  const payloads = defineSpecPayloads();

  const serializeSourceObject = (sourceObject = null) => {
    if (sourceObject === null) {
      throw new ReferenceError('sourceObject is undefined');
    }

    // it's a naive way of serializing objects with Uint8Array fields ( e.g.: challenge, user.id )
    return JSON.stringify(sourceObject);
  };

  const reportSizes = (objectSource = null, objectBuffer = null) => {
    if (objectSource === null) {
      throw ReferenceError('objectSource is undefined');
    }

    if (objectBuffer === null) {
      throw ReferenceError('objectBuffer is undefined');
    }

    const objectSourceLength = (serializeSourceObject(objectSource)).length;
    const objectBufferLength = objectBuffer.length;
    const lengthDelta = objectBufferLength - objectSourceLength;
    const isBinarySmaller = objectBufferLength < objectSourceLength;

    const min = Math.min(objectBufferLength, objectSourceLength);
    const max = Math.max(objectBufferLength, objectSourceLength);

    const lengthDeltaPercentage = (min * 100) / max;

    return {
      class: objectSource.payload.constructor.name,
      objectSourceLength,
      objectBufferLength,
      isBinarySmaller,
      'Δ (b)': lengthDelta,
      'Δ (%)': lengthDeltaPercentage,
    };
  };

  before(() => {
    log = inspectlog('serde:specs');
  });

  it('should serialize/deserialize Message', async function shouldSerializeMessage() {
    const sizeReports = [];

    for (const payload of payloads) {
      const messageClass = {};

      messageClass.meta = {
        id: randomUUID(),
        ts: Date.now(),
      };
      messageClass.payload = payload.value;

      const serializedMessageClass = serializeMessageClass(
        messageClass,
        log,
      );

      expect(serializedMessageClass).to.exist;

      sizeReports.push(reportSizes(messageClass, serializedMessageClass));

      // const deserializedMessageClass = deserializeMessageClass(serializedMessageClass, log);

      // expect(deserializedMessageClass).to.be.instanceof(MessageClass);
      // expect(deserializedMessageClass.payload).to.be.instanceof(payload.type);
      // expect(deserializedMessageClass).to.deep.equal(messageClass);
    }

    // eslint-disable-next-line no-console
    console.table(sizeReports);
  });
});
