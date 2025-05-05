
import React, { useRef, useEffect } from 'react';
import { Check, Cog, Bot, Clock, MessageSquare } from "lucide-react";

// SVG animation that replaces the 3D scene
const TransformationFlow = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Animate the SVG path on load
  useEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      
      // Set up the starting position
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      
      // Define animation
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0';
      }, 500);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Main flow animation */}
      <svg 
        ref={svgRef}
        className="w-full h-full absolute" 
        viewBox="0 0 800 400" 
        style={{ 
          filter: 'drop-shadow(0px 0px 3px rgba(201, 217, 33, 0.3))',
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
        }}
      >
        {/* Background glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Gradient definitions */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9D921" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6F00" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9D921" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1A1F2C" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Connection path */}
        <path
          ref={pathRef}
          d="M100,200 C150,100 250,300 400,200 C550,100 650,300 700,200"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
        />
        
        {/* Process nodes */}
        <circle cx="100" cy="200" r="30" fill="url(#nodeGradient)" stroke="#C9D921" strokeWidth="1.5" />
        <circle cx="400" cy="200" r="40" fill="url(#nodeGradient)" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="700" cy="200" r="30" fill="url(#nodeGradient)" stroke="#FF6F00" strokeWidth="1.5" />
        
        {/* Data particles flowing along the path */}
        <circle className="animate-flow-1" cx="0" cy="0" r="4" fill="#C9D921" filter="url(#glow)">
          <animateMotion
            path="M100,200 C150,100 250,300 400,200 C550,100 650,300 700,200"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle className="animate-flow-2" cx="0" cy="0" r="3" fill="#FFFFFF" filter="url(#glow)">
          <animateMotion
            path="M100,200 C150,100 250,300 400,200 C550,100 650,300 700,200"
            dur="3s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle className="animate-flow-3" cx="0" cy="0" r="4" fill="#FF6F00" filter="url(#glow)">
          <animateMotion
            path="M100,200 C150,100 250,300 400,200 C550,100 650,300 700,200"
            dur="5s"
            begin="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Floating icons with parallax effect */}
      <div 
        className="absolute left-[12%] top-[35%] transform -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ 
          animationDelay: '0.2s',
          transform: `translate(calc(-50% + ${mousePosition.x * 15}px), calc(-50% + ${mousePosition.y * 15}px))`
        }}
      >
        <div className="rounded-full p-4 backdrop-blur-sm bg-nexlime/10 border border-nexlime/30">
          <Cog size={32} className="text-nexlime animate-spin-slow" />
        </div>
        <div className="mt-2 text-xs font-medium text-nexlime text-center">Processos</div>
      </div>
      
      <div 
        className="absolute left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ 
          animationDelay: '0.8s',
          transform: `translate(calc(-50% + ${mousePosition.x * -10}px), calc(-50% + ${mousePosition.y * -10}px))`
        }}
      >
        <div className="rounded-full p-4 backdrop-blur-sm bg-white/10 border border-white/30">
          <Bot size={38} className="text-white animate-pulse-soft" />
        </div>
        <div className="mt-2 text-xs font-medium text-white text-center">IA</div>
      </div>
      
      <div 
        className="absolute right-[15%] top-[40%] transform -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ 
          animationDelay: '1.2s',
          transform: `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`
        }}
      >
        <div className="rounded-full p-4 backdrop-blur-sm bg-nexorange/10 border border-nexorange/30">
          <Check size={32} className="text-nexorange" />
        </div>
        <div className="mt-2 text-xs font-medium text-nexorange text-center">Resultado</div>
      </div>
      
      {/* Additional floating icons */}
      <div 
        className="absolute left-[30%] bottom-[30%] transform -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ 
          animationDelay: '1.5s',
          transform: `translate(calc(-50% + ${mousePosition.x * -12}px), calc(-50% + ${mousePosition.y * -12}px))`
        }}
      >
        <div className="rounded-full p-3 backdrop-blur-sm bg-white/10 border border-white/20">
          <Clock size={24} className="text-nexlime" />
        </div>
      </div>
      
      <div 
        className="absolute right-[35%] bottom-[25%] transform -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(calc(-50% + ${mousePosition.x * 18}px), calc(-50% + ${mousePosition.y * 18}px))`
        }}
      >
        <div className="rounded-full p-3 backdrop-blur-sm bg-white/10 border border-white/20">
          <MessageSquare size={24} className="text-nexorange" />
        </div>
      </div>
      
      {/* Central message */}
      <div 
        className="absolute bottom-6 w-full flex justify-center"
        style={{ transform: `translateY(${mousePosition.y * 5}px)` }}
      >
        <div className="px-8 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <span className="text-white font-medium">IA integrada ao seu <span className="text-nexlime">processo</span></span>
        </div>
      </div>
    </div>
  );
};

export default TransformationFlow;
