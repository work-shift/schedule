// https://github.com/Luka967/websocket-close-codes

export const WebsocketErrorCodes = Object.freeze({
  CLOSE_NORMAL: 1000,
  CLOSE_UNSUPPORTED: 1003, // binary-only endpoint received text frame
  POLICY_VIOLATION: 1008,
  UNSUPPORTED_PAYLOAD: 1007,
});
