// Skin.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useAssets from "@/store/asset-store";

const baseAssetUrl = useAssets.getState().baseAssetUrl;

export default class Skin {
  constructor(modelName) {
    this.model = null; // Placeholder for the loaded model
    this.loader = new GLTFLoader();
    const urlModels = `${baseAssetUrl}/models/cartoon_${modelName}.glb`;
    this.modelPath = urlModels;

    this.loadModel();
  }

  // Load the .glb model
  loadModel() {
    if (typeof window !== "undefined") {
      this.loader.load(
        this.modelPath,

        // onLoad callback: executed when the model is successfully loaded
        (gltf) => {
          this.model = gltf.scene; // Store the loaded model
          this.model.scale.set(5, 5, 5); // Adjust scale if needed
          this.model.rotation.set(Math.PI / 2, Math.PI, 0);
        },

        // onProgress callback: track loading progress
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },

        // onError callback: handle errors
        (error) => {
          console.error("An error happened while loading the model:", error);
        }
      );
    } else {
      console.warn("Cannot load model on the server side.");
    }
  }

  // Get the loaded model
  getModel() {
    return this.model;
  }
}
