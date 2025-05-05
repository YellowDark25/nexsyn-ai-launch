
import React, { useEffect, useState, useRef } from "react";
import TransformationFlow from "./TransformationFlow";
import { Badge } from "../ui/badge";

// Lighter alternative to the heavy 3D scene
const ThreeScene = ({ isVisible }: { isVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        // Calculate mouse position relative to container center
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalize values between -1 and 1
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-[450px] relative transition-opacity duration-1000 overflow-visible ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main transformation flow SVG animation */}
      <TransformationFlow mousePosition={mousePosition} />
      
      {/* Floating metric badges with improved glassmorphism styling */}
      <Badge 
        className="absolute -top-10 right-5 bg-gradient-to-r from-nexlime/80 to-nexlime/60 text-nexblack px-4 py-2 rounded-full text-sm font-bold animate-float shadow-lg hover:shadow-nexlime/30 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all cursor-default"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`
        }}
      >
        +200% produtividade
      </Badge>
      
      <Badge 
        className="absolute bottom-10 left-10 bg-gradient-to-r from-nexorange/80 to-nexorange/60 text-white px-4 py-2 rounded-full text-sm font-bold animate-float shadow-lg hover:shadow-nexorange/30 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all cursor-default"
        style={{ 
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}
      >
        -40% retrabalho
      </Badge>
      
      <Badge 
        className="absolute top-1/3 left-5 bg-gradient-to-r from-white/80 to-white/60 text-nexblack px-4 py-2 rounded-full text-sm font-bold animate-float shadow-lg hover:shadow-white/30 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all cursor-default"
        style={{ 
          animationDelay: '1.5s',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`
        }}
      >
        +80% agilidade
      </Badge>
      
      {/* Improved glow effects for better integration */}
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-nexlime/10 blur-[80px]"></div>
      <div className="absolute -top-20 left-1/3 w-80 h-80 rounded-full bg-nexorange/10 blur-[100px]"></div>
    </div>
  );
};

export default ThreeScene;
