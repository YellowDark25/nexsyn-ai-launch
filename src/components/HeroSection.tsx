
import React, { useState, useEffect } from "react";
import ParticleBackground from "./hero/ParticleBackground";
import HeroContent from "./hero/HeroContent";
import WaveDecoration from "./hero/WaveDecoration";
import TransformationFlow from "./hero/TransformationFlow";

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
      {/* Background with enhanced particles */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side - Text content */}
          <HeroContent isVisible={isVisible} />
          
          {/* Right side - Flow Animation (removed container for more fluid design) */}
          <div className="w-full md:w-1/2 flex justify-center">
            {isMounted && (
              <div className="w-full max-w-md h-[450px] relative">
                <TransformationFlow mousePosition={mousePosition} />
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
