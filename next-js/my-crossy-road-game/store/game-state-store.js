// game-state-store.js
import { create } from "zustand";
import { InitializeGame } from "@/utils/initializeGame";

const useGameStateStore = create((set) => ({
  // Game state
  score: 0,
  isGameOver: false,

  setGameOver: (isOver) => set({ isGameOver: isOver }),
  resetGame: () => InitializeGame(),
}));

export default useGameStateStore;
