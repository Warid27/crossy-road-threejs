import * as THREE from "three";

export function Wheel(x) {
  const geometry = new THREE.BoxGeometry(12, 33, 12);
  const material = new THREE.MeshLambertMaterial({
    color: 0x333333,
    flatShading: true,
  });
  const wheel = new THREE.Mesh(geometry, material);
  wheel.position.x = x;
  wheel.position.z = 6;
  wheel.castShadow = true;
  wheel.receiveShadow = true;

  return wheel;
}
