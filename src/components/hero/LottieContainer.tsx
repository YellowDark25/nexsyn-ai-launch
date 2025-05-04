
import React, { useEffect, useState, useRef } from "react";
import { createLottiePlayerElement, ensureLottiePlayerLoaded } from "../../utils/lottieLoader";
import { Loader, AlertTriangle, ImageOff } from "lucide-react";

interface LottieContainerProps {
  isVisible: boolean;
  animationData: any;
}

const LottieContainer = ({ isVisible, animationData }: LottieContainerProps) => {
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLElement | null>(null);

  // Load lottie player with improved error handling
  useEffect(() => {
    let isMounted = true;
    let timeoutId: number;
    
    // Set a timeout to show fallback if animation takes too long to load
    timeoutId = window.setTimeout(() => {
      if (isMounted && !lottieLoaded) {
        setLoadingTimeout(true);
        console.log("Lottie animation load timeout");
      }
    }, 5000);
    
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
        
        // Set up error handling for the player
        player.addEventListener('error', (error) => {
          console.error("Lottie player error:", error);
          if (isMounted) {
            setLottieError(true);
            setLottieLoaded(false);
          }
        });
        
        // Store reference to player
        playerRef.current = player;
        
        // Append to container if component is still mounted
        if (lottieRef.current) {
          lottieRef.current.appendChild(player);
          setLottieLoaded(true);
          setLottieError(false);
          setLoadingTimeout(false);
        }
      } catch (error) {
        console.error("Could not load lottie:", error);
        if (isMounted) {
          setLottieError(true);
          setLottieLoaded(false);
        }
      }
    };
    
    loadLottie();
    
    // Cleanup function
    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
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

  // Fallback image when lottie fails to load
  const renderFallbackImage = () => (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800/30 backdrop-blur-sm rounded-lg">
      <div className="relative w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
          alt="AI and Automation" 
          className="w-full h-full object-cover rounded-lg opacity-75" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-lg">
          <ImageOff className="h-12 w-12 text-gray-300 mb-2" />
          <p className="text-gray-300 font-medium">Animação indisponível</p>
          <p className="text-gray-400 text-sm">Exibindo imagem alternativa</p>
        </div>
      </div>
    </div>
  );

  // Loading state with timeout detection
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loadingTimeout ? (
        <div className="flex flex-col items-center justify-center text-center px-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-3" />
          <p className="text-gray-300 font-medium">Carregamento lento</p>
          <p className="text-gray-400 text-sm mt-1">A animação está demorando mais que o esperado</p>
        </div>
      ) : (
        <>
          <Loader className="w-12 h-12 text-nexlime animate-spin mb-3" />
          <p className="mt-2 text-gray-300">Carregando animação...</p>
        </>
      )}
    </div>
  );

  return (
    <div 
      className={`w-full md:w-1/2 flex justify-center transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="w-full max-w-md relative animate-float glass-morphism p-6 rounded-2xl">
        <div 
          ref={lottieRef} 
          className="w-full h-[400px] flex items-center justify-center"
        >
          {!lottieLoaded && !lottieError && renderLoading()}
          {lottieError && renderFallbackImage()}
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
