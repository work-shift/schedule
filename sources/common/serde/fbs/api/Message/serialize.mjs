import flatbuffers from 'flatbuffers';
import {
  MessageClass,
} from '../helpers/ClassRegistry/MessageClass.mjs';
import {
  Message,
} from '../../generated/mjs/schedule/message.mjs';
import {
  Meta,
} from '../../generated/mjs/schedule/meta.mjs';
import {
  Payload,
} from '../../generated/mjs/schedule/payload.mjs';
import {
  RegistrationRequestClass,
} from '../helpers/ClassRegistry/RegistrationRequestClass.mjs';
import {
  PublicKeyCredentialCreationOptionsClass,
} from '../helpers/ClassRegistry/PublicKeyCredentialCreationOptionsClass.mjs';
import {
  RegistrationRequest,
} from '../../generated/mjs/schedule/registration-request.mjs';
import {
  PublicKeyCredentialCreationOptions,
} from '../../generated/mjs/schedule/public-key-credential-creation-options.mjs';
import {
  Rp,
} from '../../generated/mjs/schedule/rp.mjs';
import {
  User,
} from '../../generated/mjs/schedule/user.mjs';
import {
  PublicKeyCredentialParameters,
} from '../../generated/mjs/schedule/public-key-credential-parameters.mjs';
import {
  AuthenticatorSelection,
} from '../../generated/mjs/schedule/authenticator-selection.mjs';

const resolvePayloadType = (payload = null) => {
  if (payload === null) {
    throw new ReferenceError('payload is undefined');
  }

  if (payload instanceof RegistrationRequestClass === true) {
    return Payload.RegistrationRequest;
  }

  if (payload instanceof PublicKeyCredentialCreationOptionsClass === true) {
    return Payload.PublicKeyCredentialCreationOptions;
  }

  throw new TypeError('unknown payload type', payload);
};

// eslint-disable-next-line no-unused-vars
const resolveSerializerByPayloadType = (builder = null, payloadType = null, debuglog = () => {}) => {
  const serializers = {
    // eslint-disable-next-line no-unused-vars
    [Payload.RegistrationRequest]: (payload = null) => RegistrationRequest.createRegistrationRequest(builder),
    // eslint-disable-next-line no-unused-vars
    [Payload.PublicKeyCredentialCreationOptions]: (payload = null) => {
      const define_challenge = (
        builder = null,
        sourceObject = null,
        // eslint-disable-next-line no-unused-vars
        debuglog = () => {},
      ) => PublicKeyCredentialCreationOptions.createChallengeVector(builder, sourceObject.challenge);

      // eslint-disable-next-line no-unused-vars
      const define_rp = (builder = null, sourceObject = null, debuglog = () => {}) => {
        const id_offset = builder.createString(sourceObject.rp.id);
        const name_offset = builder.createString(sourceObject.rp.name);

        Rp.addId(builder, id_offset);
        Rp.addName(builder, name_offset);

        return Rp.createRp(builder, id_offset, name_offset);
      };

      // eslint-disable-next-line no-unused-vars
      const define_user = (builder = null, sourceObject = null, debuglog = () => {}) => {
        const id_offset = User.createIdVector(builder, sourceObject.user.id);
        const name_offset = builder.createString(sourceObject.user.name);
        const display_name_offset = builder.createString(sourceObject.user.displayName);

        return User.createUser(builder, id_offset, name_offset, display_name_offset);
      };

      // eslint-disable-next-line no-unused-vars
      const define_pub_key_cred_params = (builder = null, sourceObject = null, debuglog = () => {}) => {
        const pubKeyCredParams_offsets = [];

        for (const pubKeyCredParam of sourceObject.pubKeyCredParams) {
          pubKeyCredParams_offsets.push(
            PublicKeyCredentialParameters.createPublicKeyCredentialParameters(builder, pubKeyCredParam.alg, pubKeyCredParam.type),
          );
        }

        return PublicKeyCredentialCreationOptions.createPubKeyCredParamsVector(builder, pubKeyCredParams_offsets);
      };

      const challenge_offset = define_challenge(builder, payload, debuglog);
      const rp_offset = define_rp(builder, payload, debuglog);
      const user_offset = define_user(builder, payload, debuglog);
      const pub_key_cred_params_offset = define_pub_key_cred_params(builder, payload, debuglog);

      PublicKeyCredentialCreationOptions.startPublicKeyCredentialCreationOptions(builder);
      PublicKeyCredentialCreationOptions.addChallenge(builder, challenge_offset);
      PublicKeyCredentialCreationOptions.addRp(builder, rp_offset);
      PublicKeyCredentialCreationOptions.addUser(builder, user_offset);
      PublicKeyCredentialCreationOptions.addPubKeyCredParams(builder, pub_key_cred_params_offset);
      PublicKeyCredentialCreationOptions.addAuthenticatorSelection(builder, AuthenticatorSelection.createAuthenticatorSelection(
        builder,
        payload.authenticatorSelection.authenticatorAttachment,
        payload.authenticatorSelection.userVerification,
      ));
      PublicKeyCredentialCreationOptions.addTimeout(builder, payload.timeout);
      PublicKeyCredentialCreationOptions.addAttestation(builder, payload.attestation);

      return PublicKeyCredentialCreationOptions.endPublicKeyCredentialCreationOptions(builder);
    },
  };

  return serializers[payloadType] ?? (() => {
    throw new TypeError(`payload type "${payloadType}" is unknown`);
  });
};

// eslint-disable-next-line no-unused-vars
export const serialize = (MessageObject = null, debuglog = () => {}) => {
  if (MessageObject === null) {
    throw new ReferenceError('MessageObject is undefined');
  }

  if (MessageObject instanceof MessageClass === false) {
    throw new TypeError(`MessageObject is not an instance of ${MessageClass.name}`);
  }

  const builder = new flatbuffers.Builder();

  const metaOffset = Meta.createMeta(
    builder,
    builder.createString(MessageObject.meta.id),
    MessageObject.meta.ts,
  );

  const payloadType = resolvePayloadType(MessageObject.payload);
  const payloadOffset = (resolveSerializerByPayloadType(builder, payloadType, debuglog))(MessageObject.payload);
  const result_offset = Message.createMessage(
    builder,
    metaOffset,
    payloadType,
    payloadOffset,
  );

  builder.finish(result_offset);

  return builder.asUint8Array();
};
