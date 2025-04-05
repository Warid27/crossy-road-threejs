import useGameStateStore from "@/store/game-state-store";
import useMapStore from "@/store/map-store";
import usePlayerStore from "@/store/player-store";

export const InitializeGame = () => {
  usePlayerStore.getState().initializePlayer();
  useMapStore.getState().initializeMap();
  useGameStateStore.setState({ score: 0, isGameOver: false });
};
