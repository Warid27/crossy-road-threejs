"use client";
import Main from "./main";
import useGameStateStore from "@/store/game-state-store";
import { movePlayer, setupKeyboardControls } from "./collectUserInput";
import { useEffect } from "react";

export default function Home() {
  const isGameOver = useGameStateStore((state) => state.isGameOver);
  const score = useGameStateStore((state) => state.score);
  const resetGame = useGameStateStore((state) => state.resetGame);

  // Set up keyboard controls
  useEffect(() => {
    const cleanup = setupKeyboardControls();
    return cleanup; // Cleanup on unmount
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <Main />
      <div
        id="controls"
        className="absolute bottom-5 w-full flex justify-center items-end"
      >
        <div className="grid grid-cols-3 gap-2.5 w-[150px]">
          <button
            onClick={() => movePlayer("forward")}
            id="forward"
            aria-label="Move Forward"
            className="col-span-3 w-full h-10 bg-white border border-gray-300 shadow-[3px_5px_0px_0px_rgba(0,0,0,0.75)] cursor-pointer outline-none"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {`\u25B2`}
          </button>
          <button
            onClick={() => movePlayer("left")}
            id="left"
            aria-label="Move Left"
            className="w-full h-10 bg-white border border-gray-300 shadow-[3px_5px_0px_0px_rgba(0,0,0,0.75)] cursor-pointer outline-none"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {"\u25C0"}
          </button>
          <button
            onClick={() => movePlayer("backward")}
            id="backward"
            aria-label="Move Backward"
            className="w-full h-10 bg-white border border-gray-300 shadow-[3px_5px_0px_0px_rgba(0,0,0,0.75)] cursor-pointer outline-none"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {"\u25BC"}
          </button>
          <button
            onClick={() => movePlayer("right")}
            id="right"
            aria-label="Move Right"
            className="w-full h-10 bg-white border border-gray-300 shadow-[3px_5px_0px_0px_rgba(0,0,0,0.75)] cursor-pointer outline-none"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {"\u25B6"}
          </button>
        </div>
      </div>
      <div
        id="score"
        className="absolute top-5 left-5 text-2xl text-white bg-green-500 px-3  py-1"
      >
        {score}
      </div>
      <div
        id="result-container"
        className={`absolute w-full h-full top-0 flex items-center justify-center ${
          isGameOver ? "visible" : "invisible"
        }`}
      >
        <div id="result" className="flex flex-col items-center bg-white p-5">
          <h1>Game Over</h1>
          <p>
            Your Score: <span id="final-score">{score}</span>
          </p>
          <button
            onClick={resetGame}
            id="retry"
            className="bg-red-500 px-12 py-5 font-inherit cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
