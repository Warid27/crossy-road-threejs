import * as THREE from "three";
import { tileSize, tilesPerRow } from "../constant";

export function createGrid() {
  const width = tileSize * tilesPerRow;
  const height = tileSize * tilesPerRow;
  const size = Math.max(width, height);
  const divisions = tilesPerRow;

  const gridHelper = new THREE.GridHelper(size, divisions, 0x888888, 0x444444);

  gridHelper.scale.set(1, height / size, 1);
  gridHelper.rotation.x = Math.PI / 2;
  gridHelper.position.set(0, 0, 0);

  return gridHelper;
}
