const decoder = new TextDecoder();

export function handleClose(ws, code, message) {
  const {
    id,
  } = this.socketProps.get(ws);

  if (this.sockets.has(id)) {
    this.sockets.delete(id);
  }

  this.debuglog(`handleClose ws#${id} with code "${code}" and reason "${decoder.decode(message)}"`);
}
