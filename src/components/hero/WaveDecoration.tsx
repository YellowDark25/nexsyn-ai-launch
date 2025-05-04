
import React from "react";

const WaveDecoration = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[50px] z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
        <path fill="#222632" d="M0,10 C300,60 600,80 900,50 C1200,20 1440,40 1440,80 L1440,120 L0,120 Z"></path>
      </svg>
    </div>
  );
};

export default WaveDecoration;
