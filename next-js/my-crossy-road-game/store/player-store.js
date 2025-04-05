import { create } from "zustand";
import { endsUpInValidPosition } from "../utils/endsUpInValidPosition";
import useMapStore from "./map-store";
import useGameStateStore from "./game-state-store";
import Player from "../components/Player";
import sfxSound from "@/utils/sound";

const usePlayerStore = create((set, get) => ({
  // Player instance
  playerInstance: new Player(),

  // Player position state
  position: {
    currentRow: 0,
    currentTile: 0,
  },

  // Queue for upcoming moves
  movesQueue: [],

  // Initialize/reset the player
  initializePlayer: () => {
    const { playerInstance } = get();

    // Reset the 3D model position
    playerInstance.resetPosition({ currentRow: 0, currentTile: 0 });

    // Reset the logical position and queue
    set({
      position: {
        currentRow: 0,
        currentTile: 0,
      },
      movesQueue: [],
    });
  },

  // Add a move to the queue if it's valid
  queueMove: (direction) => {
    const { position, movesQueue } = get();
    const isValidMove = endsUpInValidPosition(
      {
        rowIndex: position.currentRow,
        tileIndex: position.currentTile,
      },
      [...movesQueue, direction]
    );

    if (!isValidMove) return;

    set((state) => ({
      movesQueue: [...state.movesQueue, direction],
    }));
  },

  // Process a completed movement step
  stepCompleted: () => {
    const { position, movesQueue } = get();
    const gameState = useGameStateStore.getState();
    const mapStore = useMapStore.getState();

    if (movesQueue.length === 0 || gameState.isGameOver) return;

    const direction = movesQueue[0];
    const newPosition = { ...position };
    switch (direction) {
      case "forward":
        newPosition.currentRow += 1;
        break;
      case "backward":
        newPosition.currentRow -= 1;
        break;
      case "left":
        newPosition.currentTile -= 1;
        break;
      case "right":
        newPosition.currentTile += 1;
        break;
      default:
        return currentPosition;
    }

    const rows = mapStore.getMetadata();
    const currentRow = rows[newPosition.currentRow];
    sfxSound(currentRow);
    // Check if we need to add more rows
    if (newPosition.currentRow > rows.length - 10) mapStore.addRows(10);

    // Update the score display
    useGameStateStore.setState({
      score: newPosition.currentRow, // Set score to currentRow value
    });

    set({
      position: newPosition,
      movesQueue: movesQueue.slice(1),
    });
  },

  // Get the THREE.js model for rendering
  getPlayerModel: () => get().playerInstance.getModel(),
}));

export default usePlayerStore;
