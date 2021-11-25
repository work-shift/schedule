import util from 'util';
import dotenv from 'dotenv';
import {
  before,
  after,
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';
import {
  Paths,
} from '../paths/Paths.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debuglog(`${LibWebsocketServer.name}:specs`);

  let server = null;
  const getServerConfig = () => Object.freeze({
    server: {
      host: process.env.WS_HOST,
      port: parseInt(process.env.WS_PORT, 10),
    },
    pathOpts: {
      [Paths.ROOT]: {
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 12,
      },
    },
  });

  before(async () => {
    dotenv.config({
      path: './specs/.env',
    });
    server = new LibWebsocketServer(getServerConfig());

    return await server.start();
  });

  after(() => {
    server.stop();
  });

  it('should start/stop the LibWebsocketServer instance', async () => {
    expect(true).to.be.true;
  });
});
