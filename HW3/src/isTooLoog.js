const isTooLong = (name, len) => {
  let length = 0;
  for (let i = 0; i < name.length; i += 1) {
    if (name.charCodeAt(i) > 256) length += 2;
    else length += 1;
  }
  return length >= len;
};

export default isTooLong;
