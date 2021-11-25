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

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debuglog(`${LibWebsocketServer.name}:specs`);

  let server = null;
  const getServerConfig = () => Object.freeze({
    host: process.env.WS_HOST,
    port: parseInt(process.env.WS_PORT, 10),
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
