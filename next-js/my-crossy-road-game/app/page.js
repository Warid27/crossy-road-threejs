"use client";
import { useRouter } from "next/navigation";
import useGameStateStore from "@/store/game-state-store";

export default function HomePage() {
  const router = useRouter();
  const { playBackgroundMusic } = useGameStateStore();

  const handleStartGame = () => {
    // Start the background music
    playBackgroundMusic();

    // Navigate to the GameScene
    router.push("/game");
  };

  return (
    <div>
      <h1>Welcome to the Game!</h1>
      <button onClick={handleStartGame}>Play</button>
    </div>
  );
}
