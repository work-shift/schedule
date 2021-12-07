import {
  Payload,
} from '../../fbs/generated/mjs/schedule/payload.mjs';

export const constructRegistrationRequest = () => ({
  type: Payload.RegistrationRequest,
});
