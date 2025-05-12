
import React, { useState, useEffect } from "react";
import ParticleBackground from "./hero/ParticleBackground";
import HeroContent from "./hero/HeroContent";
import WaveDecoration from "./hero/WaveDecoration";
import ThreeScene from "./hero/ThreeScene";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation on load and client-side rendering check
  useEffect(() => {
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
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#15191F] to-[#1A1F2C] flex items-center pt-16 overflow-hidden">
      {/* Enhanced background with particles */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center relative">
          {/* Left side - Text content with improved glassmorphism */}
          <div className="w-full lg:w-1/2 z-10 px-0 md:px-4">
            <HeroContent isVisible={isVisible} />
          </div>
          
          {/* Right side - Light weight ThreeScene instead of Spline */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative">
            <ThreeScene isVisible={isVisible} />
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom wave decoration */}
      <WaveDecoration />
    </section>
  );
};

export default HeroSection;
