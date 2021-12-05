// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class User {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):User {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsUser(bb:flatbuffers.ByteBuffer, obj?:User):User {
  return (obj || new User()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsUser(bb:flatbuffers.ByteBuffer, obj?:User):User {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new User()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

id(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint32(this.bb!.__vector(this.bb_pos + offset) + index * 4) : 0;
}

idLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

idArray():Uint32Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? new Uint32Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

displayName():string|null
displayName(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
displayName(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startUser(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addId(builder:flatbuffers.Builder, idOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, idOffset, 0);
}

static createIdVector(builder:flatbuffers.Builder, data:number[]|Uint32Array):flatbuffers.Offset;
/**
 * @deprecated This Uint8Array overload will be removed in the future.
 */
static createIdVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset;
static createIdVector(builder:flatbuffers.Builder, data:number[]|Uint32Array|Uint8Array):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt32(data[i]!);
  }
  return builder.endVector();
}

static startIdVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, nameOffset, 0);
}

static addDisplayName(builder:flatbuffers.Builder, displayNameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, displayNameOffset, 0);
}

static endUser(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // id
  builder.requiredField(offset, 6) // name
  builder.requiredField(offset, 8) // display_name
  return offset;
}

static createUser(builder:flatbuffers.Builder, idOffset:flatbuffers.Offset, nameOffset:flatbuffers.Offset, displayNameOffset:flatbuffers.Offset):flatbuffers.Offset {
  User.startUser(builder);
  User.addId(builder, idOffset);
  User.addName(builder, nameOffset);
  User.addDisplayName(builder, displayNameOffset);
  return User.endUser(builder);
}
}
