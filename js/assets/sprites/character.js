import Phaser from 'Phaser';

export default class character extends Phaser.Sprite {
  constructor({ game, x, y, key, frame }) {
    super(game, x, y, key, frame);

    this.createAnnimations();
  }

  createAnnimations() {
    this.animations.add('left', [9, 10, 11], 10, true);
    this.animations.add('right', [3, 4, 5], 10, true);
    this.animations.add('up', [0, 1, 2], 10, true);
    this.animations.add('down', [6, 7, 8], 10, true);
  }
}