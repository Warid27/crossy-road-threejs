import { create } from "zustand";
import { InitializeGame } from "@/utils/initializeGame";
import useAssets from "./asset-store";

const baseAssetUrl = useAssets.getState().baseAssetUrl;

// Create the audio object and preload it
const bgSound =
  typeof window !== "undefined"
    ? new Audio(`${baseAssetUrl}/sound/music/Pixel Rush.mp3`)
    : null;

if (bgSound) {
  bgSound.preload = "auto";
  bgSound.loop = true; // Optional: Loop the background music
  bgSound.muted = true; // Start muted to comply with autoplay policies
}

const useGameStateStore = create((set, get) => ({
  // Game state
  score: 0,
  isGameOver: false,
  isMuted: true,

  // Actions
  setScore: (newScore) => set({ score: newScore }),
  setGameOver: (isOver) => set({ isGameOver: isOver }),
  resetGame: () => {
    InitializeGame();
    set({ isMuted: true });
  },

  playBackgroundMusic: () => {
    const { isMuted } = get();
    if (bgSound && !bgSound.paused) return; // Prevent multiple plays

    if (!isMuted) {
      bgSound.volume = 1; // Ensure volume is set to full if not muted
      bgSound.play().catch((error) => {
        console.warn("Autoplay was blocked:", error);
      });
    }
  },

  pauseBackgroundMusic: () => {
    bgSound?.pause();
  },
  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;

    if (!bgSound) {
      console.warn("Audio object is not available.");
      return;
    }

    bgSound.muted = newMutedState;
    bgSound.volume = newMutedState ? 0 : 1;

    if (!newMutedState) {
      // Attempt to play the audio if unmuting
      bgSound.play().catch((error) => {
        console.error("Failed to play audio:", error);
        alert("Please interact with the page to enable audio.");
      });
    }

    set({ isMuted: newMutedState });
  },
}));

export default useGameStateStore;
