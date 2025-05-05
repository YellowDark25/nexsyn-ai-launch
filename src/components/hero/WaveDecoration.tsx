
import React from "react";

const WaveDecoration = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[60px] z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
        <path 
          fill="#222632" 
          d="M0,10 C200,45 400,70 720,40 C1040,10 1320,60 1440,80 L1440,120 L0,120 Z"
          className="transition-all duration-700 ease-in-out"
        ></path>
      </svg>
      
      {/* Add subtle glow points on the wave */}
      <div className="absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-nexlime/60 blur-sm"></div>
      <div className="absolute bottom-5 left-1/3 w-3 h-3 rounded-full bg-nexorange/50 blur-sm"></div>
      <div className="absolute bottom-10 right-1/4 w-2 h-2 rounded-full bg-nexlime/60 blur-sm"></div>
      <div className="absolute bottom-2 right-1/3 w-3 h-3 rounded-full bg-nexorange/50 blur-sm"></div>
    </div>
  );
};

export default WaveDecoration;
