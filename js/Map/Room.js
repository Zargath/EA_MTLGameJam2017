import { random } from 'lodash';

import Coordinate from './Coordinate';

export default class Room {
  constructor(locX, locY, height, width) {
    this.topCoordinate = new Coordinate(locX, locY);
    this.bottomCoordinate = new Coordinate(locX + width, locY + height);

    this.height = height;
    this.width = width;

    this.centerCoordinate = new Coordinate(
      Math.floor((this.topCoordinate.x + this.bottomCoordinate.x) / 2),
      Math.floor((this.topCoordinate.y + this.bottomCoordinate.y) / 2)
    );
  }

  intersects(room) {
    return this.topCoordinate.x <= room.bottomCoordinate.x &&
      this.bottomCoordinate.x >= room.topCoordinate.x &&
      this.topCoordinate.y <= room.bottomCoordinate.y &&
      this.bottomCoordinate.y >= room.topCoordinate.y;
  }

  getRandomLocInRoom() {
    const x = random(this.topCoordinate.x + 1, this.bottomCoordinate.x - 1);
    const y = random(this.topCoordinate.y + 1, this.bottomCoordinate.y - 1);

    return new Coordinate(x, y);
  }
}
