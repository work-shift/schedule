// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class RegistrationRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):RegistrationRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsRegistrationRequest(bb:flatbuffers.ByteBuffer, obj?:RegistrationRequest):RegistrationRequest {
  return (obj || new RegistrationRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsRegistrationRequest(bb:flatbuffers.ByteBuffer, obj?:RegistrationRequest):RegistrationRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new RegistrationRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static startRegistrationRequest(builder:flatbuffers.Builder) {
  builder.startObject(0);
}

static endRegistrationRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createRegistrationRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  RegistrationRequest.startRegistrationRequest(builder);
  return RegistrationRequest.endRegistrationRequest(builder);
}
}