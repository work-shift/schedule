import {
  RegistrationRequest,
} from '../../generated/mjs/schedule/registration-request.mjs';

// eslint-disable-next-line no-unused-vars
export const deserialize = (message = null, debuglog = () => {}) => {
  if (message === null) {
    throw new ReferenceError('message is undefined');
  }

  const payload = {
    type: message.payloadType(),
  };
  // eslint-disable-next-line no-unused-vars
  const registrationRequest = message.payload(new RegistrationRequest());

  return Object.freeze({ ...Object.create(null), ...payload });
};
