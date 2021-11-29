import {
  randomUUID,
} from 'node:crypto';
import {
  Fido2Lib,
} from 'fido2-lib';
import {
  encode,
} from '@work-shift/encoding/encode.mjs';

const f2lOpts = {
  timeout: 42,
  rpId: 'localhost',
  rpName: 'schedule',
  rpIcon: 'http://localhost/favicon.png',
  challengeSize: 128,
  attestation: 'direct',
  cryptoParams: [-7, -257],
  authenticatorAttachment: 'platform',
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: 'required',
};
const f2l = new Fido2Lib(f2lOpts);
const registrationOptions = await f2l.attestationOptions();

export const handleRegisterStart = async (payload = null, debuglog = () => {}) => {
  debuglog('handleRegisterStart', payload);

  const user = randomUUID();

  registrationOptions.user = {
    id: user,
    name: user,
    displayName: user,
  };

  registrationOptions.challenge = encode(registrationOptions.challenge, debuglog);

  debuglog('handleRegisterStart::registrationOptions', registrationOptions);

  return {
    type: 'registrationOptions',
    payload: {
      registrationOptions,
    },
  };
};
