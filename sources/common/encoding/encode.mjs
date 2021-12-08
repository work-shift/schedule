const decoder = new TextDecoder('utf8');

// eslint-disable-next-line no-unused-vars
export const encode = (binaryArray, debuglog = () => {}) => btoa(decoder.decode(Uint8Array.from(binaryArray)));
