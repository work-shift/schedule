// automatically generated by the FlatBuffers compiler, do not modify
import * as flatbuffers from 'flatbuffers';

export class RegistrationRequest {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsRegistrationRequest(bb, obj) {
    return (obj || new RegistrationRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsRegistrationRequest(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new RegistrationRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startRegistrationRequest(builder) {
    builder.startObject(0);
  }
  static endRegistrationRequest(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createRegistrationRequest(builder) {
    RegistrationRequest.startRegistrationRequest(builder);
    return RegistrationRequest.endRegistrationRequest(builder);
  }
}