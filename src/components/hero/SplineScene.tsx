
import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  mousePosition?: { x: number, y: number };
}

const SplineScene = ({ mousePosition = { x: 0, y: 0 } }: SplineSceneProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Função para lidar com o evento de carregamento concluído
  const handleOnLoad = () => {
    console.log('Spline scene loaded');
    setIsLoaded(true);
  };

  return (
    <div className="w-full h-full relative">
      {/* Loader enquanto o modelo não carrega */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-nexlime border-r-nexorange border-b-white border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-sm">Carregando visualização 3D...</p>
          </div>
        </div>
      )}
      
      {/* Container para a cena Spline com efeito parallax suave */}
      <div 
        className="w-full h-[450px] relative"
        style={{ 
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
          transition: 'transform 0.3s ease-out',
          opacity: isLoaded ? 1 : 0.3,
          transition: 'opacity 0.5s ease-in-out' 
        }}
      >
        <Spline
          scene="https://prod.spline.design/6d509e18-de8c-4533-9286-2c84e9b9472b/scene.splinecode"
          onLoad={handleOnLoad}
        />
      </div>
      
      {/* Mantemos os badges de métricas da versão anterior */}
      <div 
        className="absolute -top-5 right-5 bg-gradient-to-r from-nexlime/90 to-nexlime/70 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float transform hover:scale-105 transition-all cursor-default z-20"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`
        }}
      >
        +200% produtividade
      </div>
      
      <div 
        className="absolute bottom-10 left-10 bg-gradient-to-r from-nexorange/90 to-nexorange/70 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float transform hover:scale-105 transition-all cursor-default z-20"
        style={{ 
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
        }}
      >
        -40% retrabalho
      </div>
      
      <div 
        className="absolute top-1/3 left-5 bg-gradient-to-r from-white/90 to-white/70 text-nexblack px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float transform hover:scale-105 transition-all cursor-default z-20"
        style={{ 
          animationDelay: '1.5s',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`
        }}
      >
        +80% agilidade
      </div>
    </div>
  );
};

export default SplineScene;
