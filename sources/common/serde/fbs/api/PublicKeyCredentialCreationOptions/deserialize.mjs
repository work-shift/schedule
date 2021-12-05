import flatbuffers from 'flatbuffers';
import {
  PublicKeyCredentialCreationOptions,
} from '../../generated/mjs/schedule/public-key-credential-creation-options.mjs';
import {
  PublicKeyCredentialCreationOptionsClass,
} from '../helpers/ClassRegistry/PublicKeyCredentialCreationOptionsClass.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (PublicKeyCredentialCreationOptionsBuffer = null, debuglog = () => {}) => {
  if (PublicKeyCredentialCreationOptionsBuffer === null) {
    throw new ReferenceError('PublicKeyCredentialCreationOptionsBuffer is undefined');
  }

  const buffer = new flatbuffers.ByteBuffer(PublicKeyCredentialCreationOptionsBuffer);
  const publicKeyCredentialCreationOptions = PublicKeyCredentialCreationOptions.getRootAsPublicKeyCredentialCreationOptions(buffer);
  const result = new PublicKeyCredentialCreationOptionsClass();

  result.challenge = publicKeyCredentialCreationOptions.challengeArray();
  result.rp = {
    id: publicKeyCredentialCreationOptions.rp().id(),
    name: publicKeyCredentialCreationOptions.rp().name(),
  };
  result.user = {
    id: Uint8Array.from(publicKeyCredentialCreationOptions.user().idArray()),
    name: publicKeyCredentialCreationOptions.user().name(),
    displayName: publicKeyCredentialCreationOptions.user().displayName(),
  };
  result.pubKeyCredParams = [{
    alg: publicKeyCredentialCreationOptions.pubKeyCredParams().alg(),
    type: publicKeyCredentialCreationOptions.pubKeyCredParams().type(),
  }];
  result.authenticatorSelection = {
    authenticatorAttachment: publicKeyCredentialCreationOptions.authenticatorSelection().authenticatorAttachment(),
    userVerification: publicKeyCredentialCreationOptions.authenticatorSelection().userVerification(),
  };
  result.timeout = publicKeyCredentialCreationOptions.timeout();
  result.attestation = publicKeyCredentialCreationOptions.attestation();

  return Object.freeze(result);
};
