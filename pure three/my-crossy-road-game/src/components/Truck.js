import * as THREE from "three";
import { tileSize } from "../constant";
import { Wheel } from "./Wheel";

export function Truck(initialTileIndex, direction, color) {
  const truck = new THREE.Group();
  truck.position.x = initialTileIndex * tileSize;
  if (!direction) truck.rotation.z = Math.PI;

  const cargoGeometry = new THREE.BoxGeometry(70, 35, 35);
  const cargoMaterial = new THREE.MeshLambertMaterial({
    color: 0xb4c6fc,
    flatShading: true,
  });
  const cargo = new THREE.Mesh(cargoGeometry, cargoMaterial);
  cargo.position.x = -15;
  cargo.position.z = 25;
  cargo.castShadow = true;
  cargo.receiveShadow = true;

  truck.add(cargo);

  const cabinGeometry = new THREE.BoxGeometry(30, 30, 30);
  const cabinMaterial = new THREE.MeshLambertMaterial({
    color,
    flatShading: true,
  });
  const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
  cabin.position.x = 35;
  cabin.position.z = 20;
  cabin.castShadow = true;
  cabin.receiveShadow = true;

  truck.add(cabin);

  const frontWheel = Wheel(37);
  truck.add(frontWheel);

  const middleWheel = Wheel(5);
  truck.add(middleWheel);

  const backWheel = Wheel(-35);
  truck.add(backWheel);

  return truck;
}
