import {
  AsyncLocalStorage,
} from 'node:async_hooks';

const als = new AsyncLocalStorage();
const tokenRE = /^\/api\/(?<token>.+)/is;

const extractToken = async (debuglog = () => {}) => {
  const store = als.getStore();

  if (store.isAborted === true) {
    throw new Error('request has been aborted');
  }

  store.token.value = tokenRE.exec(store.url)?.groups?.token;

  debuglog(`token extracted from ${store.url} is "${store.token.value}"`);
};

const validateToken = async (debuglog = () => {}) => {
  const store = als.getStore();

  if (store.isAborted === true) {
    throw new Error('request has been aborted');
  }

  // TODO: this should actually verify the token
  store.token.isValid = true;

  debuglog(`token ${store.token.value} is ${store.token.isValid ? 'valid' : 'invalid'}`);
};

export function handleUpgrade(res, req, context) {
  const store = {
    isAborted: false,
    url: req.getUrl(),
    sec: {
      secWebSocketKey: req.getHeader('sec-websocket-key'),
      secWebSocketProtocol: req.getHeader('sec-websocket-protocol'),
      secWebSocketExtensions: req.getHeader('sec-websocket-extensions'),
    },
    res,
    req,
    context,
    token: {
      value: null,
      isValid: false,
    },
  };

  store.res.onAborted(() => {
    store.isAborted = true;
  });

  als.run(store, async () => {
    this.debuglog(`handleUpgrade @ ${store.url}`);

    try {
      await extractToken(this.debuglog);
      await validateToken(this.debuglog);

      if (store.isAborted === true) {
        return;
      }

      if (store.token.isValid === false) {
        return;
      }

      store.res.upgrade(
        {
          url: store.url,
        },
        store.sec.secWebSocketKey,
        store.sec.secWebSocketProtocol,
        store.sec.secWebSocketExtensions,
        store.context,
      );
    } catch (requestAbortedError) {
      this.debuglog({
        requestAbortedError,
      });
    }
  });
}
