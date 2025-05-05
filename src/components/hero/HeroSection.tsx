
import React, { useState, useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import HeroContent from "./HeroContent";
import WaveDecoration from "./WaveDecoration";
import SplineScene from "./SplineScene";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation on load and client-side rendering check
  useEffect(() => {
    // Mark component as mounted (client-side)
    setIsMounted(true);
    
    // Small delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Mouse movement handler for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (from -1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#15191F] to-[#1A1F2C] flex items-center pt-20 overflow-hidden">
      {/* Enhanced background with particles */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        {/* Removed the strict column layout for more fluid design */}
        <div className="flex flex-wrap items-center justify-between relative">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 z-10">
            <HeroContent isVisible={isVisible} />
          </div>
          
          {/* Right side - Spline 3D Scene - made it overlap slightly for better integration */}
          <div className="w-full lg:w-1/2 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 flex items-center justify-center">
            {isMounted && (
              <div className="w-full h-[450px] lg:h-full relative">
                <SplineScene mousePosition={mousePosition} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom wave decoration */}
      <WaveDecoration />
    </section>
  );
};

export default HeroSection;
