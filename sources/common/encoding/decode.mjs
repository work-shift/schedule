const encoder = new TextEncoder();

// eslint-disable-next-line no-unused-vars
export const decode = (binaryString, debuglog = () => {}) => encoder.encode(atob(binaryString));
