import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { createRenderer } from "../components/Renderer";
import { Camera } from "../components/Camera";
import { createGrid } from "../utils/Grid";
import { DirectionalLight } from "../components/DirectionalLight";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import "./collectUserInput";
import usePlayerStore from "@/store/player-store";
import useMapStore from "@/store/map-store";
import useGameStateStore from "@/store/game-state-store";
import { InitializeGame } from "@/utils/initializeGame";

export default function Main() {
  const canvasRef = useRef(null);
  useEffect(() => {
    // Initialize the game first
    InitializeGame();

    // Get models from store
    const player = usePlayerStore.getState().getPlayerModel();
    const map = useMapStore.getState().getMapModel();
    const canvas = canvasRef.current;

    if (!canvas) throw new Error("Canvas not found");
    if (!player || !map) throw new Error("Player or map model not initialized");

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    scene.add(player);
    scene.add(map);

    const grid = createGrid();
    scene.add(grid);

    // Use the same lighting setup as the original
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    player.add(ambientLight); // Keep this attached to player as in original

    const dirLight = new DirectionalLight();
    dirLight.target = player;
    player.add(dirLight); // Keep this attached to player as in original

    const camera = Camera();
    player.add(camera); // Keep camera attached to player

    // Create the renderer with original settings
    const { renderer, dispose } = createRenderer(canvas);

    let animationFrameId = null;

    // Resize handler - keeping original logic
    const handleResize = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      renderer.setSize(window.innerWidth, window.innerHeight, false);

      const size = 300;
      const viewRatio = window.innerWidth / window.innerHeight;
      const width = viewRatio < 1 ? size : size * viewRatio;
      const height = viewRatio < 1 ? size / viewRatio : size;

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;

      camera.updateProjectionMatrix();
    };

    // Set initial size
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation function - slight optimization but keeping core logic
    function animate() {
      const isGameOver = useGameStateStore.getState().isGameOver;

      if (!isGameOver) {
        animateVehicles();
        animatePlayer();
        hitTest();
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Enhanced cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Remove event listeners
      window.removeEventListener("resize", handleResize);

      // Remove objects from scene
      scene.remove(grid);

      // Clean up player resources while keeping original structure
      if (player) {
        player.remove(camera);
        player.remove(ambientLight);
        player.remove(dirLight);
      }

      // Dispose of objects
      if (grid && grid.geometry) grid.geometry.dispose();

      // Clear scene and dispose renderer
      scene.clear();
      dispose();
    };
  }, []);

  return <canvas className="game" ref={canvasRef}></canvas>;
}
