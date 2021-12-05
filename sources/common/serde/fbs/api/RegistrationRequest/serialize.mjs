import flatbuffers from 'flatbuffers';
import {
  RegistrationRequest,
} from '../../generated/mjs/schedule/registration-request.mjs';
import {
  RegistrationRequestClass,
} from '../helpers/ClassRegistry/RegistrationRequestClass.mjs';

export const BINARY_LENGTH = 12;

// eslint-disable-next-line no-unused-vars
export const serialize = (RegistrationRequestObject = null, debuglog = () => {}) => {
  if (RegistrationRequestObject === null) {
    throw new ReferenceError('RegistrationRequestObject is undefined');
  }

  if (RegistrationRequestObject instanceof RegistrationRequestClass === false) {
    throw new TypeError(`RegistrationRequestObject is not an instance of ${RegistrationRequestClass.name}`);
  }

  const builder = new flatbuffers.Builder(BINARY_LENGTH);
  const result_offset = RegistrationRequest.createRegistrationRequest(builder);

  builder.finish(result_offset);

  return builder.asUint8Array();
};
