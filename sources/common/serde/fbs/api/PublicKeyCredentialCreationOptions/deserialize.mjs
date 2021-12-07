import {
  PublicKeyCredentialCreationOptions,
} from '../../generated/mjs/schedule/public-key-credential-creation-options.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (message = null, debuglog = () => {}) => {
  if (message === null) {
    throw new ReferenceError('message is undefined');
  }

  const payloadType = message.payloadType();
  const publicKeyCredentialCreationOptions = message.payload(new PublicKeyCredentialCreationOptions());
  const payload = {
    type: payloadType,
  };

  payload.challenge = publicKeyCredentialCreationOptions.challengeArray();
  payload.rp = {
    id: publicKeyCredentialCreationOptions.rp().id(),
    name: publicKeyCredentialCreationOptions.rp().name(),
  };
  payload.user = {
    id: Uint8Array.from(publicKeyCredentialCreationOptions.user().idArray()),
    name: publicKeyCredentialCreationOptions.user().name(),
    displayName: publicKeyCredentialCreationOptions.user().displayName(),
  };
  payload.pubKeyCredParams = [{
    alg: publicKeyCredentialCreationOptions.pubKeyCredParams().alg(),
    type: publicKeyCredentialCreationOptions.pubKeyCredParams().type(),
  }];
  payload.authenticatorSelection = {
    authenticatorAttachment: publicKeyCredentialCreationOptions.authenticatorSelection().authenticatorAttachment(),
    userVerification: publicKeyCredentialCreationOptions.authenticatorSelection().userVerification(),
  };
  payload.timeout = publicKeyCredentialCreationOptions.timeout();
  payload.attestation = publicKeyCredentialCreationOptions.attestation();

  return payload;
};
