import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";
import { Road } from "./Road";
import { Car } from "./Car";
import { Truck } from "./Truck";

export default class GameMap {
  constructor() {
    // Create the main map container
    this.mapGroup = new THREE.Group();
    this.rowsMetadata = [];
  }

  // Get the THREE.js group for rendering
  getMapModel() {
    return this.mapGroup;
  }

  // Get the metadata
  getMetadata() {
    return this.rowsMetadata;
  }

  // Clear the map
  clear() {
    this.rowsMetadata = [];
    this.mapGroup.remove(...this.mapGroup.children);
  }

  // Add rows based on the provided metadata
  addRowsFromMetadata(newMetadata) {
    const startIndex = this.rowsMetadata.length;

    // Add new metadata
    this.rowsMetadata.push(...newMetadata);

    // Create and add new rows
    newMetadata.forEach((rowData, index) => {
      const rowIndex = startIndex + index + 1;
      let row;

      switch (rowData.type) {
        case "forest":
          row = Grass(rowIndex);
          rowData.trees.forEach((treeData) => {
            const tree = Tree(treeData.tileIndex, treeData.height);
            row.add(tree);
          });
          break;
        case "car":
          row = Road(rowIndex);
          rowData.vehicles.forEach((vehicle) => {
            const car = Car(
              vehicle.initialTileIndex,
              rowData.direction,
              vehicle.color
            );
            vehicle.ref = car;
            row.add(car);
          });
          break;
        case "truck":
          row = Road(rowIndex);
          rowData.vehicles.forEach((vehicle) => {
            const truck = Truck(
              vehicle.initialTileIndex,
              rowData.direction,
              vehicle.color
            );
            vehicle.ref = truck;
            row.add(truck);
          });
          break;
        default:
          row = Grass(rowIndex);
          break;
      }

      if (row) {
        this.mapGroup.add(row);
      }
    });
  }
}
