import Settings from './Settings';
import MessageContainer from './ui/MessageContainer';
// import ProgressBar from './ui/ProgressBar';

export default class Hud {
  constructor(game) {
    this.game = game;
    // this.initialize();
    // this.pb = new ProgressBar(game, 300, 300, 300, 30);
    this.mc = new MessageContainer(game, 200, 380, 400, 200, 'The basic reasoning is that getting Music, TV Shows, or Movies for free by downloading leads to less sales. This is flawed logic as many people, who download things for free dont have the money to pay for it. Not only that, but I believe that more exposure (IE: more people viewing your material) will lead to better numbers. Yes there are some people who Im sure as everything abuse this system (of online sharing), but ultimately', true);
  }

  update() {
    this.mc.update();
  }

  initialize() {
    const style = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    const text = this.game.add.text(344, 292, 'Hello Global Game Jam!', style);
    const text2 = this.game.add.text(240, 402, 'Loneliness meter', style);
    text2.fixedToCamera = true;
    text.fixedToCamera = true;
  }
}
