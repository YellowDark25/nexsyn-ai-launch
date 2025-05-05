
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ProcessScene from "./three/ProcessScene";
import { OrthographicCamera } from "@react-three/drei";

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
        shadows
        dpr={[1, 2]} 
        gl={{ 
          antialias: true,
          alpha: true,
          logarithmicDepthBuffer: true
        }}
        className="bg-nexbg rounded-xl shadow-xl"
      >
        <Suspense fallback={null}>
          <ProcessScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
