// SkinSelector.js
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Skin from "./Skin"; // Import the Skin class

export default function SkinSelector({ selectedSkin }) {
  const [skinModel, setSkinModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval = null; // Initialize the interval variable

    // Create a new Skin instance for the selected model
    const skinInstance = new Skin(selectedSkin);

    // Function to handle model loading
    const handleModelLoad = () => {
      setSkinModel(skinInstance.getModel());
      setIsLoading(false);
      clearInterval(interval); // Clear the interval once the model is loaded
    };

    // Check if the model is already loaded
    if (skinInstance.getModel()) {
      handleModelLoad();
    } else {
      // Poll for the model to load
      interval = setInterval(() => {
        if (skinInstance.getModel()) {
          handleModelLoad();
        }
      }, 100);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [selectedSkin]);

  return (
    <div className="relative w-72 h-72 ">
      {isLoading ? (
        // Show a loading spinner while the model is loading
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          <p className="mt-2 text-sm text-white">Loading...</p>
        </div>
      ) : (
        // Render the 3D model inside a Canvas
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate
          />
          <primitive
            object={skinModel}
            position={[0, -1, 0]}
            scale={0.5}
            rotation={[0, Math.PI / 2, 0]}
          />
        </Canvas>
      )}
    </div>
  );
}
