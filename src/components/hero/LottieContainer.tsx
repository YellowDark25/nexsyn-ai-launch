
import React from "react";

interface LottieContainerProps {
  isVisible: boolean;
  animationData: any; // Keep this prop for compatibility with existing code
}

const LottieContainer = ({ isVisible }: LottieContainerProps) => {
  return (
    <div 
      className={`w-full md:w-1/2 flex justify-center transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="w-full max-w-md relative animate-float glass-morphism p-6 rounded-2xl">
        <div className="w-full h-[400px] flex items-center justify-center">
          <img 
            src="/lovable-uploads/cerebro.gif" 
            alt="IA para processos empresariais" 
            className="w-full h-full object-contain rounded-lg"
          />
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
