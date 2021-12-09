// ALTERNATIVE: import 'flatbuffers'
import * as flatbuffers from 'flatbuffers';
import {
  Payload,
} from '@work-shift/message-definitions/generated/mjs/schedule/payload.mjs';
import {
  serialize as serializeRegistrationRequest,
} from '@work-shift/serde-serializers-registration-request/serialize.mjs';
import {
  MessageSerializer,
} from '@work-shift/serde-serializers-message/MessageSerializer.node.mjs';
import {
  CustomEventTypes,
} from '../../constants/CustomEventTypes.mjs';

export class Serializer {
  constructor() {
    this.serializer = null;
    this.builder = null;
    this.serializers = null;
    this.log = null;

    console.log({
      flatbuffers,
    });
  }

  handleCustomEvent(customEvent = null) {
    if (customEvent === null || customEvent.isTrusted === false) {
      return;
    }

  }

  async start() {
    this.log = console.log;
    this.builder = new flatbuffers.Builder();


    this.serializers = new Map([
      [
        Payload.RegistrationRequest,
        serializeRegistrationRequest,
      ],
    ]);
    this.serializer = new MessageSerializer(this.builder, this.serializers, this.log);

    window.addEventListener('message', this.handleCustomEvent);
  }
}