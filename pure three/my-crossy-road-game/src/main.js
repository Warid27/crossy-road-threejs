import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player, initalizePlayer } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { createGrid } from "./utils/Grid";
import { DirectionalLight } from "./components/DirectionalLight";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import "./collectUserInput";
import "./style.css";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const grid = createGrid();
scene.add(grid);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

const scoreDom = document.getElementById("score");
const resultDom = document.getElementById("result-container");

initializeGame();

document.querySelector("#retry")?.addEventListener("click", initializeGame);

function initializeGame() {
  initalizePlayer();
  initializeMap();

  // Initialize UI
  if (scoreDom) scoreDom.innerText = "0";
  if (resultDom) resultDom.style.visibility = "hidden";
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles();
  animatePlayer();
  hitTest();
  renderer.render(scene, camera);
}
