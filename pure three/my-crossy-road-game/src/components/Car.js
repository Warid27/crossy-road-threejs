import * as THREE from "three";
import { tileSize } from "../constant";
import { Wheel } from "./Wheel";

export function Car(initialTileIndex, direction, color) {
  const car = new THREE.Group();
  car.position.x = initialTileIndex * tileSize;
  if (!direction) car.rotation.z = Math.PI;

  const mainGeometry = new THREE.BoxGeometry(60, 30, 15);
  const mainMaterial = new THREE.MeshLambertMaterial({
    color,
    flatShading: true,
  });
  const main = new THREE.Mesh(mainGeometry, mainMaterial);
  main.position.z = 12;
  main.castShadow = true;
  main.receiveShadow = true;

  car.add(main);

  const cabinGeometry = new THREE.BoxGeometry(33, 24, 12);
  const cabinMaterial = new THREE.MeshLambertMaterial({
    color: "white",
    flatShading: true,
  });
  const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;

  car.add(cabin);

  const frontWheel = Wheel(18);
  car.add(frontWheel);

  const backWheel = Wheel(-18);
  car.add(backWheel);

  return car;
}
