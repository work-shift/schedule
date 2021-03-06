// automatically generated by the FlatBuffers compiler, do not modify
import * as flatbuffers from 'flatbuffers';
import { Meta } from './meta.mjs';
import { Payload } from './payload.mjs';

export class Message {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsMessage(bb, obj) {
    return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsMessage(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  meta(obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? (obj || new Meta()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  payloadType() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : Payload.NONE;
  }
  payload(obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  static startMessage(builder) {
    builder.startObject(3);
  }
  static addMeta(builder, metaOffset) {
    builder.addFieldOffset(0, metaOffset, 0);
  }
  static addPayloadType(builder, payloadType) {
    builder.addFieldInt8(1, payloadType, Payload.NONE);
  }
  static addPayload(builder, payloadOffset) {
    builder.addFieldOffset(2, payloadOffset, 0);
  }
  static endMessage(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishMessageBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedMessageBuffer(builder, offset) {
    builder.finish(offset, undefined, true);
  }
  static createMessage(builder, metaOffset, payloadType, payloadOffset) {
    Message.startMessage(builder);
    Message.addMeta(builder, metaOffset);
    Message.addPayloadType(builder, payloadType);
    Message.addPayload(builder, payloadOffset);
    return Message.endMessage(builder);
  }
}
