export const guid = () => Math.random().toString(36).substr(2, 16);

export const radiansToDegrees = radians => (radians * 180) / Math.PI;
