import * as flatbuffers from 'flatbuffers';
export declare class User {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): User;
    static getRootAsUser(bb: flatbuffers.ByteBuffer, obj?: User): User;
    static getSizePrefixedRootAsUser(bb: flatbuffers.ByteBuffer, obj?: User): User;
    id(index: number): number | null;
    idLength(): number;
    idArray(): Uint32Array | null;
    name(): string | null;
    name(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    displayName(): string | null;
    displayName(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    static startUser(builder: flatbuffers.Builder): void;
    static addId(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset): void;
    static createIdVector(builder: flatbuffers.Builder, data: number[] | Uint32Array): flatbuffers.Offset;
    /**
     * @deprecated This Uint8Array overload will be removed in the future.
     */
    static createIdVector(builder: flatbuffers.Builder, data: number[] | Uint8Array): flatbuffers.Offset;
    static startIdVector(builder: flatbuffers.Builder, numElems: number): void;
    static addName(builder: flatbuffers.Builder, nameOffset: flatbuffers.Offset): void;
    static addDisplayName(builder: flatbuffers.Builder, displayNameOffset: flatbuffers.Offset): void;
    static endUser(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createUser(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset, nameOffset: flatbuffers.Offset, displayNameOffset: flatbuffers.Offset): flatbuffers.Offset;
}
