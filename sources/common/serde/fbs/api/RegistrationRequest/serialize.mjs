import {
  RegistrationRequest,
} from '../../generated/mjs/schedule/registration-request.mjs';
// import {
//   RegistrationRequestClass,
// } from '../helpers/ClassRegistry/RegistrationRequest.mjs';

export const BINARY_LENGTH = 12;

// eslint-disable-next-line no-unused-vars
export const serialize = (builder = null, RegistrationRequestObject = null, debuglog = () => {}) => {
  if (builder === null) {
    throw new ReferenceError('RegistrationRequestObject is undefined');
  }

  if (RegistrationRequestObject === null) {
    throw new ReferenceError('RegistrationRequestObject is undefined');
  }

  return RegistrationRequest.createRegistrationRequest(builder);

  // builder.finish(result_offset);

  // return builder.asUint8Array();
};
