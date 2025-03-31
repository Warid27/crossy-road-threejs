import * as THREE from "three";

export const player = Player();

function Player() {
  const geometry = new THREE.BoxGeometry(15, 15, 20);
  const material = new THREE.MeshLambertMaterial({
    color: "white",
    flatShading: true,
  });
  const player = new THREE.Mesh(geometry, material);
  player.castShadow = true;
  player.receiveShadow = true;
  player.position.z = 10;

  return player;
}
