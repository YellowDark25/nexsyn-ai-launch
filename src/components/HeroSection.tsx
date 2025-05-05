
import React, { useState, useEffect, lazy, Suspense } from "react";
import ParticleBackground from "./hero/ParticleBackground";
import HeroContent from "./hero/HeroContent";
import WaveDecoration from "./hero/WaveDecoration";

// Lazy load the ThreeScene component for better performance
const ThreeScene = lazy(() => import('./hero/ThreeScene'));

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Animation on load and client-side rendering check
  useEffect(() => {
    // Mark component as mounted (client-side)
    setIsMounted(true);
    
    // Small delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#15191F] to-[#1A1F2C] flex items-center pt-20 overflow-hidden">
      {/* Background with particles */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side - Text content */}
          <HeroContent isVisible={isVisible} />
          
          {/* Right side - 3D Scene */}
          <div className="w-full md:w-1/2 flex justify-center">
            {isMounted && (
              <Suspense fallback={<div className="h-[400px] w-full flex items-center justify-center text-nexlime/50">Carregando...</div>}>
                <ThreeScene isVisible={isVisible} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <WaveDecoration />
    </section>
  );
};

export default HeroSection;
