import util from 'util';
import {
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';

import {
  WebsocketErrorCodes,
} from '../WebsocketErrorCodes.mjs';

const debuglog = util.debuglog('WebsocketErrorCodes:specs');

describe('WebsocketErrorCodes', () => {
  it('should check WebsocketErrorCodes exist and non-empty', async () => {
    expect(WebsocketErrorCodes).to.exist;
    expect(WebsocketErrorCodes).to.not.be.empty;
  });
});
