import ProgressBarEntity from '../Entities/ProgressBarEntity';

export default class ProgressBar {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.width = 10;
    this.progressBarEntity = new ProgressBarEntity(1, true);

    this.x = x;
    this.y = y;
    this.maxWidth = width;
    this.height = height;

    const rr = this.game.add.graphics(100, 100);
    rr.beginFill('0X00FFFF', 1);
    rr.drawRoundedRect(this.x, this.y, this.maxWidth, this.height, 2);
    this.rr2 = this.game.add.graphics(100, 100);
    this.rr2.beginFill('0XFFFF00', 1);
    this.update();
  }

  update() {
    const offset = 5;
    if (this.progressBarEntity.getPosition() > 0) {
      const width = (this.maxWidth * this.progressBarEntity.getPosition()) - offset;
      this.rr2.drawRoundedRect(this.x + 2, this.y + 2, width, this.height - offset, 2);
    }
  }
}
