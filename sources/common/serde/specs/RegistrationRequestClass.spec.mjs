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
  serialize as serializeRegistrationRequestClass,
  BINARY_LENGTH,
} from '../fbs/api/RegistrationRequest/serialize.mjs';
import {
  deserialize as deserializeRegistrationRequestClass,
} from '../fbs/api/RegistrationRequest/deserialize.mjs';

describe('RegistrationRequest', function describePublicKeyCredentialCreationOptions() {
  let log = () => {};

  before(() => {
    log = inspectlog('serde:specs');
  });

  it('should serialize/deserialize RegistrationRequest', async function shouldSerializeMessage() {
    const registrationRequestClass = {};
    const serializedRegistrationRequestClass = serializeRegistrationRequestClass(
      registrationRequestClass,
      log,
    );

    expect(serializedRegistrationRequestClass).to.exist;
    expect(serializedRegistrationRequestClass).to.have.lengthOf(BINARY_LENGTH);

    const deserializedRegistrationRequestClass = deserializeRegistrationRequestClass(serializedRegistrationRequestClass, log);

    return expect(deserializedRegistrationRequestClass).to.exist;
  });
});
