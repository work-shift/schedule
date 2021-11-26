const decoder = new TextDecoder();

export function handleMessage(ws, message, isBinary) {
  if (isBinary === false) {
    ws.close(0, 'non-binary data');
  }

  const { id } = this.socketProps.get(ws);

  this.debuglog(`handleMessage from ws#${id}: ${decoder.decode(message)}`);

  ws.send(message);
}
