
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ProcessScene from "./three/ProcessScene";

// Main component to be exported
const ThreeScene = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div 
      className={`w-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: "400px" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ProcessScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
