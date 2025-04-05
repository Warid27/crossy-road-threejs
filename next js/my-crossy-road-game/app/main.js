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
import { InitializeGame } from "@/utils/initializeGame";

export default function Main() {
  const canvasRef = useRef(null);

  useEffect(() => {
    InitializeGame();
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

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    const dirLight = new DirectionalLight();
    dirLight.target = player;
    player.add(dirLight);

    const camera = Camera();
    player.add(camera);

    // Create the renderer
    const { renderer, dispose } = createRenderer(canvas);
    renderer.setAnimationLoop(animate);

    // Resize handler
    const handleResize = () => {
      // Ensure canvas display size matches renderer size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Update renderer size
      renderer.setSize(window.innerWidth, window.innerHeight, false); // false prevents CSS update conflict

      // Update camera properties
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

    // Initial call to set correct dimensions
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    function animate() {
      animateVehicles();
      animatePlayer();
      hitTest();
      renderer.render(scene, camera);
    }

    // Cleanup on unmount
    return () => {
      dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas className="game" ref={canvasRef}></canvas>;
}
