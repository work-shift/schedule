// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { AttestationConveyancePreference } from '../schedule/attestation-conveyance-preference';
import { AuthenticatorSelection } from '../schedule/authenticator-selection';
import { PublicKeyCredentialParameters } from '../schedule/public-key-credential-parameters';
import { Rp } from '../schedule/rp';
import { User } from '../schedule/user';


export class PublicKeyCredentialCreationOptions {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):PublicKeyCredentialCreationOptions {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsPublicKeyCredentialCreationOptions(bb:flatbuffers.ByteBuffer, obj?:PublicKeyCredentialCreationOptions):PublicKeyCredentialCreationOptions {
  return (obj || new PublicKeyCredentialCreationOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsPublicKeyCredentialCreationOptions(bb:flatbuffers.ByteBuffer, obj?:PublicKeyCredentialCreationOptions):PublicKeyCredentialCreationOptions {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new PublicKeyCredentialCreationOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

challenge(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint8(this.bb!.__vector(this.bb_pos + offset) + index) : 0;
}

challengeLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

challengeArray():Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? new Uint8Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

rp(obj?:Rp):Rp|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new Rp()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

user(obj?:User):User|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? (obj || new User()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

pubKeyCredParams(index: number, obj?:PublicKeyCredentialParameters):PublicKeyCredentialParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new PublicKeyCredentialParameters()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

pubKeyCredParamsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

authenticatorSelection(obj?:AuthenticatorSelection):AuthenticatorSelection|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new AuthenticatorSelection()).__init(this.bb_pos + offset, this.bb!) : null;
}

timeout():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 60000;
}

attestation():AttestationConveyancePreference {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : AttestationConveyancePreference.direct;
}

static startPublicKeyCredentialCreationOptions(builder:flatbuffers.Builder) {
  builder.startObject(7);
}

static addChallenge(builder:flatbuffers.Builder, challengeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, challengeOffset, 0);
}

static createChallengeVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset {
  builder.startVector(1, data.length, 1);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]!);
  }
  return builder.endVector();
}

static startChallengeVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(1, numElems, 1);
}

static addRp(builder:flatbuffers.Builder, rpOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, rpOffset, 0);
}

static addUser(builder:flatbuffers.Builder, userOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, userOffset, 0);
}

static addPubKeyCredParams(builder:flatbuffers.Builder, pubKeyCredParamsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, pubKeyCredParamsOffset, 0);
}

static createPubKeyCredParamsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startPubKeyCredParamsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addAuthenticatorSelection(builder:flatbuffers.Builder, authenticatorSelectionOffset:flatbuffers.Offset) {
  builder.addFieldStruct(4, authenticatorSelectionOffset, 0);
}

static addTimeout(builder:flatbuffers.Builder, timeout:number) {
  builder.addFieldInt32(5, timeout, 60000);
}

static addAttestation(builder:flatbuffers.Builder, attestation:AttestationConveyancePreference) {
  builder.addFieldInt8(6, attestation, AttestationConveyancePreference.direct);
}

static endPublicKeyCredentialCreationOptions(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // challenge
  builder.requiredField(offset, 6) // rp
  builder.requiredField(offset, 8) // user
  builder.requiredField(offset, 10) // pub_key_cred_params
  builder.requiredField(offset, 12) // authenticator_selection
  return offset;
}

}
