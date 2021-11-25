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
import WebSocket from 'ws';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';
import {
  Paths,
} from '../paths/Paths.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debuglog(`${LibWebsocketServer.name}:specs`);
  const encoder = new TextEncoder();

  let server = null;
  let serverConfig = null;
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
    serverConfig = getServerConfig();
    server = new LibWebsocketServer(serverConfig);

    await server.start();
  });

  after(() => {
    server.stop();
  });

  // FIXME: this is a temporary test
  it('should send a binary message', (done) => {
    const client = new WebSocket(`ws://${serverConfig.server.host}:${serverConfig.server.port}`);

    client.binaryType = 'arraybuffer';

    const message = {
      type: 'example-type',
      payload: {
        hello: 'world',
      },
    };

    client.on('open', function clientOpen() {
      const binaryMessage = encoder.encode(JSON.stringify(message));

      client.send(binaryMessage);
    });

    client.on('message', (data) => {
      debuglog({ data });

      client.close(1000, 'bye');
    });

    client.on('close', function clientClose(code = null, reason = null) {
      debuglog({
        code,
      });
      expect(code).to.exist;

      debuglog({
        reason,
      });
      expect(reason).to.exist;

      done();
    });
  });
});
