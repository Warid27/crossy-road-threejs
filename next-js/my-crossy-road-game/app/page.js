"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import useGameStateStore from "@/store/game-state-store";
import useSkinStateStore from "@/store/skin-store";
import SkinSelector from "@/components/SkinSelector";

export default function HomePage() {
  const router = useRouter();

  const { playBackgroundMusic } = useGameStateStore();
  const { updateSkin } = useSkinStateStore();

  // State to track if the music has started
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(0);
  const [direction, setDirection] = useState(0);

  const skins = ["cat", "dog", "lion", "bird"];

  const handleStartGame = () => {
    // Start the background music
    playBackgroundMusic();
    setIsMusicStarted(true); // Update state to show feedback
    updateSkin(skins[selectedSkin]);
    // Navigate to the GameScene after a short delay
    setTimeout(() => {
      router.push("/game");
    }, 500); // Delay to allow the animation to complete
  };

  const handleSelectSkin = (action) => {
    // Set direction based on action
    setDirection(action === "next" ? 1 : -1);

    if (action === "next") {
      setSelectedSkin((prev) => (prev + 1) % skins.length);
    } else if (action === "before") {
      setSelectedSkin((prev) => (prev - 1 + skins.length) % skins.length);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      },
    }),
  };

  // Button hover animation
  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "#2563eb", // darker blue
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      backgroundColor: "#1e40af", // even darker blue
    },
  };

  // Title animation
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
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

      {/* Skin Selection */}
      <div className="flex flex-col items-center mb-8 p-6">
        <motion.h2
          className="text-2xl mb-6 font-bold"
          initial="initial"
          animate="animate"
          variants={titleVariants}
        >
          Select Your Character
        </motion.h2>

        <div className="flex items-center gap-6">
          <motion.button
            onClick={() => handleSelectSkin("before")}
            className="bg-blue-500 px-5 py-3 rounded-lg cursor-pointer text-white"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            aria-label="Previous character"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {"\u25C0"}
          </motion.button>
          <SkinSelector selectedSkin={skins[selectedSkin]} />
          <motion.button
            onClick={() => handleSelectSkin("next")}
            className="bg-blue-500 px-5 py-3 rounded-lg cursor-pointer text-white"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            aria-label="Next character"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {"\u25B6"}
          </motion.button>
        </div>

        <motion.div
          className="mt-6 px-6 py-2 bg-blue-600 rounded-full text-white text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.5 },
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#2563eb",
          }}
        >
          {skins[selectedSkin]} selected
        </motion.div>
      </div>

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
