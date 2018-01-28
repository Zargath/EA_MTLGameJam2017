import { random, last, every } from 'lodash';

import Room from './Room';
import TileInfo from './TileInfo';
import Coordinate from './Coordinate';
import GemInfo from './GemInfo';
import { TileTypes, GemTypes } from '../Enum';

export default class TileMap {
  constructor(width, height, maxRoomCount) {
    this.maxRoomCount = maxRoomCount;
    this.minRoomSize = 9;
    this.maxRoomSize = 15;
    this.minGemPerColor = 2;
    this.minGemCount = 20;

    this.width = width + this.maxRoomSize;
    this.height = height + this.maxRoomSize;
    this.rooms = [];
    this.gems = [];
    this.gemCount = new Map();
    this.map = [];

    this.playerStartLocation = new Coordinate(0, 0);

    this.initMap();
    this.initGemCount();

    this.placeRooms();
    this.placeGems();

    this.setPlayerStartLocation();
  }

  initMap() {
    for (let i = 0; i < this.height; i++) {
      this.map.push([]);
      for (let j = 0; j < this.width; j++) {
        this.map[i].push(new TileInfo({ tileType: TileTypes.WALL }));
      }
    }
  }

  initGemCount() {
    Object.values(GemTypes).forEach((gemType) => {
      this.gemCount.set(gemType, 0);
    });
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

  placeGems() {
    do {
      const gemTypeToPlace = this.getNextGemType();
      const roomIndex = random(0, this.rooms.length - 1);
      const room = this.rooms[roomIndex];

      let locInUse = false;
      do {
        const loc = room.getRandomLocInRoom();
        locInUse = this.isLocUsed(loc);

        if (!locInUse) {
          this.gems.push(new GemInfo({ gemType: gemTypeToPlace, x: loc.x, y: loc.y }));
          const count = this.gemCount.get(gemTypeToPlace) + 1;
          this.gemCount.set(gemTypeToPlace, count);
        }
      } while (locInUse);
    } while (this.getTotalGemCount() < this.minGemCount);
  }

  getTotalGemCount() {
    let totalGemCount = 0;
    this.gemCount.forEach((value) => { totalGemCount += value; });

    return totalGemCount;
  }

  isLocUsed(loc) {
    if (loc.x === this.playerStartLocation.x && loc.y === this.playerStartLocation.y) {
      return true;
    }

    return !every(this.gems, (gem => gem.location.x !== loc.x && gem.location.y !== loc.y));
  }

  getNextGemType() {
    let lowestType = GemTypes.SILVER;
    let lowestValue = this.gemCount.get(GemTypes.SILVER);
    this.gemCount.forEach((value, key) => {
      if (value < lowestValue) {
        lowestType = key;
        lowestValue = value;
      }
    });

    return lowestType;
  }

  setPlayerStartLocation() {
    const roomIndex = random(0, this.rooms.length - 1);
    const room = this.rooms[roomIndex];

    // this.playerStartLocation = this.rooms[roomIndex].centerCoordinate;

    let locInUse = false;
    do {
      const loc = room.getRandomLocInRoom();
      locInUse = this.isLocUsed(loc);

      if (!locInUse) {
        this.playerStartLocation = loc;
      }
    } while (locInUse);
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
    this.addToMap(x, y, 2, 2, new TileInfo({ tileType: TileTypes.FLOOR }));
  }

  addRoomToMap(room) {
    this.addToMap(
      room.topCoordinate.x,
      room.topCoordinate.y,
      room.height,
      room.width,
      new TileInfo({ tileType: TileTypes.FLOOR })
    );
  }

  addToMap(x, y, width, height, tile) {
    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        this.map[i][j] = tile;
      }
    }
  }

  getCSV() {
    const lineArray = [];
    this.map.forEach((infoArray) => {
      const line = infoArray.map(element => element.spriteIndex).join(',');
      lineArray.push(line);
    });

    return lineArray.join('\n');
  }

  debug() {
    console.log(`Room Count: ${this.rooms.length}`);
    console.table(this.map);
  }
}
