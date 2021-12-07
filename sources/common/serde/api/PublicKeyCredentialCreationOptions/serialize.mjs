import {
  PublicKeyCredentialCreationOptions,
} from '../../fbs/generated/mjs/schedule/public-key-credential-creation-options.mjs';
import {
  Rp,
} from '../../fbs/generated/mjs/schedule/rp.mjs';
import {
  User,
} from '../../fbs/generated/mjs/schedule/user.mjs';
import {
  PublicKeyCredentialParameters,
} from '../../fbs/generated/mjs/schedule/public-key-credential-parameters.mjs';
import {
  AuthenticatorSelection,
} from '../../fbs/generated/mjs/schedule/authenticator-selection.mjs';

// eslint-disable-next-line no-unused-vars
const define_challenge = (builder = null, sourceObject = null, debuglog = () => {}) => PublicKeyCredentialCreationOptions.createChallengeVector(
  builder,
  sourceObject.challenge,
);

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

// eslint-disable-next-line no-unused-vars
export const serialize = (builder = null, PublicKeyCredentialCreationOptionsObject = null, debuglog = () => {}) => {
  if (builder === null) {
    throw new ReferenceError('PublicKeyCredentialCreationOptionsObject is undefined');
  }

  if (PublicKeyCredentialCreationOptionsObject === null) {
    throw new ReferenceError('PublicKeyCredentialCreationOptionsObject is undefined');
  }

  const challenge_offset = define_challenge(builder, PublicKeyCredentialCreationOptionsObject, debuglog);
  const rp_offset = define_rp(builder, PublicKeyCredentialCreationOptionsObject, debuglog);
  const user_offset = define_user(builder, PublicKeyCredentialCreationOptionsObject, debuglog);
  const pub_key_cred_params_offset = define_pub_key_cred_params(builder, PublicKeyCredentialCreationOptionsObject, debuglog);

  PublicKeyCredentialCreationOptions.startPublicKeyCredentialCreationOptions(builder);
  PublicKeyCredentialCreationOptions.addChallenge(builder, challenge_offset);
  PublicKeyCredentialCreationOptions.addRp(builder, rp_offset);
  PublicKeyCredentialCreationOptions.addUser(builder, user_offset);
  PublicKeyCredentialCreationOptions.addPubKeyCredParams(builder, pub_key_cred_params_offset);
  PublicKeyCredentialCreationOptions.addAuthenticatorSelection(builder, AuthenticatorSelection.createAuthenticatorSelection(
    builder,
    PublicKeyCredentialCreationOptionsObject.authenticatorSelection.authenticatorAttachment,
    PublicKeyCredentialCreationOptionsObject.authenticatorSelection.userVerification,
  ));
  PublicKeyCredentialCreationOptions.addTimeout(builder, PublicKeyCredentialCreationOptionsObject.timeout);
  PublicKeyCredentialCreationOptions.addAttestation(builder, PublicKeyCredentialCreationOptionsObject.attestation);

  return PublicKeyCredentialCreationOptions.endPublicKeyCredentialCreationOptions(builder);
};
