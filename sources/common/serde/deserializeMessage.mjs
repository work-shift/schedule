// eslint-disable-next-line no-unused-vars
export const deserializeMessage = async (binaryMessage = null, debuglog = () => {}) => {
  if (binaryMessage === null) {
    throw ReferenceError('binaryMessage is undefined');
  }
};
