import {
  describe,
  it,
} from 'mocha';
import {
  expect,
} from 'chai';
import {
  inspectlog,
} from '../inspectlog.mjs';

describe(inspectlog.name, function describeInspectLog() {
  it('is a dummy test', async function dummyTest() {
    inspectlog('inspectlog')({
      inspect: 'log',
    });

    return expect(true).to.be.true;
  });
});
