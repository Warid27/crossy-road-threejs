import * as THREE from "three";
import { tilesPerRow, tileSize } from "../app/constant";

export function Grass(rowIndex) {
  const grass = new THREE.Group();
  grass.position.y = rowIndex * tileSize;

  const geometry = new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3);
  const material = new THREE.MeshLambertMaterial({
    color: 0xbaf455,
  });
  const foundation = new THREE.Mesh(geometry, material);
  foundation.position.z = 1.5;
  foundation.receiveShadow = true;
  grass.add(foundation);

  return grass;
}
