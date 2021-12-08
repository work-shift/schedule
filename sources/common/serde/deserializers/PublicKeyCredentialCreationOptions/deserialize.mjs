import {
  PublicKeyCredentialCreationOptions,
} from '@work-shift/message-definitions/generated/mjs/schedule/public-key-credential-creation-options.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (message = null, debuglog = () => {}) => {
  if (message === null) {
    throw new ReferenceError('message is undefined');
  }

  const payloadType = message.payloadType();
  const publicKeyCredentialCreationOptions = message.payload(new PublicKeyCredentialCreationOptions());

  return Object.freeze({
    ...Object.create(null),
    ...{
      type: payloadType,
      challenge: publicKeyCredentialCreationOptions.challengeArray(),
      rp: {
        id: publicKeyCredentialCreationOptions.rp().id(),
        name: publicKeyCredentialCreationOptions.rp().name(),
      },
      user: {
        id: Uint8Array.from(publicKeyCredentialCreationOptions.user().idArray()),
        name: publicKeyCredentialCreationOptions.user().name(),
        displayName: publicKeyCredentialCreationOptions.user().displayName(),
      },
      pubKeyCredParams: [{
        alg: publicKeyCredentialCreationOptions.pubKeyCredParams().alg(),
        type: publicKeyCredentialCreationOptions.pubKeyCredParams().type(),
      }],
      authenticatorSelection: {
        authenticatorAttachment: publicKeyCredentialCreationOptions.authenticatorSelection().authenticatorAttachment(),
        userVerification: publicKeyCredentialCreationOptions.authenticatorSelection().userVerification(),
      },
      timeout: publicKeyCredentialCreationOptions.timeout(),
      attestation: publicKeyCredentialCreationOptions.attestation(),
    },
  });
};
