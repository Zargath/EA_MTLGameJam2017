import { random } from 'lodash';

import Room from './Room';

const Floor = '';
const Wall = 'W';

export default class Map {
  constructor(width, height, maxRoomCount) {
    this.width = width;
    this.height = height;
    this.maxRoomCount = maxRoomCount;
    this.minRoomSize = 3;
    this.maxRoomSize = 6;
    this.rooms = [];
    this.map = [];

    this.initMap();
    this.placeRooms();
  }

  initMap() {
    for (let i = 0; i < this.height; i++) {
      this.map.push([]);
      for (let j = 0; j < this.width; j++) {
        this.map[i].push(Wall);
      }
    }
  }

  placeRooms() {
    for (let roomCount = 0; roomCount < this.maxRoomCount; roomCount++) {
      const roomWidth = this.minRoomSize + random((this.maxRoomSize - this.minRoomSize) + 1);
      const roomHeight = this.minRoomSize + random((this.maxRoomSize - this.minRoomSize) + 1);

      const xLoc = random(this.width - roomWidth - 1) + 1;
      const yLoc = random(this.height - roomHeight - 1) + 1;

      const newRoom = new Room(xLoc, yLoc, roomHeight, roomWidth);

      let failed = false;
      this.rooms.forEach((r) => {
        if (!newRoom.intersects(r) && newRoom.doesRoomFitOnMap(this.map)) {
          failed = true;
        }
      });

      if (!failed) {
        this.addRoomToMap(newRoom);
        this.rooms.push(newRoom);
      }
    }
  }

  addRoomToMap(room) {
    this.addToMap(room.topCoordinate.x, room.topCoordinate.y, room.height, room.width, Floor);
  }

  addToMap(x, y, width, height, tileType) {
    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        this.map[i][j] = tileType;
      }
    }
  }

  debug() {
    console.log(this.map);
  }
}
