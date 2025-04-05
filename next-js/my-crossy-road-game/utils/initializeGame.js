import useGameStateStore from "@/store/game-state-store";
import useMapStore from "@/store/map-store";
import usePlayerStore from "@/store/player-store";

export const InitializeGame = () => {
  // Initialize the map
  useMapStore.getState().initializeMap();

  // Initialize the player
  usePlayerStore.getState().initializePlayer();

  // Reset the game state
  useGameStateStore.setState({
    score: 0,
    isGameOver: false,
  });
  const { playBackgroundMusic } = useGameStateStore.getState();
  playBackgroundMusic();
};
