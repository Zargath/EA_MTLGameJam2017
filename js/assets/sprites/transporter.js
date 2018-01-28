import Phaser from 'Phaser';

export default class transporter extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'transporter');

    this.isPlayerCollided = false;
    this.setupTransporter();
  }

  setupTransporter() {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(64, 32, 0, 41);
    this.body.immovable = true;
  }
}