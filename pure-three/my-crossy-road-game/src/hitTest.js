import * as THREE from "three";
import { metadata as rows } from "./components/Map";
import { player, position } from "./components/Player";

const resultDom = document.getElementById("result-container");
const finalScoreDom = document.getElementById("final-score");

export function hitTest() {
  const row = rows[position.currentRow - 1];
  if (!row) return;

  if (row.type === "car" || row.type === "truck") {
    const playerBoundingBox = new THREE.Box3();
    playerBoundingBox.setFromObject(player);

    row.vehicles.forEach(({ ref }) => {
      if (!ref) throw new Error("Vehicle reference is missing");

      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        if (!resultDom || !finalScoreDom) return;

        resultDom.style.visibility = "visible";
        finalScoreDom.innerText = position.currentRow.toString();
      }
    });
  }
}
