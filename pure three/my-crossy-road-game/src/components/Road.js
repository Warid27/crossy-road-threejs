import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constant";

export function Road(rowIndex) {
  const road = new THREE.Group();
  road.position.y = rowIndex * tileSize;

  const geometry = new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize, 3);
  const material = new THREE.MeshLambertMaterial({
    color: 0x454a59,
  });
  const foundation = new THREE.Mesh(geometry, material);
  foundation.receiveShadow = true;
  road.add(foundation);

  return road;
}
