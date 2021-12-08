import {
  Payload,
} from '@work-shift/message-definitions/generated/mjs/schedule/payload.mjs';

export const constructRegistrationRequest = () => ({
  type: Payload.RegistrationRequest,
});
