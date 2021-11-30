import * as flatbuffers from 'flatbuffers';
import { AuthenticatorAttachment } from '../schedule/authenticator-attachment';
import { ResidentKeyRequirement } from '../schedule/resident-key-requirement';
export declare class AuthenticatorSelection {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): AuthenticatorSelection;
    authenticatorAttachment(): AuthenticatorAttachment;
    userVerification(): ResidentKeyRequirement;
    static sizeOf(): number;
    static createAuthenticatorSelection(builder: flatbuffers.Builder, authenticator_attachment: AuthenticatorAttachment, user_verification: ResidentKeyRequirement): flatbuffers.Offset;
}
//# sourceMappingURL=authenticator-selection.d.ts.map