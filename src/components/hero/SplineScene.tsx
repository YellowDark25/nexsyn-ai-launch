
import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Badge } from "../ui/badge";

interface SplineSceneProps {
  mousePosition?: { x: number, y: number };
}

const SplineScene = ({ mousePosition = { x: 0, y: 0 } }: SplineSceneProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to handle load completion event
  const handleOnLoad = () => {
    console.log('Spline scene loaded');
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full">
      {/* Loader while the model is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-nexlime border-r-nexorange border-b-white border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-sm">Carregando visualização 3D...</p>
          </div>
        </div>
      )}
      
      {/* Spline scene with smooth parallax effect - removed all containers */}
      <div 
        className="absolute inset-0 transform-gpu"
        style={{ 
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
          transition: 'transform 0.3s ease-out, opacity 0.5s ease-in-out',
          opacity: isLoaded ? 1 : 0.3
        }}
      >
        <Spline
          scene="https://prod.spline.design/vP-M7jqSOZxPcdvj/scene.splinecode"
          onLoad={handleOnLoad}
        />
      </div>
      
      {/* Metrics badges with improved glassmorphism effect - more integrated with scene */}
      <Badge 
        className="absolute top-5 right-8 bg-gradient-to-r from-nexlime/60 to-nexlime/40 text-nexblack px-4 py-2 rounded-full text-sm font-bold animate-float backdrop-blur-lg border border-white/10 transform hover:scale-105 transition-all cursor-default z-20 shadow-[0_0_20px_rgba(201,217,33,0.3)]"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`
        }}
      >
        +200% produtividade
      </Badge>
      
      <Badge 
        className="absolute bottom-20 left-10 bg-gradient-to-r from-nexorange/60 to-nexorange/40 text-white px-4 py-2 rounded-full text-sm font-bold animate-float backdrop-blur-lg border border-white/10 transform hover:scale-105 transition-all cursor-default z-20 shadow-[0_0_20px_rgba(255,111,0,0.3)]"
        style={{ 
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}
      >
        -40% retrabalho
      </Badge>
      
      <Badge 
        className="absolute top-1/3 left-5 bg-gradient-to-r from-white/60 to-white/40 text-nexblack px-4 py-2 rounded-full text-sm font-bold animate-float backdrop-blur-lg border border-white/10 transform hover:scale-105 transition-all cursor-default z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        style={{ 
          animationDelay: '1.5s',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`
        }}
      >
        +80% agilidade
      </Badge>

      {/* Enhanced glow effects to create better integration with the 3D model */}
      <div className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-nexlime/15 blur-[100px]"></div>
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-nexorange/15 blur-[120px]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-[80px]"></div>
    </div>
  );
};

export default SplineScene;
