import * as THREE from "three";
import { tileSize } from "@/app/constant";
import Skin from "./Skin";

// Class to create and manage the player 3D model
export default class Player {
  constructor(selectedModel) {
    // Create the main player group
    this.playerContainer = new THREE.Group();

    // Create the player body
    const player = new THREE.Group();

    this.skin = new Skin(selectedModel || "cat");

    // Add player to container
    this.playerContainer.add(player);

    // Add the loaded model to the player group once it's ready
    this.addModelToPlayer();
  }

  // Add the loaded model to the player group
  addModelToPlayer() {
    const interval = setInterval(() => {
      const model = this.skin.getModel();
      if (model) {
        this.playerContainer.children[0].add(model); // Add the model to the player group
        clearInterval(interval); // Stop checking once the model is added
      }
    }, 100); // Check every 100ms
  }

  // Get the THREE.js object
  getModel() {
    return this.playerContainer;
  }

  // Reset the player's position
  resetPosition(logicalPosition = { currentRow: 0, currentTile: 0 }) {
    this.playerContainer.position.x = logicalPosition.currentTile * tileSize;
    this.playerContainer.position.y = logicalPosition.currentRow * tileSize;
    this.playerContainer.children[0].position.z = 0;
  }

  // Update the player's 3D position based on grid coordinates
  updateModelPosition(x, y, z = 0) {
    this.playerContainer.position.x = x;
    this.playerContainer.position.y = y;
    if (z !== undefined) {
      this.playerContainer.children[0].position.z = z;
    }
  }
}
