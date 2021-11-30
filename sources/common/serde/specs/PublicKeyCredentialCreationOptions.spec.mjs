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
  MessageTypes,
} from '../fb/generated/mjs/schedule/message-types.mjs';
import {
  COSEAlgorithms,
} from '../fb/generated/mjs/schedule/c-o-s-e-algorithms.mjs';
import {
  PublicKeyCredentialType,
} from '../fb/generated/mjs/schedule/public-key-credential-type.mjs';
import {
  PublicKeyCredentialCreationOptions,
} from '../fb/generated/mjs/schedule/public-key-credential-creation-options.mjs';
import {
  AuthenticatorAttachment,
} from '../fb/generated/mjs/schedule/authenticator-attachment.mjs';
import {
  ResidentKeyRequirement,
} from '../fb/generated/mjs/schedule/resident-key-requirement.mjs';
import {
  AttestationConveyancePreference,
} from '../fb/generated/mjs/schedule/attestation-conveyance-preference.mjs';

describe(PublicKeyCredentialCreationOptions.name, function describePublicKeyCredentialCreationOptions() {
  const debuglog = util.debuglog('serde:specs');

  it('should serialize/deserialize PublicKeyCredentialCreationOptions', async function serdePublicKeyCredentialCreationOptions() {
    const message = {
      type: MessageTypes.PublicKeyCredentialCreationOptions,
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
          alg: COSEAlgorithms.ES256,
          type: PublicKeyCredentialType.publicKey,
        }],
        authenticatorSelection: {
          authenticatorAttachment: AuthenticatorAttachment.platform,
          userVerification: ResidentKeyRequirement.required,
        },
        timeout: 60000,
        attestation: AttestationConveyancePreference.direct, // direct
      },
    };

    debuglog({
      message,
    });

    return expect(true).to.be.true;
  });
});
