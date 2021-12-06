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
  serialize as serializeMetaClass,
  BINARY_LENGTH,
} from '../fbs/api/Meta/serialize.mjs';
import {
  deserialize as deserializeMetaClass,
} from '../fbs/api/Meta/deserialize.mjs';

describe('Meta', function describePublicKeyCredentialCreationOptions() {
  let log = () => {};

  before(() => {
    log = inspectlog('serde:specs');
  });

  it('should serialize/deserialize Meta', async function shouldSerializeMessage() {
    const metaClass = {};

    metaClass.id = randomUUID();
    metaClass.ts = Date.now();

    const serializedMetaClass = serializeMetaClass(
      metaClass,
      log,
    );

    expect(serializedMetaClass).to.exist;
    expect(serializedMetaClass).to.have.lengthOf(BINARY_LENGTH);

    const deserializedMetaClass = deserializeMetaClass(serializedMetaClass, log);

    expect(deserializedMetaClass).to.deep.equal(metaClass);
  });
});
