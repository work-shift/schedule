import {
  randomUUID,
} from 'node:crypto';
import {
  RegistrationRequestClass,
} from '../../fbs/api/helpers/ClassRegistry/RegistrationRequestClass.mjs';
import {
  PublicKeyCredentialCreationOptionsClass,
} from '../../fbs/api/helpers/ClassRegistry/PublicKeyCredentialCreationOptionsClass.mjs';
import {
  COSEAlgorithms,
} from '../../fbs/generated/mjs/schedule/c-o-s-e-algorithms.mjs';
import {
  PublicKeyCredentialType,
} from '../../fbs/generated/mjs/schedule/public-key-credential-type.mjs';
import {
  AuthenticatorAttachment,
} from '../../fbs/generated/mjs/schedule/authenticator-attachment.mjs';
import {
  ResidentKeyRequirement,
} from '../../fbs/generated/mjs/schedule/resident-key-requirement.mjs';
import {
  AttestationConveyancePreference,
} from '../../fbs/generated/mjs/schedule/attestation-conveyance-preference.mjs';

// eslint-disable-next-line no-unused-vars
const defineRegistrationRequestClass = () => new RegistrationRequestClass();
// eslint-disable-next-line no-unused-vars
const definePublicKeyCredentialCreationOptionsClass = () => {
  const publicKeyCredentialCreationOptions = new PublicKeyCredentialCreationOptionsClass();

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

export const defineSpecPayloads = () => {
  const result = [];

  result.push({
    value: defineRegistrationRequestClass(),
    type: RegistrationRequestClass,
  });
  result.push({
    value: definePublicKeyCredentialCreationOptionsClass(),
    type: PublicKeyCredentialCreationOptionsClass,
  });

  return result.slice();
};
