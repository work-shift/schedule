import {
  constructRegistrationRequest,
} from './constructRegistrationRequest.mjs';
import {
  constructPublicKeyCredentialCreationOptions,
} from './constructPublicKeyCredentialCreationOptions.mjs';

export const defineSpecPayloads = () => [
  constructRegistrationRequest(),
  constructPublicKeyCredentialCreationOptions(),
];
