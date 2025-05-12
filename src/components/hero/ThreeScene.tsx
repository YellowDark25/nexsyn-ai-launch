
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import lottie from 'lottie-web';

// Lighter alternative to the heavy 3D scene
const ThreeScene = ({ isVisible }: { isVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
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

  // Initialize Lottie animation
  useEffect(() => {
    if (lottieRef.current) {
      const animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/animations/solution-animation.json',
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
      
      return () => animation.destroy();
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main visual element - Lottie animation instead of 3D */}
      <div 
        ref={lottieRef}
        className="w-full h-full absolute inset-0 flex items-center justify-center z-10"
        style={{ 
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />
      
      {/* Process elements cards with glassmorphism */}
      <Card 
        className="absolute top-10 right-10 bg-gradient-to-r from-nexlime/20 to-nexlime/5 backdrop-blur-md border border-white/10 shadow-lg w-48 transform hover:scale-105 transition-all z-20"
        style={{ transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)` }}
      >
        <CardContent className="p-4">
          <h3 className="text-white text-lg font-bold mb-2">Automação</h3>
          <p className="text-white/80 text-sm">Processos otimizados com IA</p>
        </CardContent>
      </Card>

      <Card 
        className="absolute bottom-20 left-5 bg-gradient-to-r from-nexorange/20 to-nexorange/5 backdrop-blur-md border border-white/10 shadow-lg w-48 transform hover:scale-105 transition-all z-20"
        style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
      >
        <CardContent className="p-4">
          <h3 className="text-white text-lg font-bold mb-2">Eficiência</h3>
          <p className="text-white/80 text-sm">Agilidade em decisões</p>
        </CardContent>
      </Card>
      
      {/* Floating metric badges with glassmorphism styling */}
      <Badge 
        className="absolute top-40 right-20 bg-gradient-to-r from-nexlime/80 to-nexlime/60 text-nexblack px-4 py-2 rounded-full text-sm font-bold animate-float shadow-lg hover:shadow-nexlime/30 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all cursor-default"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`
        }}
      >
        +200% produtividade
      </Badge>
      
      <Badge 
        className="absolute bottom-40 left-40 bg-gradient-to-r from-nexorange/80 to-nexorange/60 text-white px-4 py-2 rounded-full text-sm font-bold animate-float shadow-lg hover:shadow-nexorange/30 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all cursor-default"
        style={{ 
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}
      >
        -40% retrabalho
      </Badge>
      
      <Badge 
        className="absolute top-1/3 right-1/4 bg-gradient-to-r from-white/80 to-white/60 text-nexblack px-4 py-2 rounded-full text-sm font-bold animate-float shadow-lg hover:shadow-white/30 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all cursor-default"
        style={{ 
          animationDelay: '1.5s',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`
        }}
      >
        +80% agilidade
      </Badge>
      
      {/* Improved glow effects for better integration */}
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-nexlime/15 blur-[80px]"></div>
      <div className="absolute -top-20 left-1/3 w-80 h-80 rounded-full bg-nexorange/15 blur-[100px]"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-[80px]"></div>
    </div>
  );
};

export default ThreeScene;
