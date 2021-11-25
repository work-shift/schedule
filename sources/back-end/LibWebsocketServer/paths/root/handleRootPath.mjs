import {
  handleOpen as open,
} from './handleOpen.mjs';
import {
  handleMessage as message,
} from './handleMessage.mjs';
import {
  handleClose as close,
} from './handleClose.mjs';

export const handleRootPath = ({ wsOpts = null }) => Object.freeze({
  ...wsOpts,
  open,
  message,
  close,
});
