
export default class Enum {
  constructor() {
    this.Colors = {
      RED: Symbol('red'),
      BLUE: Symbol('blue'),
      GREEN: Symbol('green'),
      YELLOW: Symbol('yellow')
    };
    Object.freeze(this.Colors);
  }

  Colors() {
    return this.Colors;
  }
}
