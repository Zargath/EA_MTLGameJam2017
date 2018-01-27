export default class BaseDrawableObject {
  constructor(game, graphics) {
    this.game = game;
    this.graphics = graphics;
    if (this.constructor === BaseDrawableObject) { throw new Error('Can not instantiate Base Class'); }
  }

  // Defines a method that must be overridden
  /*eslint-disable */
  fixedToCamera(fixedToCamera) {
    throw new Error('You have to implement fixedToCamera in every class that extends BaseDrawableObject');
  }
  /* eslint-enable */
}
