export function handleClose(ws, code, message) {
  const {
    id,
  } = this.socketProps.get(ws);

  if (this.sockets.has(id)) {
    this.sockets.delete(id);
  }

  this.debuglog(`handleClose ${code} and`, message);
}
