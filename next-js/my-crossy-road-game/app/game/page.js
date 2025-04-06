"use client";
import Main from "../main";
import useGameStateStore from "@/store/game-state-store";
import { movePlayer, setupKeyboardControls } from "../collectUserInput";
import { useEffect, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";
import useAssets from "@/store/asset-store";

export default function Home() {
  const baseAssetUrl = useAssets.getState().baseAssetUrl;

  const [gameKey, setGameKey] = useState(0); // Unique key for the game

  const isGameOver = useGameStateStore((state) => state.isGameOver);
  const score = useGameStateStore((state) => state.score);
  const resetGame = useGameStateStore((state) => state.resetGame);
  const isMuted = useGameStateStore((state) => state.isMuted);
  const pauseBackgroundMusic = useGameStateStore(
    (state) => state.pauseBackgroundMusic
  );
  const toggleMute = useGameStateStore((state) => state.toggleMute);

  const [activeDirection, setActiveDirection] = useState(null);
  const [shouldAnimateScore, setShouldAnimateScore] = useState(false); // State to control animation

  const handleReset = () => {
    resetGame(); // Reset the game state
    setGameKey((prevKey) => prevKey + 1); // Force remount of the Main component
  };

  useEffect(() => {
    // Trigger animation whenever the score changes
    setShouldAnimateScore(true);

    // Reset the animation flag after the animation completes
    const timer = setTimeout(() => {
      setShouldAnimateScore(false);
    }, 300); // Match this duration with the animation duration (0.3s)

    return () => clearTimeout(timer); // Cleanup the timer on unmount or re-render
  }, [score]);

  useEffect(() => {
    if (isGameOver) {
      const gameOverSound = new Audio(
        `${baseAssetUrl}/sound/sfx/game-over.mp3`
      );
      gameOverSound.preload = "auto";
      gameOverSound.volume = 0.5;
      gameOverSound.play();
      pauseBackgroundMusic();
    }
  }, [isGameOver, pauseBackgroundMusic, baseAssetUrl]);

  // Set up keyboard controls
  useEffect(() => {
    const cleanup = setupKeyboardControls(setActiveDirection);
    return cleanup; // Cleanup on unmount
  }, []);

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "3px 5px 0px 0px rgba(0,0,0,0.75)",
    },
    pressed: {
      scale: 0.95,
      boxShadow: "1px 2px 0px 0px rgba(0,0,0,0.75)",
    },
  };

  const resultContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen w-full">
      <Main key={gameKey} />
      <div
        id="controls"
        className="absolute bottom-5 w-full flex justify-center items-end"
      >
        <div className="grid grid-cols-3 gap-2.5 w-[150px]">
          {/* Forward Button */}
          <motion.button
            onClick={() => {
              movePlayer("forward");
              setActiveDirection("forward");
              setTimeout(() => setActiveDirection(null), 200);
            }}
            id="forward"
            aria-label="Move Forward"
            className={`col-span-3 w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
            variants={buttonVariants}
            animate={activeDirection === "forward" ? "pressed" : "idle"}
            transition={{ duration: 0.1 }}
          >
            {`\u25B2`}
          </motion.button>

          {/* Left Button */}
          <motion.button
            onClick={() => {
              movePlayer("left");
              setActiveDirection("left");
              setTimeout(() => setActiveDirection(null), 200);
            }}
            id="left"
            aria-label="Move Left"
            className={`w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
            variants={buttonVariants}
            animate={activeDirection === "left" ? "pressed" : "idle"}
            transition={{ duration: 0.1 }}
          >
            {"\u25C0"}
          </motion.button>

          {/* Backward Button */}
          <motion.button
            onClick={() => {
              movePlayer("backward");
              setActiveDirection("backward");
              setTimeout(() => setActiveDirection(null), 200);
            }}
            id="backward"
            aria-label="Move Backward"
            className={`w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
            variants={buttonVariants}
            animate={activeDirection === "backward" ? "pressed" : "idle"}
            transition={{ duration: 0.1 }}
          >
            {"\u25BC"}
          </motion.button>

          {/* Right Button */}
          <motion.button
            onClick={() => {
              movePlayer("right");
              setActiveDirection("right");
              setTimeout(() => setActiveDirection(null), 200);
            }}
            id="right"
            aria-label="Move Right"
            className={`w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
            variants={buttonVariants}
            animate={activeDirection === "right" ? "pressed" : "idle"}
            transition={{ duration: 0.1 }}
          >
            {"\u25B6"}
          </motion.button>
        </div>
      </div>

      {/* Animated Score Display */}
      <motion.div
        id="score"
        className="absolute top-5 left-5 text-2xl font-bold text-white bg-gradient-to-r from-green-500 to-green-700 px-4 py-2 rounded-lg shadow-md"
        variants={{
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.1, 1], // Scales up slightly and back down
            boxShadow: [
              "0px 4px 6px rgba(0, 0, 0, 0.1)",
              "0px 8px 12px rgba(0, 0, 0, 0.2)",
              "0px 4px 6px rgba(0, 0, 0, 0.1)",
            ], // Adds a glowing effect
            transition: { duration: 0.3 },
          },
        }}
        initial="initial"
        animate={shouldAnimateScore ? "animate" : "initial"} // Trigger animation dynamically
      >
        {score}
      </motion.div>

      {/* Animated Mute Button */}
      <motion.button
        onClick={toggleMute}
        className="cursor-pointer absolute top-5 right-5 text-2xl text-white bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
        whileTap={{ scale: 0.9 }} // Scale down slightly on tap
        whileHover={{ scale: 1.05 }} // Scale up slightly on hover
      >
        {isMuted ? (
          <FaVolumeMute className="text-yellow-300" />
        ) : (
          <FaVolumeUp className="text-yellow-300" />
        )}
      </motion.button>

      {/* Animated Game Over Screen */}
      <motion.div
        id="result-container"
        className={`${
          isGameOver ? "" : "pointer-events-none"
        } absolute w-full h-full top-0 flex items-center justify-center bg-black bg-opacity-75`}
        variants={resultContainerVariants}
        initial="hidden"
        animate={isGameOver ? "visible" : "hidden"}
      >
        <motion.div
          id="result"
          className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 max-w-md text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
        >
          {/* Game Over Title */}
          <motion.h1
            className="text-4xl font-bold text-red-600 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.2, duration: 0.5 },
            }}
          >
            GAME OVER
          </motion.h1>

          {/* Score Display */}
          <motion.p
            className="text-xl text-gray-700 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.4, duration: 0.5 },
            }}
          >
            Your Score:{" "}
            <span id="final-score" className="font-bold text-green-600">
              {score}
            </span>
          </motion.p>

          {/* Retry Button */}
          <motion.button
            onClick={handleReset}
            id="retry"
            className="cursor-pointer bg-gradient-to-r from-red-500 to-red-700 text-white px-12 py-3 rounded-lg font-bold shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            RETRY
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
