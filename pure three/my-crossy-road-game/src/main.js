import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { createGrid } from "./utils/Grid";
import { DirectionalLight } from "./components/DirectionalLight";
import "./style.css";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const grid = createGrid();
scene.add(grid);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new DirectionalLight();
scene.add(dirLight);

const camera = Camera();
scene.add(camera);

initializeGame();

function initializeGame() {
  initializeMap();
}

const renderer = Renderer();
renderer.render(scene, camera);
