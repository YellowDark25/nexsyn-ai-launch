
import React from "react";

const WaveDecoration = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[80px] z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
        <path 
          fill="#222632" 
          d="M0,10 C280,55 520,35 720,25 C920,15 1200,40 1440,60 L1440,120 L0,120 Z"
          className="transition-all duration-700 ease-in-out"
        ></path>
      </svg>
      
      {/* Enhanced glow effects on the wave */}
      <div className="absolute bottom-0 left-1/4 w-6 h-6 rounded-full bg-nexlime/60 blur-lg"></div>
      <div className="absolute bottom-10 left-1/3 w-8 h-8 rounded-full bg-nexorange/50 blur-xl"></div>
      <div className="absolute bottom-5 right-1/4 w-6 h-6 rounded-full bg-nexlime/60 blur-lg"></div>
      <div className="absolute bottom-15 right-1/3 w-9 h-9 rounded-full bg-nexorange/40 blur-2xl"></div>
      <div className="absolute bottom-8 left-2/3 w-7 h-7 rounded-full bg-white/30 blur-xl"></div>
    </div>
  );
};

export default WaveDecoration;
