import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constant";

export function generateRows(amount) {
  const rows = [];

  for (let i = 0; i < amount; i++) {
    const rowData = generateRowsData();
    rows.push(rowData);
  }

  return rows;
}

function generateRowsData() {
  const element = ["car", "truck", "forest"];
  const type = randomElement(element);
  if (type === "car") return generateCarLaneMetadata();
  if (type === "truck") return generateTruckLaneMetadata();
  if (type === "forest") return generateForestMetadata();
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateForestMetadata() {
  const occupiedTiles = new Set();
  const trees = Array.from({ length: 4 }, () => {
    let tileIndex;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(tileIndex));
    {
      occupiedTiles.add(tileIndex);

      const treeHeight = [20, 45, 60];
      const height = randomElement(treeHeight);

      return { tileIndex, height };
    }
  });

  return { type: "forest", trees };
}

function generateCarLaneMetadata() {
  const carDirection = [true, false];
  const carSpeed = [125, 156, 188];

  const direction = randomElement(carDirection);
  const speed = randomElement(carSpeed);

  const occupiedTiles = new Set();
  const vehicles = Array.from({ length: 3 }, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(initialTileIndex));
    {
      occupiedTiles.add(initialTileIndex - 1);
      occupiedTiles.add(initialTileIndex);
      occupiedTiles.add(initialTileIndex + 1);

      const carColor = [0xa52523, 0xbdb638, 0x78b14b];
      const color = randomElement(carColor);

      return { initialTileIndex, color };
    }
  });

  return { type: "car", direction, speed, vehicles };
}

function generateTruckLaneMetadata() {
  const truckDirection = [true, false];
  const truckSpeed = [125, 156, 188];

  const direction = randomElement(truckDirection);
  const speed = randomElement(truckSpeed);

  const occupiedTiles = new Set();

  const vehicles = Array.from({ length: 2 }, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(initialTileIndex));
    {
      occupiedTiles.add(initialTileIndex - 2);
      occupiedTiles.add(initialTileIndex - 1);
      occupiedTiles.add(initialTileIndex);
      occupiedTiles.add(initialTileIndex + 1);
      occupiedTiles.add(initialTileIndex + 2);

      const truckColor = [0xa52523, 0xbdb638, 0x78b14b];
      const color = randomElement(truckColor);

      return { initialTileIndex, color };
    }
  });

  return { type: "truck", direction, speed, vehicles };
}
