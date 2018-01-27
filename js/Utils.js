export const guid = () => Math.random().toString(36).substr(2, 16);

export const radiansToDegrees = radians => (radians * 180) / Math.PI;

export const leftPadZero = (amount, str) => {
  const text = str;
  let pad = '';
  for (let i = str.toString().length; i < amount; i += 1) {
    pad += '0';
  }
  return `${pad}${text}`;
};
