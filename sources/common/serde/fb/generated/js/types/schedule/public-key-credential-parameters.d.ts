import * as flatbuffers from 'flatbuffers';
import { COSEAlgorithms } from '../schedule/c-o-s-e-algorithms';
import { PublicKeyCredentialType } from '../schedule/public-key-credential-type';
export declare class PublicKeyCredentialParameters {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): PublicKeyCredentialParameters;
    static getRootAsPublicKeyCredentialParameters(bb: flatbuffers.ByteBuffer, obj?: PublicKeyCredentialParameters): PublicKeyCredentialParameters;
    static getSizePrefixedRootAsPublicKeyCredentialParameters(bb: flatbuffers.ByteBuffer, obj?: PublicKeyCredentialParameters): PublicKeyCredentialParameters;
    alg(): COSEAlgorithms;
    type(): PublicKeyCredentialType;
    static startPublicKeyCredentialParameters(builder: flatbuffers.Builder): void;
    static addAlg(builder: flatbuffers.Builder, alg: COSEAlgorithms): void;
    static addType(builder: flatbuffers.Builder, type: PublicKeyCredentialType): void;
    static endPublicKeyCredentialParameters(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createPublicKeyCredentialParameters(builder: flatbuffers.Builder, alg: COSEAlgorithms, type: PublicKeyCredentialType): flatbuffers.Offset;
}
//# sourceMappingURL=public-key-credential-parameters.d.ts.map