
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ProcessScene from "./three/ProcessScene";
import { Html } from "@react-three/drei";

// Loading component for 3D scene
const ThreeSceneLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + Math.random() * 10;
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Html center>
      <div className="flex flex-col items-center text-nexwhite">
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-nexlime to-nexorange rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs font-medium">Carregando visualização 3D...</p>
      </div>
    </Html>
  );
};

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
        <Suspense fallback={<ThreeSceneLoader />}>
          <ProcessScene />
        </Suspense>
      </Canvas>
      
      {/* Add floating metrics badges */}
      <div className="absolute -top-5 -right-5 bg-nexlime/90 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default">
        +200% produtividade
      </div>
      
      <div className="absolute -bottom-4 -left-4 bg-nexorange/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default" style={{animationDelay: '1s'}}>
        -40% retrabalho
      </div>
      
      <div className="absolute top-1/4 -left-4 bg-white/90 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default" style={{animationDelay: '2s'}}>
        +80% agilidade
      </div>
    </div>
  );
};

export default ThreeScene;
