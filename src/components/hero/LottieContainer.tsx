
import React, { useEffect, useState, useRef } from "react";
import { createLottiePlayerElement, ensureLottiePlayerLoaded } from "../../utils/lottieLoader";

interface LottieContainerProps {
  isVisible: boolean;
  animationData: any;
}

const LottieContainer = ({ isVisible, animationData }: LottieContainerProps) => {
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLElement | null>(null);

  // Load lottie player
  useEffect(() => {
    let isMounted = true;
    
    const loadLottie = async () => {
      try {
        await ensureLottiePlayerLoaded();
        
        // Check if component is still mounted
        if (!isMounted || !lottieRef.current) return;
        
        // Remove any existing lottie player
        if (playerRef.current && playerRef.current.parentNode === lottieRef.current) {
          try {
            lottieRef.current.removeChild(playerRef.current);
          } catch (e) {
            console.error("Error removing previous lottie player:", e);
          }
        }
        playerRef.current = null;
        
        // Create new lottie player
        const player = createLottiePlayerElement(animationData, {
          width: "100%",
          height: "100%",
          loop: true,
          autoplay: true,
          speed: "1"
        });
        
        // Store reference to player
        playerRef.current = player;
        
        // Append to container if component is still mounted
        if (lottieRef.current) {
          lottieRef.current.appendChild(player);
          setLottieLoaded(true);
        }
        setLottieError(false);
      } catch (error) {
        console.error("Could not load lottie:", error);
        if (isMounted) {
          setLottieError(true);
        }
      }
    };
    
    loadLottie();
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (playerRef.current && lottieRef.current) {
        try {
          if (playerRef.current.parentNode === lottieRef.current) {
            lottieRef.current.removeChild(playerRef.current);
          }
        } catch (e) {
          console.error("Error removing lottie player on unmount:", e);
        }
        playerRef.current = null;
      }
    };
  }, [animationData]);

  return (
    <div 
      className={`w-full md:w-1/2 flex justify-center transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="w-full max-w-md relative animate-float glass-morphism p-6 rounded-2xl">
        <div 
          ref={lottieRef} 
          className="w-full h-[400px] flex items-center justify-center"
        >
          {!lottieLoaded && !lottieError && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-16 h-16 border-4 border-nexlime border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Carregando animação...</p>
            </div>
          )}
          {lottieError && (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800/30 backdrop-blur-sm rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p className="text-gray-400">Não foi possível carregar a animação</p>
            </div>
          )}
        </div>
        
        <div className="absolute -bottom-4 w-full h-10 bg-gradient-to-t from-[#15191F] to-transparent"></div>
        
        {/* Floating badges/stats */}
        <div className="absolute -top-5 -right-5 bg-nexlime/90 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default">
          +200% produtividade
        </div>
        <div className="absolute -bottom-4 -left-4 bg-nexorange/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft transform hover:scale-105 transition-all cursor-default" style={{animationDelay: '1s'}}>
          -40% custos
        </div>
      </div>
    </div>
  );
};

export default LottieContainer;
