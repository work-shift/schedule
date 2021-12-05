import * as flatbuffers from 'flatbuffers';
import { Meta } from '../schedule/meta';
import { Payload } from '../schedule/payload';
export declare class Message {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): Message;
    static getRootAsMessage(bb: flatbuffers.ByteBuffer, obj?: Message): Message;
    static getSizePrefixedRootAsMessage(bb: flatbuffers.ByteBuffer, obj?: Message): Message;
    meta(obj?: Meta): Meta | null;
    payloadType(): Payload;
    payload<T extends flatbuffers.Table>(obj: any): any | null;
    static startMessage(builder: flatbuffers.Builder): void;
    static addMeta(builder: flatbuffers.Builder, metaOffset: flatbuffers.Offset): void;
    static addPayloadType(builder: flatbuffers.Builder, payloadType: Payload): void;
    static addPayload(builder: flatbuffers.Builder, payloadOffset: flatbuffers.Offset): void;
    static endMessage(builder: flatbuffers.Builder): flatbuffers.Offset;
    static finishMessageBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
    static finishSizePrefixedMessageBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
    static createMessage(builder: flatbuffers.Builder, metaOffset: flatbuffers.Offset, payloadType: Payload, payloadOffset: flatbuffers.Offset): flatbuffers.Offset;
}
