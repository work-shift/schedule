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
  RegistrationRequestClass,
} from '../fbs/api/helpers/ClassRegistry/RegistrationRequestClass.mjs';
import {
  serialize as serializeRegistrationRequestClass,
  BINARY_LENGTH,
} from '../fbs/api/RegistrationRequest/serialize.mjs';
import {
  deserialize as deserializeRegistrationRequestClass,
} from '../fbs/api/RegistrationRequest/deserialize.mjs';

describe(RegistrationRequestClass.name, function describePublicKeyCredentialCreationOptions() {
  let log = () => {};

  before(() => {
    log = inspectlog('serde:specs');
  });

  it(`should serialize/deserialize ${RegistrationRequestClass.name}`, async function shouldSerializeMessage() {
    const registrationRequestClass = new RegistrationRequestClass();
    const serializedRegistrationRequestClass = serializeRegistrationRequestClass(
      registrationRequestClass,
      log,
    );

    expect(serializedRegistrationRequestClass).to.exist;
    expect(serializedRegistrationRequestClass).to.have.lengthOf(BINARY_LENGTH);

    const deserializedRegistrationRequestClass = deserializeRegistrationRequestClass(serializedRegistrationRequestClass, log);

    return expect(deserializedRegistrationRequestClass).to.be.instanceof(RegistrationRequestClass);
  });
});
