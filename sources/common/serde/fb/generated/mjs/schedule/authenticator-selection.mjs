// automatically generated by the FlatBuffers compiler, do not modify
export class AuthenticatorSelection {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  authenticatorAttachment() {
    return this.bb.readUint8(this.bb_pos);
  }
  userVerification() {
    return this.bb.readUint8(this.bb_pos + 1);
  }
  static sizeOf() {
    return 2;
  }
  static createAuthenticatorSelection(builder, authenticator_attachment, user_verification) {
    builder.prep(1, 2);
    builder.writeInt8(user_verification);
    builder.writeInt8(authenticator_attachment);
    return builder.offset();
  }
}
