#!/usr/bin/env -S NODE_ENV=production NODE_DEBUG=WebsocketServer,LibWebsocketServer node

import util from 'util';
import dotenv from 'dotenv';
import {
  Paths,
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
} from '@work-shift/lib-websocket-server/Paths.mjs';
import {
  LibWebsocketServer,
} from '@work-shift/lib-websocket-server/LibWebsocketServer.mjs';

dotenv.config();

const EXIT_CODE_OK = 0;
const EXIT_CODE_ER = 1;
const debuglog = util.debuglog('WebsocketServer');
const serverConfig = Object.freeze({
  server: {
    host: process.env.WS_HOST,
    port: parseInt(process.env.WS_PORT, 10),
  },
  pathOpts: {
    [Paths.API]: {
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 12,
    },
    [Paths.REGISTER]: {
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 12,
    },
    [Paths.AUTHENTICATE]: {
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 12,
    },
  },
});

debuglog(`process.env.NODE_DEBUG: ${process.env.NODE_DEBUG}`);
debuglog({
  serverConfig,
});

process.exitCode = EXIT_CODE_ER;

let lib = null;

const handleProcessSignal = async (signal = null) => {
  if (signal !== null) {
    debuglog(`signal "${signal}" received. Exiting.`);
  } else {
    debuglog('exiting');
  }

  lib.stop();

  // eslint-disable-next-line no-process-exit
  process.exit(EXIT_CODE_OK);
};

const handleUncaughtExceptionMonitor = (error, origin) => {
  debuglog('handleUncaughtExceptionMonitor', error, origin);
};

const handleUncaughtException = (error, origin) => {
  debuglog('handleUncaughtException', error, origin);

  // eslint-disable-next-line no-process-exit
  process.exit(error.code);
};

const handleUnhandledRejection = (reason, promise) => {
  debuglog('handleUnhandledRejection', reason, promise);

  // eslint-disable-next-line no-process-exit
  process.exit();
};

const handleWarning = (warning) => {
  debuglog('handleWarning', warning);
};

process.once('SIGINT', handleProcessSignal);
process.once('SIGTERM', handleProcessSignal);
process.on('uncaughtExceptionMonitor', handleUncaughtExceptionMonitor);
process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUnhandledRejection);
process.on('warning', handleWarning);

lib = new LibWebsocketServer(serverConfig);

await lib.start();

debuglog('ready');
