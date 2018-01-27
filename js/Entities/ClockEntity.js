export default class ClockEntity {
  constructor(game) {
    this.game = game;
    this.secondes = 0;
    this.minutes = 0;
    this.initialStartTime = this.game.time.time;
  }

  getElapsedTimeInSeconds() {
    return this.game.time.time - this.initialStartTime;
  }
}
