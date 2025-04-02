import * as THREE from "three";
import { endsUpInValidPosition } from "../utils/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";

export const player = Player();

function Player() {
  const player = new THREE.Group();

  const geometry = new THREE.BoxGeometry(15, 15, 20);
  const material = new THREE.MeshLambertMaterial({
    color: "white",
    flatShading: true,
  });
  const body = new THREE.Mesh(geometry, material);
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.z = 10;

  player.add(body);

  const capGeometry = new THREE.BoxGeometry(2, 4, 2);
  const capMaterial = new THREE.MeshLambertMaterial({
    color: 0xf0619a,
    flatShading: true,
  });
  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.castShadow = true;
  cap.receiveShadow = true;
  cap.position.z = 21;
  player.add(cap);

  const playerContainer = new THREE.Group();
  playerContainer.add(player);
  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function initalizePlayer() {
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 0;

  // Initialize metadata
  position.currentRow = 0;
  position.currentTile = 0;

  movesQueue.length = 0;
}

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;

  if (position.currentRow > rows.length - 10) addRows();

  const scoreDom = document.getElementById("score");
  if (scoreDom) scoreDom.innerText = position.currentRow.toString();
}
