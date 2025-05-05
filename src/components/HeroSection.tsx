
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
      {/* Background with enhanced particles */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side - Text content */}
          <HeroContent isVisible={isVisible} />
          
          {/* Right side - 3D Scene */}
          <div className="w-full md:w-1/2 flex justify-center">
            {isMounted && (
              <Suspense fallback={
                <div className="h-[450px] w-full flex items-center justify-center glass-morphism rounded-xl p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-transparent border-nexlime rounded-full animate-spin mb-4"></div>
                    <p className="text-nexlime/70">Carregando visualização 3D...</p>
                  </div>
                </div>
              }>
                <div className="w-full max-w-md relative animate-float glass-morphism p-6 rounded-2xl">
                  <ThreeScene isVisible={isVisible} />
                  <div className="absolute -bottom-4 w-full h-10 bg-gradient-to-t from-[#15191F] to-transparent"></div>
                </div>
              </Suspense>
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
