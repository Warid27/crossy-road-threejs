import * as THREE from "three";
import { tileSize } from "../constant";

export function Tree(tileIndex, height) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  const trunkGeometry = new THREE.BoxGeometry(15, 15, 20);
  const trunkMaterial = new THREE.MeshLambertMaterial({
    color: 0x4d2926,
    flatShading: true,
  });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.z = 9;
  trunk.castShadow = true;
  trunk.receiveShadow = true;

  tree.add(trunk);

  const crownGeometry = new THREE.BoxGeometry(30, 30, height);
  const crownMaterial = new THREE.MeshLambertMaterial({
    color: 0x7aa21d,
    flatShading: true,
  });
  const crown = new THREE.Mesh(crownGeometry, crownMaterial);
  crown.position.z = 20 + height / 2;
  crown.castShadow = true;
  crown.receiveShadow = true;

  tree.add(crown);

  return tree;
}
