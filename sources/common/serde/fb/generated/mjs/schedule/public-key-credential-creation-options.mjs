// automatically generated by the FlatBuffers compiler, do not modify
import * as flatbuffers from 'flatbuffers';
import { AttestationConveyancePreference } from './attestation-conveyance-preference.mjs';
import { AuthenticatorSelection } from './authenticator-selection.mjs';
import { PublicKeyCredentialParameters } from './public-key-credential-parameters.mjs';
import { Rp } from './rp.mjs';
import { User } from './user.mjs';

export class PublicKeyCredentialCreationOptions {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsPublicKeyCredentialCreationOptions(bb, obj) {
    return (obj || new PublicKeyCredentialCreationOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsPublicKeyCredentialCreationOptions(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new PublicKeyCredentialCreationOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  challenge(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  challengeLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  challengeArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  rp(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new Rp()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  user(obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? (obj || new User()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  pubKeyCredParams(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? (obj || new PublicKeyCredentialParameters()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  pubKeyCredParamsLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  authenticatorSelection(obj) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? (obj || new AuthenticatorSelection()).__init(this.bb_pos + offset, this.bb) : null;
  }
  timeout() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 60000;
  }
  attestation() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : AttestationConveyancePreference.direct;
  }
  static startPublicKeyCredentialCreationOptions(builder) {
    builder.startObject(7);
  }
  static addChallenge(builder, challengeOffset) {
    builder.addFieldOffset(0, challengeOffset, 0);
  }
  static createChallengeVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startChallengeVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static addRp(builder, rpOffset) {
    builder.addFieldOffset(1, rpOffset, 0);
  }
  static addUser(builder, userOffset) {
    builder.addFieldOffset(2, userOffset, 0);
  }
  static addPubKeyCredParams(builder, pubKeyCredParamsOffset) {
    builder.addFieldOffset(3, pubKeyCredParamsOffset, 0);
  }
  static createPubKeyCredParamsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startPubKeyCredParamsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addAuthenticatorSelection(builder, authenticatorSelectionOffset) {
    builder.addFieldStruct(4, authenticatorSelectionOffset, 0);
  }
  static addTimeout(builder, timeout) {
    builder.addFieldInt32(5, timeout, 60000);
  }
  static addAttestation(builder, attestation) {
    builder.addFieldInt8(6, attestation, AttestationConveyancePreference.direct);
  }
  static endPublicKeyCredentialCreationOptions(builder) {
    const offset = builder.endObject();
    return offset;
  }
}
