import Settings from '../Settings';

export default class MessageContainer {
  constructor(game, x, y, width, height, message) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.game = game;
    this.words = MessageContainer.splitWords(message);

    this.wordIndex = 0;

    const graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect(this.x, this.y, this.width, this.height);

    const style = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.text = this.game.add.text(this.x, this.y, '', style);
    this.text2 = this.game.add.text(200, 400, '', style);
    this.text.fixedToCamera = true;

    this.game.time.events.repeat(300, this.width, this.nextWord, this);
  }

  nextWord() {
    this.text2.text = this.text.width;
    if (this.words.length > this.wordIndex) {
      this.text.text = `${this.text.text}${this.words[this.wordIndex]} `;
      this.wordIndex += 1;
    }
  }

  static splitWords(text) {
    const words = text.split(' ');
    return words;
  }
}
