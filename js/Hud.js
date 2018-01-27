import Settings from './Settings';
import MessageContainer from './ui/MessageContainer';
// import ProgressBar from './ui/ProgressBar';

export default class Hud {
  constructor(game) {
    this.game = game;
    // this.initialize();
    // this.pb = new ProgressBar(game, 300, 300, 300, 30);
    const mc = new MessageContainer(game, 50, 50, 400, 200, 'leoff erfjerf oerfj eroin oeifn reofiwe doedj wofijer foirf oifw eodiwen oiewnd weoidnwe doiewnd iowedn weoidn weoidnwe doiwend iowedn we');
  }


  initialize() {
    const style = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    const text = this.game.add.text(344, 292, 'Hello Global Game Jam!', style);
    const text2 = this.game.add.text(240, 402, 'Loneliness meter', style);
    text2.fixedToCamera = true;
    text.fixedToCamera = true;
  }
}
