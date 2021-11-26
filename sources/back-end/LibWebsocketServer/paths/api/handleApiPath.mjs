import {
  handleOpen as open,
} from './handleOpen.mjs';
import {
  handleMessage as message,
} from './handleMessage.mjs';
import {
  handleClose as close,
} from './handleClose.mjs';
import {
  handleUpgrade as upgrade,
} from './handleUpgrade.mjs';

const ctx = {
  socketProps: new WeakMap(),
  sockets: new Map(),
};

export const handleApiPath = ({
  wsOpts = null,
  debuglog = null,
}) => {
  const context = Object.freeze({ ...ctx, ...{ debuglog } });

  return Object.freeze({
    ...wsOpts,
    upgrade: upgrade.bind(context),
    open: open.bind(context),
    message: message.bind(context),
    close: close.bind(context),
  });
};
