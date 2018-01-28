import Settings from '../../Settings';

export default class Gameover extends Phaser.State {
  constructor() {
    super();

  }

  init() {

  }

  create() {

    const style = { font: `${Settings.GameoverFontSize()}px ${Settings.FontStyle()}`, fill: Settings.GameoverFontColor() };
    const style2 = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.GameoverFontColor() };
    const style3 = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.text = this.game.add.text(0,0, 'Gameover', style);
    this.text.x = (this.game.width - this.text.width) / 2;
    this.text.y = (this.game.height - this.text.height) / 2;
    this.text.fixedToCamera = true;

    this.text2 = this.game.add.text(0,0, 'And you were never heard from again', style2)
    this.text2.x = (this.game.width - this.text2.width) / 2;
    this.text2.y = this.text.y + this.text.height;
    this.text2.fixedToCamera = true;

    this.text3 = this.game.add.text(0,0, 'End of Transmission', style2)
    this.text3.x = (this.game.width - this.text3.width) / 2;
    this.text3.y = this.text2.y + this.text2.height;
    this.text3.fixedToCamera = true;

    this.text4 = this.game.add.text(0,0, 'press x to restart', style3);
    this.text4.y = this.game.height - this.text4.height;
    this.text4.fixedToCamera = true;

    this.text4Visible = true;

    this.timer = this.game.time.create(true);
    this.messageTimedEvent = this.timer.loop(500, this.flickerText, this);
    this.timer.start();

    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
  }

  flickerText() {
    this.text4Visible = !this.text4Visible;
    this.text4.alpha = this.text4Visible ? 1 : 0;
  }

  render() {

  }

  update() {
    if(this.xKey.isDown) {
			this.restartGame();
		}
  }

  restartGame() {
    this.game.state.start('Level');
  }
}
