import {
  handleOpen as open,
} from './handleOpen.mjs';
import {
  handleMessage as message,
} from './handleMessage.mjs';
import {
  handleClose as close,
} from './handleClose.mjs';

const ctx = {
  socketProps: new WeakMap(),
  sockets: new Map(),
};

export const handleRegisterPath = ({
  wsOpts = null,
  debuglog = null,
}) => {
  const context = Object.freeze({ ...ctx, ...{ debuglog } });

  debuglog({ context });

  return Object.freeze({
    ...wsOpts,
    open: open.bind(context),
    message: message.bind(context),
    close: close.bind(context),
  });
};
