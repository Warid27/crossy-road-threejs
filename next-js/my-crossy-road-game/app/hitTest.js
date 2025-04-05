import * as THREE from "three";
import useMapStore from "@/store/map-store";
import usePlayerStore from "@/store/player-store";
import useGameStateStore from "@/store/game-state-store";

export function hitTest() {
  // Retrieve current state from stores
  const mapStore = useMapStore.getState();
  const { position, getPlayerModel } = usePlayerStore.getState();

  // Get the metadata for the current row
  const currentMetadata = mapStore.getMetadata();
  const row = currentMetadata[position.currentRow];
  if (!row) return; // Exit if the row doesn't exist

  // Check if the row contains vehicles
  if (row.type === "car" || row.type === "truck") {
    // Get the player's bounding box
    const playerModel = getPlayerModel(); // Get the player's Three.js model
    if (!playerModel) throw new Error("Player model is missing");

    const playerBoundingBox = new THREE.Box3().setFromObject(playerModel);

    // Check collisions with each vehicle in the row
    row.vehicles.forEach(({ ref }) => {
      if (!ref) throw new Error("Vehicle reference is missing");

      const vehicleBoundingBox = new THREE.Box3().setFromObject(ref);

      // Detect intersection
      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        // Trigger game-over logic
        triggerGameOver(position.currentRow);
      }
    });
  }
}

function triggerGameOver() {
  const { setGameOver } = useGameStateStore.getState();

  // Update the game state to reflect game-over
  setGameOver(true);
}
