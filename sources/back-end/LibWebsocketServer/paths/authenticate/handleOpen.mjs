import {
  randomUUID,
} from 'node:crypto';

export function handleOpen(ws) {
  const id = randomUUID();

  this.socketProps.set(ws, { id });
  this.sockets.set(id, ws);

  this.debuglog(`ws opened with ${id}`, this.sockets);
}
