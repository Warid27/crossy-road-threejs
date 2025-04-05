import * as THREE from "three";
import usePlayerStore from "../store/player-store";
import { tileSize } from "./constant";

const moveClock = new THREE.Clock(false);

export function animatePlayer() {
  const { movesQueue, position, stepCompleted } = usePlayerStore.getState();

  const player = usePlayerStore.getState().getPlayerModel();
  if (!movesQueue.length) return;

  if (!moveClock.running) moveClock.start();

  const stepTime = 0.2;
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  setPosition(progress);
  setRotation(progress);

  if (progress >= 1) {
    stepCompleted();
    moveClock.stop();
  }

  function setPosition(progress) {
    const startX = position.currentTile * tileSize;
    const startY = position.currentRow * tileSize;
    let endX = startX;
    let endY = startY;

    if (movesQueue[0] === "left") endX -= tileSize;
    if (movesQueue[0] === "right") endX += tileSize;
    if (movesQueue[0] === "backward") endY -= tileSize;
    if (movesQueue[0] === "forward") endY += tileSize;

    player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
    player.children[0].position.z =
      Math.sin(progress * Math.PI) * tileSize * 0.2;
  }

  function setRotation(progress) {
    let endRotation = 0;
    if (movesQueue[0] === "forward") endRotation = 0;
    if (movesQueue[0] === "left") endRotation = Math.PI / 2;
    if (movesQueue[0] === "right") endRotation = -Math.PI / 2;
    if (movesQueue[0] === "backward") endRotation = Math.PI;

    player.children[0].rotation.z = THREE.MathUtils.lerp(
      player.children[0].rotation.z,
      endRotation,
      progress
    );
  }
}
