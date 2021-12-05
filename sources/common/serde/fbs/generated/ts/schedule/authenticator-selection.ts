// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { AuthenticatorAttachment } from '../schedule/authenticator-attachment';
import { ResidentKeyRequirement } from '../schedule/resident-key-requirement';


export class AuthenticatorSelection {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):AuthenticatorSelection {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

authenticatorAttachment():AuthenticatorAttachment {
  return this.bb!.readUint8(this.bb_pos);
}

userVerification():ResidentKeyRequirement {
  return this.bb!.readUint8(this.bb_pos + 1);
}

static sizeOf():number {
  return 2;
}

static createAuthenticatorSelection(builder:flatbuffers.Builder, authenticator_attachment: AuthenticatorAttachment, user_verification: ResidentKeyRequirement):flatbuffers.Offset {
  builder.prep(1, 2);
  builder.writeInt8(user_verification);
  builder.writeInt8(authenticator_attachment);
  return builder.offset();
}

}
