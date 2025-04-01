import * as THREE from "three";

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

  return player;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function queueMove(direction) {
  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;
}
