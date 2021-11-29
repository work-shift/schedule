export const encode = (binaryArray, debuglog = () => {}) => {
  const result = btoa(binaryArray);

  debuglog({
    result,
  });

  return result;
};
