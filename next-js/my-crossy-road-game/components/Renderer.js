// renderer.js
import * as THREE from "three";

export function createRenderer(canvas) {
  if (!canvas) {
    throw new Error("Canvas element is required but was not provided.");
  }

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Cleanup function
  const dispose = () => {
    renderer.dispose();
  };

  return { renderer, dispose };
}
