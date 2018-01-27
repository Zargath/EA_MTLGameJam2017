export default class GameObject {
  constructor() {
    if (this.constructor === GameObject) { throw new Error('Cannot instantiate Base Class'); }
  }
}
