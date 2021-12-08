import * as flatbuffers from 'flatbuffers';
export declare class RegistrationRequest {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): RegistrationRequest;
    static getRootAsRegistrationRequest(bb: flatbuffers.ByteBuffer, obj?: RegistrationRequest): RegistrationRequest;
    static getSizePrefixedRootAsRegistrationRequest(bb: flatbuffers.ByteBuffer, obj?: RegistrationRequest): RegistrationRequest;
    static startRegistrationRequest(builder: flatbuffers.Builder): void;
    static endRegistrationRequest(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createRegistrationRequest(builder: flatbuffers.Builder): flatbuffers.Offset;
}
