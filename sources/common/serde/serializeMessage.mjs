import {
  MessageTypes,
} from './MessageTypes.mjs';
import serializePublicKeyCredentialCreationOptions from './serializers/PUBLIC_KEY_CREDENTIAL_CREATION_OPTS.mjs';

const serializers = new Map();

serializers.set(MessageTypes.sec.PUBLIC_KEY_CREDENTIAL_CREATION_OPTS, serializePublicKeyCredentialCreationOptions);

// eslint-disable-next-line no-unused-vars
export const serializeMessage = (messageObject = null, debuglog = () => {}) => {
  if (messageObject === null) {
    throw ReferenceError('messageObject is undefined');
  }

  const serializer = serializers.get(messageObject.type) || (() => { throw new ReferenceError(`no serializer for ${messageObject.type} type`); });

  return serializer(messageObject, debuglog);
};
