import * as flatbuffers from 'flatbuffers';
export declare class Meta {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): Meta;
    static getRootAsMeta(bb: flatbuffers.ByteBuffer, obj?: Meta): Meta;
    static getSizePrefixedRootAsMeta(bb: flatbuffers.ByteBuffer, obj?: Meta): Meta;
    id(): string | null;
    id(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    ts(): number;
    static startMeta(builder: flatbuffers.Builder): void;
    static addId(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset): void;
    static addTs(builder: flatbuffers.Builder, ts: number): void;
    static endMeta(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createMeta(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset, ts: number): flatbuffers.Offset;
}
