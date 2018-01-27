import { random, last } from 'lodash';

import Room from './Room';

const Floor = '1';
const Wall = '0';

export default class Map {
  constructor(width, height, maxRoomCount) {
    this.maxRoomCount = maxRoomCount;
    this.minRoomSize = 9;
    this.maxRoomSize = 15;

    this.width = width + this.maxRoomSize;
    this.height = height + this.maxRoomSize;
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
    let tries = 0;
    while (this.rooms.length < this.maxRoomCount) {
      const roomWidth = this.minRoomSize + random((this.maxRoomSize - this.minRoomSize) + 1);
      const roomHeight = this.minRoomSize + random((this.maxRoomSize - this.minRoomSize) + 1);

      const xLoc = random(this.width - this.maxRoomSize - roomWidth - 1) + 1;
      const yLoc = random(this.height - this.maxRoomSize - roomHeight - 1) + 1;

      const newRoom = new Room(xLoc, yLoc, roomHeight, roomWidth);

      let failed = false;
      this.rooms.forEach((r) => {
        if (newRoom.intersects(r)) {
          failed = true;
        }
      });

      if (!failed) {
        this.addRoomToMap(newRoom);
        this.connectRooms(newRoom, last(this.rooms));
        this.rooms.push(newRoom);
      } else {
        tries++;
      }

      // Hack to avoid infinite loop ;)
      if (tries >= 20) {
        break;
      }
    }
  }

  connectRooms(room1, room2) {
    if (room2 === null || room2 === undefined) {
      return;
    }

    const statingX = Math.min(room1.centerCoordinate.x, room2.centerCoordinate.x);
    const endingX = Math.max(room1.centerCoordinate.x, room2.centerCoordinate.x);

    for (let x = statingX; x <= endingX; x++) {
      this.addFloorToMap(x, room1.centerCoordinate.y);
    }

    const statingY = Math.min(room1.centerCoordinate.y, room2.centerCoordinate.y);
    const endingY = Math.max(room1.centerCoordinate.y, room2.centerCoordinate.y);

    for (let y = statingY; y <= endingY; y++) {
      this.addFloorToMap(room2.centerCoordinate.x, y);
    }
  }

  addFloorToMap(x, y) {
    this.addToMap(x, y, 1, 1, Floor);
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

  getCSV() {
    const lineArray = [];
    this.map.forEach((infoArray) => {
      const line = infoArray.join(',');
      lineArray.push(line);
    });

    return lineArray.join('\n');
  }

  debug() {
    console.log(`Room Count: ${this.rooms.length}`);
    console.table(this.map);
  }
}
