import util from 'util';

const logs = new Map();

export const inspectlog = (tag = '*') => {
  if (logs.has(tag) === false) {
    logs.set(tag, (...args) => {
      util.debuglog(tag)(util.inspect(...args, {
        depth: Infinity,
        colors: true,
        breakLength: 160,
      }));
    });
  }

  return logs.get(tag);
};
