import { random, last } from 'lodash';

import Room from './Room';
import TileInfo from './TileInfo';
import Coordinate from './Coordinate';
import GemInfo from './GemInfo';
import { TileTypes, GemTypes } from '../Enum';

export default class TileMap {
  constructor(width, height, maxRoomCount) {
    this.maxRoomCount = maxRoomCount;
    this.minRoomSize = 8;
    this.maxRoomSize = 15;
    this.minGemCount = 16;

    this.width = width;
    this.height = height;
    this.rooms = [];
    this.gems = [];
    this.gemCount = new Map();
    this.map = [];

    this.playerStartLocation = new Coordinate(0, 0);
    this.transporterLocation = new Coordinate(0, 0);

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
    while (this.rooms.length < this.maxRoomCount && tries < 20) {
      const roomWidth = random(this.minRoomSize, this.maxRoomSize);
      const roomHeight = random(this.minRoomSize, this.maxRoomSize);

      const xLoc = random(1, this.width - roomWidth - 1);
      const yLoc = random(1, this.height - roomHeight - 1);

      const newRoom = new Room(xLoc, yLoc, roomHeight, roomWidth);

      let failed = false;
      this.rooms.forEach((r) => {
        if (newRoom.intersects(r)
          && newRoom.x + newRoom.width > this.width
          && newRoom.y + newRoom.height > this.height) {
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
    }
  }

  placeGems() {
    let tries2 = 0;
    do {
      const gemTypeToPlace = this.getNextGemType();
      const roomIndex = random(0, this.rooms.length - 1);
      const room = this.rooms[roomIndex];

      let tries = 0;
      let locInUse = false;
      do {
        const loc = room.getRandomLocInRoom();
        locInUse = this.isLocUsed(loc);

        if (!locInUse) {
          const newGem = new GemInfo({ gemType: gemTypeToPlace, x: loc.x, y: loc.y });
          this.gems.push(newGem);
          const count = this.gemCount.get(gemTypeToPlace) + 1;
          this.gemCount.set(gemTypeToPlace, count);
          locInUse = false;
        } else {
          tries++;
        }
      } while (locInUse && tries < 20);

      tries2++;
    } while (this.gems.length < this.minGemCount && tries2 < this.minGemCount + 20);
  }

  isLocUsed(loc) {
    if (loc.x === this.playerStartLocation.x && loc.y === this.playerStartLocation.y) {
      return true;
    }

    if ((loc.x === this.transporterLocation.x + 1 || loc.x === this.transporterLocation.x) &&
      loc.y === this.transporterLocation.y) {
      return true;
    }

    let gemExists = false;
    this.gems.forEach((gem) => {
      gemExists = loc.x === gem.location.x && loc.y === gem.location.y;
    });

    return gemExists;
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

    this.transporterLocation = room.centerCoordinate;

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
      room.width,
      room.height,
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
