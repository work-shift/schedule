import {
  handleRegisterStart,
} from './messageHandlers/handleRegisterStart.mjs';

const decoder = new TextDecoder();
const encoder = new TextEncoder();

export function handleMessage(ws, message, isBinary) {
  if (isBinary === false) {
    ws.close(0, encoder.encode('non-binary data'));

    return;
  }

  const { id } = this.socketProps.get(ws);

  const messageObject = JSON.parse(decoder.decode(message));

  switch (messageObject.type) {
    case 'register:start': {
      this.debuglog(`[${id}] handle "${messageObject.type}" with payload: ${JSON.stringify(messageObject.payload)}`);

      handleRegisterStart(messageObject.payload, this.debuglog)
        .then((result) => {
          ws.send(encoder.encode(JSON.stringify(result)));
        });

      break;
    }
    default: {
      this.debuglog('unknown message type:', messageObject);

      break;
    }
  }

  // ws.send(message);
}
