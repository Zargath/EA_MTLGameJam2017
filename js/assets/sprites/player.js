import Character from './character';

const velocity = 200;

export default class Player extends Character {
  constructor({ game, x, y }) {
    super({ game, x, y, key: 'warrior_m', frame: 6 });

    this.game = game;

    this.setupPlayer();
  }

  update() {
    this.body.velocity.set(0);

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -velocity;
      this.play('left');
    }
    else if (this.cursors.right.isDown) {
      this.body.velocity.x = velocity;
      this.play('right');
    }
    else if (this.cursors.up.isDown) {
      this.body.velocity.y = -velocity;
      this.play('up');
    }
    else if (this.cursors.down.isDown) {
      this.body.velocity.y = velocity;
      this.play('down');
    }
    else {
      this.animations.stop();
    }
  }

  setupPlayer() {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(32, 32, 2, 1);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
}
