import Queue from '../DataStorage/Queue';

export default class MessageManager {
  constructor({ game, hud }) {
    this.game = game;
    this.hud = hud;
    this.messageQueue = new Queue();
  }

  QueueMessage(message) {
    this.messageQueue.enqueue(message);
  }
}
