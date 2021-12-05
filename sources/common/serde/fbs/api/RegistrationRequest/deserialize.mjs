import flatbuffers from 'flatbuffers';
import {
  RegistrationRequest,
} from '../../generated/mjs/schedule/registration-request.mjs';
import {
  RegistrationRequestClass,
} from '../helpers/ClassRegistry/RegistrationRequestClass.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (RegistrationRequestBuffer = null, debuglog = () => {}) => {
  if (RegistrationRequestBuffer === null) {
    throw new ReferenceError('RegistrationRequestBuffer is undefined');
  }

  const buffer = new flatbuffers.ByteBuffer(RegistrationRequestBuffer);
  // eslint-disable-next-line no-unused-vars
  const registrationRequest = RegistrationRequest.getRootAsRegistrationRequest(buffer);

  const result = new RegistrationRequestClass();

  return Object.freeze(result);
};
