import {
  encode,
} from '@work-shift/encoding/encode.mjs';

/*
  const publicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from('random-bytes-from-server', (c) => c.charCodeAt(0)),
    rp: {
      name: 'schedule',
      id: 'localhost',
    },
    user: {
      id: Uint8Array.from('user-random-id', (c) => c.charCodeAt(0)),
      name: 'user-random-name',
      displayName: 'user-random-displayName',
    },
    pubKeyCredParams: [{
      alg: -7,
      type: 'public-key',
    }, ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'required',
    },
    timeout: 60000,
    attestation: 'enterprise', // direct
  };
*/

// eslint-disable-next-line no-unused-vars
const serialize = (publicKeyCredentialCreationOptions = null, debuglog = () => {}) => {
  if (publicKeyCredentialCreationOptions === null) {
    throw ReferenceError('publicKeyCredentialCreationOptions is undefined');
  } else {
    debuglog({
      publicKeyCredentialCreationOptions,
    });
  }

  // TODO: add ajv validation

  const resultObject = {
    ...Object.create(null),
    ...{
      challenge: encode(publicKeyCredentialCreationOptions.challenge, debuglog),
      rp: {
        id: publicKeyCredentialCreationOptions.rp.id,
        name: publicKeyCredentialCreationOptions.rp.name,
      },
      user: {
        id: encode(publicKeyCredentialCreationOptions.user.id, debuglog),
        name: publicKeyCredentialCreationOptions.user.name,
        displayName: publicKeyCredentialCreationOptions.user.displayName,
      },
      pubKeyCredParams: [{
        alg: -7,
        type: 'public-key',
      }],
      authenticatorSelection: {
        authenticatorAttachment: publicKeyCredentialCreationOptions.authenticatorSelection.authenticatorAttachment,
        userVerification: publicKeyCredentialCreationOptions.authenticatorSelection.userVerification,
      },
      timeout: publicKeyCredentialCreationOptions.timeout,
      attestation: publicKeyCredentialCreationOptions.attestation,
    },
  };

  return resultObject;
};

export default serialize;
