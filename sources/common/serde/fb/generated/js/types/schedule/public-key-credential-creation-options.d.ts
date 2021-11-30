import * as flatbuffers from 'flatbuffers';
import { AttestationConveyancePreference } from '../schedule/attestation-conveyance-preference';
import { AuthenticatorSelection } from '../schedule/authenticator-selection';
import { PublicKeyCredentialParameters } from '../schedule/public-key-credential-parameters';
import { Rp } from '../schedule/rp';
import { User } from '../schedule/user';
export declare class PublicKeyCredentialCreationOptions {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): PublicKeyCredentialCreationOptions;
    static getRootAsPublicKeyCredentialCreationOptions(bb: flatbuffers.ByteBuffer, obj?: PublicKeyCredentialCreationOptions): PublicKeyCredentialCreationOptions;
    static getSizePrefixedRootAsPublicKeyCredentialCreationOptions(bb: flatbuffers.ByteBuffer, obj?: PublicKeyCredentialCreationOptions): PublicKeyCredentialCreationOptions;
    challenge(index: number): number | null;
    challengeLength(): number;
    challengeArray(): Uint8Array | null;
    rp(obj?: Rp): Rp | null;
    user(obj?: User): User | null;
    pubKeyCredParams(index: number, obj?: PublicKeyCredentialParameters): PublicKeyCredentialParameters | null;
    pubKeyCredParamsLength(): number;
    authenticatorSelection(obj?: AuthenticatorSelection): AuthenticatorSelection | null;
    timeout(): number;
    attestation(): AttestationConveyancePreference;
    static startPublicKeyCredentialCreationOptions(builder: flatbuffers.Builder): void;
    static addChallenge(builder: flatbuffers.Builder, challengeOffset: flatbuffers.Offset): void;
    static createChallengeVector(builder: flatbuffers.Builder, data: number[] | Uint8Array): flatbuffers.Offset;
    static startChallengeVector(builder: flatbuffers.Builder, numElems: number): void;
    static addRp(builder: flatbuffers.Builder, rpOffset: flatbuffers.Offset): void;
    static addUser(builder: flatbuffers.Builder, userOffset: flatbuffers.Offset): void;
    static addPubKeyCredParams(builder: flatbuffers.Builder, pubKeyCredParamsOffset: flatbuffers.Offset): void;
    static createPubKeyCredParamsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startPubKeyCredParamsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addAuthenticatorSelection(builder: flatbuffers.Builder, authenticatorSelectionOffset: flatbuffers.Offset): void;
    static addTimeout(builder: flatbuffers.Builder, timeout: number): void;
    static addAttestation(builder: flatbuffers.Builder, attestation: AttestationConveyancePreference): void;
    static endPublicKeyCredentialCreationOptions(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=public-key-credential-creation-options.d.ts.map