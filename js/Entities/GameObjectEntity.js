export default class GameObjectEntity {
  constructor() {
    if (this.constructor === GameObjectEntity) { throw new Error('Can not instantiate Base Class'); }
  }
}
