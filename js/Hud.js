import Settings from './Settings';

export default class Hud {
  constructor({ game }) {
    this.game = game;
    this.initialize();
  }

  initialize() {
    const style = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    const text = this.game.add.text(344, 292, 'Hello Global Game Jam!', style);
    text.fixedToCamera = true;
  }
}
