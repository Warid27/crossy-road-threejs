import * as THREE from "three";
import { tileSize } from "@/app/constant";
// Class to create and manage the player 3D model
export default class Player {
  constructor() {
    // Create the main player group
    this.playerContainer = new THREE.Group();

    // Create the player body
    const player = new THREE.Group();

    const geometry = new THREE.BoxGeometry(15, 15, 20);
    const material = new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    });
    const body = new THREE.Mesh(geometry, material);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.z = 10;
    player.add(body);

    // Create the pink cap
    const capGeometry = new THREE.BoxGeometry(2, 4, 2);
    const capMaterial = new THREE.MeshLambertMaterial({
      color: 0xf0619a,
      flatShading: true,
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.castShadow = true;
    cap.receiveShadow = true;
    cap.position.z = 21;
    player.add(cap);

    // Add player to container
    this.playerContainer.add(player);
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
