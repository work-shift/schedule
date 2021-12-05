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
  MetaClass,
} from '../fbs/api/helpers/ClassRegistry/MetaClass.mjs';
import {
  serialize as serializeMetaClass,
  BINARY_LENGTH,
} from '../fbs/api/Meta/serialize.mjs';
import {
  deserialize as deserializeMetaClass,
} from '../fbs/api/Meta/deserialize.mjs';

describe(MetaClass.name, function describePublicKeyCredentialCreationOptions() {
  let log = () => {};

  before(() => {
    log = inspectlog('serde:specs');
  });

  it(`should serialize/deserialize ${MetaClass.name}`, async function shouldSerializeMessage() {
    const metaClass = new MetaClass();

    metaClass.id = randomUUID();
    metaClass.ts = Date.now();

    const serializedMetaClass = serializeMetaClass(
      metaClass,
      log,
    );

    expect(serializedMetaClass).to.exist;
    expect(serializedMetaClass).to.have.lengthOf(BINARY_LENGTH);

    const deserializedMetaClass = deserializeMetaClass(serializedMetaClass, log);

    expect(deserializedMetaClass).to.be.instanceof(MetaClass);
    expect(deserializedMetaClass).to.deep.equal(metaClass);
  });
});
