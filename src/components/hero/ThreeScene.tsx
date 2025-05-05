
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ProcessScene from "./three/ProcessScene";
import { OrthographicCamera } from "@react-three/drei";

// Main component to be exported
const ThreeScene = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div 
      className={`w-full transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: "450px" }} // Increased height for better visualization
    >
      <Canvas 
        shadows
        dpr={[1, 2]} 
        gl={{ 
          antialias: true,
          alpha: true,
          logarithmicDepthBuffer: true
        }}
        className="bg-nexbg rounded-xl shadow-xl glass-morphism"
      >
        <Suspense fallback={null}>
          <ProcessScene />
        </Suspense>
      </Canvas>
      
      {/* Add floating metrics badges */}
      <div className="absolute -top-5 -right-5 bg-nexlime/90 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default">
        +200% produtividade
      </div>
      
      <div className="absolute -bottom-4 -left-4 bg-nexorange/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default" style={{animationDelay: '1s'}}>
        -40% custos
      </div>
      
      <div className="absolute top-1/4 -left-4 bg-white/90 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default" style={{animationDelay: '2s'}}>
        +80% eficiência
      </div>
    </div>
  );
};

export default ThreeScene;
