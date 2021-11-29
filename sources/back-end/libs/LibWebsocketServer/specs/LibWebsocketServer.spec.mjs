import util from 'util';
import {
  randomUUID,
} from 'node:crypto';
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
  WebsocketErrorCodes,
} from '@work-shift/lib-websocket-error-codes/WebsocketErrorCodes.mjs';
import {
  LibWebsocketServer,
} from '../LibWebsocketServer.mjs';
import {
  Paths,
} from '../paths/Paths.mjs';

describe('LibWebsocketServer', function describeLibWebsocketServer() {
  const debuglog = util.debuglog(`${LibWebsocketServer.name}:specs`);
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let server = null;
  let serverConfig = null;
  const getServerConfig = () => Object.freeze({
    server: {
      host: process.env.WS_HOST,
      port: parseInt(process.env.WS_PORT, 10),
    },
    pathOpts: {
      [Paths.API]: {
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

  it(`should use the ${Paths.API} route with fake token`, (done) => {
    const fakeToken = randomUUID();
    const connectionString = `ws://${serverConfig.server.host}:${serverConfig.server.port}/${fakeToken}`;
    const client = new WebSocket(connectionString);

    client.binaryType = 'arraybuffer';

    const workDate = new Date();
    const workDateFrom = (new Date(workDate)).setHours(13, 0, 0, 0);
    const workDateTo = (new Date(workDate)).setHours(23, 0, 0, 0);
    const message = {
      op: 'add',
      payload: {
        tss: [
          {
            f: workDateFrom,
            t: workDateTo,
          },
        ],
      },
    };
    const expectedCloseCode = WebsocketErrorCodes.CLOSE_NORMAL;
    const expectedCloseReason = 'bye';

    client.on('open', function clientOpen() {
      client.send(encoder.encode(JSON.stringify(message)));
    });

    client.on('message', (binaryMessage) => {
      const messageObject = JSON.parse(decoder.decode(binaryMessage));

      client.close(expectedCloseCode, expectedCloseReason);

      expect(messageObject).to.deep.equal(message);
    });

    client.on('close', function clientClose(code = null, reason = null) {
      expect(code).to.equal(expectedCloseCode);
      expect(decoder.decode(reason)).to.equal(expectedCloseReason);

      done();
    });
  });

  // it(`should use the ${Paths.REGISTER} route with fake data`, (done) => {
  //   const client = new WebSocket(`ws://${serverConfig.server.host}:${serverConfig.server.port}/register`);

  //   client.binaryType = 'arraybuffer';

  //   const message = {
  //     op: 'register',
  //     payload: {
  //       email: `${randomUUID()}.${randomUUID()}@example.com`,
  //       password: randomUUID(),
  //     },
  //   };
  //   const expectedCloseCode = WebsocketErrorCodes.CLOSE_NORMAL;
  //   const expectedCloseReason = 'bye';

  //   client.on('open', function clientOpen() {
  //     client.send(encoder.encode(JSON.stringify(message)));
  //   });

  //   client.on('message', function handleClientMessage(binaryMessage) {
  //     const messageObject = JSON.parse(decoder.decode(binaryMessage));

  //     client.close(expectedCloseCode, expectedCloseReason);

  //     expect(messageObject).to.deep.equal(message);
  //   });

  //   client.on('close', function handleClientClose(code = null, reason = null) {
  //     expect(code).to.equal(expectedCloseCode);
  //     expect(decoder.decode(reason)).to.equal(expectedCloseReason);

  //     done();
  //   });
  // });

  it(`should use the ${Paths.AUTHENTICATE} route with fake data`, (done) => {
    const client = new WebSocket(`ws://${serverConfig.server.host}:${serverConfig.server.port}/authenticate`);

    client.binaryType = 'arraybuffer';

    const message = {
      op: 'authenticate',
      payload: {
        token: randomUUID(),
      },
    };
    const expectedCloseCode = WebsocketErrorCodes.CLOSE_NORMAL;
    const expectedCloseReason = 'bye';

    client.on('open', function clientOpen() {
      client.send(encoder.encode(JSON.stringify(message)));
    });

    client.on('message', function handleClientMessage(binaryMessage) {
      const messageObject = JSON.parse(decoder.decode(binaryMessage));

      client.close(expectedCloseCode, expectedCloseReason);

      expect(messageObject).to.deep.equal(message);
    });

    client.on('close', function handleClientClose(code = null, reason = null) {
      expect(code).to.equal(expectedCloseCode);
      expect(decoder.decode(reason)).to.equal(expectedCloseReason);

      done();
    });
  });
});
