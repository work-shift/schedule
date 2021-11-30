import * as flatbuffers from 'flatbuffers';
export declare class Rp {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): Rp;
    static getRootAsRp(bb: flatbuffers.ByteBuffer, obj?: Rp): Rp;
    static getSizePrefixedRootAsRp(bb: flatbuffers.ByteBuffer, obj?: Rp): Rp;
    id(): string | null;
    id(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    name(): string | null;
    name(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    static startRp(builder: flatbuffers.Builder): void;
    static addId(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset): void;
    static addName(builder: flatbuffers.Builder, nameOffset: flatbuffers.Offset): void;
    static endRp(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createRp(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset, nameOffset: flatbuffers.Offset): flatbuffers.Offset;
}
//# sourceMappingURL=rp.d.ts.map