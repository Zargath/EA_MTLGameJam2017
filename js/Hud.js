import MessageContainer from './ui/MessageContainer';
import ProgressBar from './ui/ProgressBar';
import Clock from './ui/Clock';

export default class Hud {
  constructor(game) {
    this.game = game;
    this.graphics = this.game.add.graphics(0, 0);
    this.createTopAnchor();
    this.clock = new Clock(this.game, this.graphics, 600, 40 / 5);
    this.pb = new ProgressBar(this.game, this.graphics, 10, 10, 300, 12);
    this.mc = new MessageContainer(this.game, this.graphics, 200, 380, 400, 200, 'The basic reasoning is that getting Music, TV Shows, or Movies for free by downloading leads to less sales. This is flawed logic as many people, who download things for free dont have the money to pay for it. Not only that, but I believe that more exposure (IE: more people viewing your material) will lead to better numbers. Yes there are some people who Im sure as everything abuse this system (of online sharing), but ultimately', true);
    this.clock.fixedToCamera(true);
    this.mc.fixedToCamera(true);
    this.pb.fixedToCamera(true);
  }

  createTopAnchor() {
    this.graphics.beginFill(0x000000);
    this.graphics.drawRect(0, 0, this.game.width, 40);
    this.graphics.fixedToCamera = true;
  }

  update() {
    this.mc.update();
    this.pb.update();
    this.clock.update();
  }
}
