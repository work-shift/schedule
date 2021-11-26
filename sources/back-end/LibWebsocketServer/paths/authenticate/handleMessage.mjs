// eslint-disable-next-line no-unused-vars
export function handleMessage(ws, message, isBinary) {
  if (isBinary === false) {
    ws.close(0, 'non-binary data');
  }

  const { id } = this.socketProps.get(ws);

  this.debuglog('handleMessage', id, message, isBinary);

  ws.send(message);
}
