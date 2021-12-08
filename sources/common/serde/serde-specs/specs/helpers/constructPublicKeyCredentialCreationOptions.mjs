import {
  randomUUID,
} from 'node:crypto';
import {
  Payload,
} from '@work-shift/message-definitions/generated/mjs/schedule/payload.mjs';
import {
  COSEAlgorithms,
} from '@work-shift/message-definitions/generated/mjs/schedule/c-o-s-e-algorithms.mjs';
import {
  PublicKeyCredentialType,
} from '@work-shift/message-definitions/generated/mjs/schedule/public-key-credential-type.mjs';
import {
  AuthenticatorAttachment,
} from '@work-shift/message-definitions/generated/mjs/schedule/authenticator-attachment.mjs';
import {
  ResidentKeyRequirement,
} from '@work-shift/message-definitions/generated/mjs/schedule/resident-key-requirement.mjs';
import {
  AttestationConveyancePreference,
} from '@work-shift/message-definitions/generated/mjs/schedule/attestation-conveyance-preference.mjs';

export const constructPublicKeyCredentialCreationOptions = () => {
  const publicKeyCredentialCreationOptions = {
    type: Payload.PublicKeyCredentialCreationOptions,
  };

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

  return publicKeyCredentialCreationOptions;
};
