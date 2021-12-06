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
  serialize as serializePublicKeyCredentialCreationOptionsClass,
} from '../fbs/api/PublicKeyCredentialCreationOptions/serialize.mjs';
import {
  deserialize as deserializePublicKeyCredentialCreationOptionsClass,
} from '../fbs/api/PublicKeyCredentialCreationOptions/deserialize.mjs';
import {
  COSEAlgorithms,
} from '../fbs/generated/mjs/schedule/c-o-s-e-algorithms.mjs';
import {
  PublicKeyCredentialType,
} from '../fbs/generated/mjs/schedule/public-key-credential-type.mjs';
import {
  AuthenticatorAttachment,
} from '../fbs/generated/mjs/schedule/authenticator-attachment.mjs';
import {
  ResidentKeyRequirement,
} from '../fbs/generated/mjs/schedule/resident-key-requirement.mjs';
import {
  AttestationConveyancePreference,
} from '../fbs/generated/mjs/schedule/attestation-conveyance-preference.mjs';

describe('PublicKeyCredentialCreationOptions', function describePublicKeyCredentialCreationOptions() {
  let log = () => {};

  before(() => {
    log = inspectlog('serde:specs');
  });

  it('should serialize/deserialize PublicKeyCredentialCreationOptions', async function shouldSerializeMessage() {
    const publicKeyCredentialCreationOptions = {};

    publicKeyCredentialCreationOptions.challenge = Uint8Array.from(randomUUID());
    publicKeyCredentialCreationOptions.rp = {
      id: randomUUID(),
      name: randomUUID(),
    };
    publicKeyCredentialCreationOptions.user = {
      id: Uint8Array.from(randomUUID()),
      name: randomUUID(),
      displayName: randomUUID(),
    };
    publicKeyCredentialCreationOptions.pubKeyCredParams = [{
      alg: COSEAlgorithms.ES256,
      type: PublicKeyCredentialType.publicKey,
    }];
    publicKeyCredentialCreationOptions.authenticatorSelection = {
      authenticatorAttachment: AuthenticatorAttachment.platform,
      userVerification: ResidentKeyRequirement.required,
    };
    publicKeyCredentialCreationOptions.timeout = 60000;
    publicKeyCredentialCreationOptions.attestation = AttestationConveyancePreference.direct;

    const serializedPublicKeyCredentialCreationOptions = serializePublicKeyCredentialCreationOptionsClass(
      publicKeyCredentialCreationOptions,
      log,
    );

    expect(serializedPublicKeyCredentialCreationOptions).to.exist;

    const deserializedPublicKeyCredentialCreationOptionsClass = deserializePublicKeyCredentialCreationOptionsClass(
      serializedPublicKeyCredentialCreationOptions,
      log,
    );

    expect(deserializedPublicKeyCredentialCreationOptionsClass).to.exist;
  });
});
