import BaseProgressBar from './BaseProgressBar';
import Settings from '../Settings';
import { TextLoneliness50, TextLoneliness25, TextLoneliness10, TextLoneliness5, TextLoneliness2, TextLoneliness1 } from '../Text';

export default class LonelinessBar extends BaseProgressBar {
  constructor(game, graphics, x, y, width, height, hud) {
    super(game, graphics, x, y, width, height);

    this.hud = hud;

    const style = { font: `${Settings.HUDFontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.text = this.game.add.text(this.x, this.y, 'loneliness', style);

    this.tick1 = 0;
    this.tick2 = 0;

    this.startTickingLonelinessBar = false;

    this.lastTextShown = 0;

    this.draw();
  }

  preUpdate() {
    if (this.startTickingLonelinessBar) {
      const maxTick1Tick = 100;
      this.tick1 += 1;
      if (this.tick1 > maxTick1Tick) {
        this.tick1 -= maxTick1Tick;
        this.tick2 += 0.01;
      }
      this.progressBarEntity.setPosition(this.tick2);
      this.showLonelinessText();

      if (this.progressBarEntity.getPosition() >= 1) {
        this.game.state.start('gameover');
      }
    }
  }

  showLonelinessText() {
    let textToShow = [];
    if (this.lastTextShown === 0 && this.progressBarEntity.getPosition() >= 0.5) {
      textToShow = TextLoneliness50;
      this.lastTextShown += 1;
    } else if (this.lastTextShown === 1 && this.progressBarEntity.getPosition() >= 0.75) {
      textToShow = TextLoneliness25;
      this.lastTextShown += 1;
    } else if (this.lastTextShown === 2 && this.progressBarEntity.getPosition() >= 0.90) {
      textToShow = TextLoneliness10;
      this.lastTextShown += 1;
    } else if (this.lastTextShown === 3 && this.progressBarEntity.getPosition() >= 0.94) {
      textToShow = TextLoneliness5;
      this.lastTextShown += 1;
    } else if (this.lastTextShown === 4 && this.progressBarEntity.getPosition() >= 0.97) {
      textToShow = TextLoneliness2;
      this.lastTextShown += 1;
    } else if (this.lastTextShown === 5 && this.progressBarEntity.getPosition() >= 0.98) {
      textToShow = TextLoneliness1;
      this.lastTextShown += 1;
    }
    for (let i = 0; i < textToShow.length; i += 1) {
      this.hud.addMessageToQueue(textToShow[i]);
    }
  }

  draw() {
    const offset = 4;
    const offsetY = (this.text.height - this.height) / 5;
    const offsetX = offset + this.text.width;
    this.graphics.beginFill(`0X${Settings.ProgressBarForeground()}`, 1);
    this.graphics.drawRoundedRect(
      this.x + offsetX, this.y + offsetY,
      this.maxWidth, this.height, 2
    );
    if (this.progressBarEntity.getPosition() > 0) {
      const width = (this.maxWidth * this.progressBarEntity.getPosition()) - offset;
      this.graphics.beginFill(`0X${Settings.ProgressBarBackground()}`, 1);
      this.graphics.drawRoundedRect(
        this.x + 2 + offsetX,
        this.y + 2 + offsetY, width, this.height - offset, 2
      );
    }
    this.lastPosition = this.progressBarEntity.getPosition();
  }
}
