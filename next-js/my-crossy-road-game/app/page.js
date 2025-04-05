"use client";
import { useRouter } from "next/navigation";
import useGameStateStore from "@/store/game-state-store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const { playBackgroundMusic } = useGameStateStore();

  // State to track if the music has started
  const [isMusicStarted, setIsMusicStarted] = useState(false);

  const handleStartGame = () => {
    // Start the background music
    playBackgroundMusic();
    setIsMusicStarted(true); // Update state to show feedback

    // Navigate to the GameScene after a short delay
    setTimeout(() => {
      router.push("/game");
    }, 500); // Delay to allow the animation to complete
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-600 to-purple-700 text-white">
      {/* Title */}
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        }}
      >
        Welcome to the Game!
      </motion.h1>

      {/* Play Button */}
      <motion.button
        onClick={handleStartGame}
        className="relative cursor-pointer bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-lg text-2xl font-bold shadow-md overflow-hidden"
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Start the game"
      >
        {/* Button Text */}
        <span className="relative z-10">Play</span>

        {/* Background Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-white opacity-20 rounded-lg"
          initial={{ scale: 0 }}
          animate={{
            scale: isMusicStarted ? 1 : 0,
            transition: { duration: 0.5 },
          }}
        />
      </motion.button>

      {/* Music Feedback */}
      {isMusicStarted && (
        <motion.p
          className="mt-4 text-lg text-green-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
        >
          Music started! Redirecting to the game...
        </motion.p>
      )}
    </div>
  );
}
