
import React, { useRef, useEffect } from 'react';
import { Check, Cog, Bot, Clock, MessageSquare, ChartBar, Zap } from "lucide-react";
import { Badge } from "../ui/badge";

// Enhanced SVG animation that replaces the 3D scene
const TransformationFlow = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gridRef = useRef<SVGRectElement>(null);
  
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
        path.style.transition = 'stroke-dashoffset 2.5s ease-in-out';
        path.style.strokeDashoffset = '0';
      }, 500);
    }
    
    // Animate grid effect
    if (gridRef.current) {
      const grid = gridRef.current;
      grid.style.opacity = '0';
      setTimeout(() => {
        grid.style.transition = 'opacity 1.5s ease-in-out';
        grid.style.opacity = '0.15';
      }, 800);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Holographic grid background */}
      <div className="absolute inset-0 z-0"
        style={{ 
          transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path 
                d="M 15 0 L 0 0 0 15" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.07)" 
                strokeWidth="0.5"
              />
            </pattern>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="url(#smallGrid)"/>
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.12)" 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect 
            ref={gridRef}
            width="100%" 
            height="100%" 
            fill="url(#grid)" 
            opacity="0"
          />
        </svg>
      </div>

      {/* Main flow animation */}
      <svg 
        ref={svgRef}
        className="w-full h-full absolute z-10" 
        viewBox="0 0 800 400" 
        style={{ 
          filter: 'drop-shadow(0px 0px 5px rgba(201, 217, 33, 0.35))',
          transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Enhanced background glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Enhanced gradient definitions */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9D921" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF6F00" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9D921" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1A1F2C" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9D921" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9D921" stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="iaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6F00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6F00" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Enhanced flow path */}
        <path
          ref={pathRef}
          d="M100,190 C160,120 220,280 350,200 C480,120 580,260 700,190"
          stroke="url(#flowGradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
        />
        
        {/* Connection paths */}
        <path
          d="M100,190 L100,250"
          stroke="#C9D921"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          opacity="0.6"
        />
        
        <path
          d="M350,200 L350,260"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          opacity="0.6"
        />
        
        <path
          d="M700,190 L700,250"
          stroke="#FF6F00"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          opacity="0.6"
        />
        
        {/* Intermediate path points */}
        <circle cx="230" cy="210" r="5" fill="#FFFFFF" opacity="0.7" filter="url(#softGlow)" />
        <circle cx="470" cy="180" r="5" fill="#FFFFFF" opacity="0.7" filter="url(#softGlow)" />
        <circle cx="580" cy="195" r="5" fill="#FFFFFF" opacity="0.7" filter="url(#softGlow)" />
        
        {/* Process nodes enhanced */}
        <circle cx="100" cy="190" r="40" fill="url(#processGradient)" stroke="#C9D921" strokeWidth="1.5" />
        <circle cx="350" cy="200" r="50" fill="url(#iaGradient)" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="700" cy="190" r="40" fill="url(#resultGradient)" stroke="#FF6F00" strokeWidth="1.5" />
        
        {/* Data particles flowing along the path - more particles and varied sizes */}
        <circle className="animate-flow-1" cx="0" cy="0" r="6" fill="#C9D921" filter="url(#glow)">
          <animateMotion
            path="M100,190 C160,120 220,280 350,200 C480,120 580,260 700,190"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle className="animate-flow-2" cx="0" cy="0" r="4" fill="#FFFFFF" filter="url(#glow)">
          <animateMotion
            path="M100,190 C160,120 220,280 350,200 C480,120 580,260 700,190"
            dur="4s"
            begin="0.8s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle className="animate-flow-3" cx="0" cy="0" r="5" fill="#FF6F00" filter="url(#glow)">
          <animateMotion
            path="M100,190 C160,120 220,280 350,200 C480,120 580,260 700,190"
            dur="6s"
            begin="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle className="animate-flow-1" cx="0" cy="0" r="3" fill="#C9D921" filter="url(#glow)">
          <animateMotion
            path="M100,190 C160,120 220,280 350,200 C480,120 580,260 700,190"
            dur="7s"
            begin="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle className="animate-flow-2" cx="0" cy="0" r="5" fill="#FFFFFF" filter="url(#glow)">
          <animateMotion
            path="M100,190 C160,120 220,280 350,200 C480,120 580,260 700,190"
            dur="5.5s"
            begin="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Enhanced floating icons with improved parallax effect */}
      <div 
        className="absolute left-[12%] top-[40%] transform -translate-x-1/2 -translate-y-1/2 animate-float z-20"
        style={{ 
          animationDelay: '0.2s',
          transform: `translate(calc(-50% + ${mousePosition.x * 15}px), calc(-50% + ${mousePosition.y * 15}px))`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="rounded-full p-5 backdrop-blur-md bg-nexlime/5 border border-nexlime/50 shadow-[0_0_15px_rgba(201,217,33,0.3)]">
          <Cog size={36} className="text-nexlime animate-spin-slow" />
        </div>
        <div className="mt-3 text-sm font-medium text-nexlime text-center">Processos</div>
        
        {/* Connected metrics */}
        <div className="absolute left-[120%] top-[50%] transform translate-y-[-50%]">
          <Badge variant="outline" className="bg-nexlime/20 border-nexlime/30 text-nexlime shadow-[0_0_10px_rgba(201,217,33,0.2)] px-3 py-1">
            <Zap size={14} className="mr-1" />
            <span>+200% produtividade</span>
          </Badge>
        </div>
      </div>
      
      <div 
        className="absolute left-1/2 top-[25%] transform -translate-x-1/2 -translate-y-1/2 animate-float z-20"
        style={{ 
          animationDelay: '0.8s',
          transform: `translate(calc(-50% + ${mousePosition.x * -12}px), calc(-50% + ${mousePosition.y * -12}px))`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="rounded-full p-6 backdrop-blur-md bg-white/10 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <Bot size={44} className="text-white animate-pulse-soft" />
        </div>
        <div className="mt-3 text-sm font-medium text-white text-center">IA</div>
        
        {/* Connected metrics */}
        <div className="absolute left-[110%] top-[0%]">
          <Badge variant="outline" className="bg-white/20 border-white/30 text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] px-3 py-1">
            <ChartBar size={14} className="mr-1" />
            <span>Análise avançada</span>
          </Badge>
        </div>
      </div>
      
      <div 
        className="absolute right-[15%] top-[45%] transform -translate-x-1/2 -translate-y-1/2 animate-float z-20"
        style={{ 
          animationDelay: '1.2s',
          transform: `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="rounded-full p-5 backdrop-blur-md bg-nexorange/5 border border-nexorange/50 shadow-[0_0_15px_rgba(255,111,0,0.3)]">
          <Check size={36} className="text-nexorange" />
        </div>
        <div className="mt-3 text-sm font-medium text-nexorange text-center">Resultado</div>
        
        {/* Connected metrics */}
        <div className="absolute right-[110%] top-[30%]">
          <Badge variant="outline" className="bg-nexorange/20 border-nexorange/30 text-nexorange shadow-[0_0_10px_rgba(255,111,0,0.2)] px-3 py-1">
            <Zap size={14} className="mr-1" />
            <span>+150% eficiência</span>
          </Badge>
        </div>
      </div>
      
      {/* Enhanced additional floating icons */}
      <div 
        className="absolute left-[35%] bottom-[20%] transform -translate-x-1/2 -translate-y-1/2 animate-float z-20"
        style={{ 
          animationDelay: '1.5s',
          transform: `translate(calc(-50% + ${mousePosition.x * -10}px), calc(-50% + ${mousePosition.y * -10}px))`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="rounded-full p-4 backdrop-blur-md bg-white/8 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          <Clock size={28} className="text-nexlime" />
        </div>
      </div>
      
      <div 
        className="absolute right-[30%] bottom-[30%] transform -translate-x-1/2 -translate-y-1/2 animate-float z-20"
        style={{ 
          animationDelay: '0.5s',
          transform: `translate(calc(-50% + ${mousePosition.x * 18}px), calc(-50% + ${mousePosition.y * 18}px))`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="rounded-full p-4 backdrop-blur-md bg-white/8 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          <MessageSquare size={28} className="text-nexorange" />
        </div>
      </div>
      
      {/* Enhanced central message */}
      <div 
        className="absolute bottom-6 w-full flex justify-center z-30"
        style={{ transform: `translateY(${mousePosition.y * 3}px)` }}
      >
        <div className="px-8 py-3 bg-white/8 backdrop-blur-md rounded-full border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="text-white font-medium">IA integrada ao seu <span className="text-nexlime font-semibold">processo</span></span>
        </div>
      </div>
      
      {/* Ambient glow effects */}
      <div className="absolute left-[15%] top-[40%] w-40 h-40 rounded-full bg-nexlime/5 filter blur-[80px] z-0"></div>
      <div className="absolute right-[15%] top-[45%] w-40 h-40 rounded-full bg-nexorange/5 filter blur-[80px] z-0"></div>
      <div className="absolute left-[50%] top-[25%] w-60 h-60 rounded-full bg-white/5 filter blur-[100px] z-0"></div>
    </div>
  );
};

export default TransformationFlow;
