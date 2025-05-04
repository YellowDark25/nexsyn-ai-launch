
import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { createLottiePlayerElement, ensureLottiePlayerLoaded } from "../utils/lottieLoader";
import heroAnimation from "../assets/animations/hero-animation.json";

const HeroSection = () => {
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLElement | null>(null);

  // Animation on load
  useEffect(() => {
    // Small delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Load lottie player
  useEffect(() => {
    const loadLottie = async () => {
      try {
        await ensureLottiePlayerLoaded();
        
        // Make sure lottieRef is still valid (component hasn't unmounted)
        if (!lottieRef.current) return;
        
        // Safely remove previous content
        if (playerRef.current) {
          try {
            playerRef.current.remove();
          } catch (e) {
            console.error("Error removing previous lottie player:", e);
          }
          playerRef.current = null;
        }
        
        const player = createLottiePlayerElement(heroAnimation, {
          width: "100%",
          height: "100%",
          loop: true,
          autoplay: true,
          speed: "1"
        });
        
        // Store reference to player
        playerRef.current = player;
        
        // Append to container
        lottieRef.current.appendChild(player);
        setLottieLoaded(true);
        setLottieError(false);
      } catch (error) {
        console.error("Could not load lottie:", error);
        setLottieError(true);
      }
    };
    
    loadLottie();
    
    // Cleanup function
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.remove();
        } catch (e) {
          console.error("Error removing lottie player on unmount:", e);
        }
        playerRef.current = null;
      }
    };
  }, []);
  
  // Função para criar efeito de partículas aprimorado
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Limpar partículas existentes
    const existingParticles = heroSection.querySelectorAll(".particle, .geometric-shape");
    existingParticles.forEach(p => p.remove());

    // Criar partículas - alternando entre laranja e verde com melhor harmonia
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Tamanho variável para mais dinamismo
      const size = Math.random() * 12 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Posição aleatória
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;

      // Opacidade variável
      particle.style.opacity = (Math.random() * 0.6 + 0.1).toString();
      
      // Forma variável (círculo ou quadrado suavizado)
      const borderRadius = Math.random() > 0.5 ? '50%' : '30%';
      particle.style.borderRadius = borderRadius;

      // Cores aprimoradas com gradientes sutis
      if (i % 3 === 0) {
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.4), rgba(201, 217, 33, 0.2))";
      } else if (i % 3 === 1) {
        particle.style.background = "linear-gradient(135deg, rgba(255, 111, 0, 0.4), rgba(255, 111, 0, 0.2))";
      } else {
        particle.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))";
      }

      // Adicionar ao container
      heroSection.appendChild(particle);

      // Animação aprimorada
      animateParticle(particle);
    }
    
    // Adicionar elementos geométricos flutuantes
    const addGeometricElements = () => {
      const shapes = [
        { type: 'triangle', color: 'rgba(201, 217, 33, 0.15)' },
        { type: 'square', color: 'rgba(255, 111, 0, 0.15)' },
        { type: 'circle', color: 'rgba(255, 255, 255, 0.1)' }
      ];
      
      for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[i % shapes.length];
        
        shape.classList.add('geometric-shape');
        shape.style.position = 'absolute';
        
        const size = Math.random() * 80 + 40;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        shape.style.left = `${Math.random() * 80 + 10}%`;
        shape.style.top = `${Math.random() * 80 + 10}%`;
        
        shape.style.opacity = '0.15';
        shape.style.background = shapeType.color;
        
        if (shapeType.type === 'triangle') {
          shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if (shapeType.type === 'square') {
          shape.style.borderRadius = '15%';
        } else {
          shape.style.borderRadius = '50%';
        }
        
        shape.style.zIndex = '0';
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Adicionar animação
        const animation = shape.animate([
          { transform: `rotate(0deg) translate(0, 0)` },
          { transform: `rotate(${Math.random() * 360}deg) translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)` }
        ], {
          duration: 15000 + Math.random() * 10000,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out'
        });
        
        heroSection.appendChild(shape);
      }
    };
    
    addGeometricElements();
    
    function animateParticle(particle: HTMLElement) {
      // Movimento mais orgânico e fluido
      const xMove = Math.random() * 8 - 4;
      const yMove = Math.random() * 8 - 4;
      const rotation = Math.random() * 180;
      const duration = Math.random() * 15000 + 10000;
      
      const animation = particle.animate([
        {
          transform: "translate(0, 0) rotate(0deg)",
          opacity: particle.style.opacity
        }, 
        {
          transform: `translate(${xMove * 100}px, ${yMove * 100}px) rotate(${rotation}deg)`,
          opacity: (parseFloat(particle.style.opacity) * 0.7).toString()
        }
      ], {
        duration,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out"
      });
    }
    
    return () => {
      // Limpar partículas ao desmontar
      const particles = document.querySelectorAll(".particle, .geometric-shape");
      particles.forEach(p => p.remove());
    };
  }, []);
  
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#15191F] to-[#1A1F2C] flex items-center pt-20 overflow-hidden">
      {/* Background animado com gradiente */}
      <div id="hero-background" className="absolute inset-0 particle-container z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div 
            className={`w-full md:w-1/2 mb-10 md:mb-0 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="neo-blur p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute -top-28 -right-28 w-56 h-56 bg-nexorange/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-28 -left-28 w-56 h-56 bg-nexlime/20 rounded-full blur-3xl"></div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-nexlime to-nexlime/80 bg-clip-text text-transparent block mb-2">
                  🟢 Sua empresa está perdendo tempo com tarefas manuais?
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl font-medium mb-6">
                <span className="flex items-start">
                  <span className="text-3xl mr-2">🧠</span>
                  <span>A <span className="text-nexorange font-bold">Nexsyn aplica Inteligência Artificial</span> onde realmente importa:</span>
                </span>
                <span className="block mt-2 text-gray-300">
                  <span className="flex items-center">
                    <span className="text-nexorange mr-2">➡️</span> 
                    <span>Nos processos que te custam <br />tempo, energia e dinheiro.</span>
                  </span>
                </span>
              </h2>
              
              <div className="glass-morphism p-4 rounded-xl mb-6">
                <h3 className="text-xl font-medium mb-3 flex items-center">
                  <span className="mr-2">✨</span>
                  <span>Consultoria estratégica com IA:</span>
                </h3>
                
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-nexlime mr-2">✔️</span>
                    <span>Integra processos desconectados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-nexlime mr-2">✔️</span>
                    <span>Elimina retrabalho e erros manuais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-nexlime mr-2">✔️</span>
                    <span>Automatiza tarefas críticas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-nexlime mr-2">✔️</span>
                    <span>Libera tempo e energia da sua equipe</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a 
                  href="#contato" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-nexorange to-nexorange/90 hover:from-nexorange/90 hover:to-nexorange text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,111,0,0.5)] group relative overflow-hidden"
                >
                  <span className="relative z-10">Agende agora. é GRÁTIS</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></div>
                </a>
                
                <a 
                  href="#vsl" 
                  className="inline-flex items-center justify-center bg-transparent border-2 border-nexlime hover:bg-nexlime/10 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,217,33,0.3)]"
                >
                  <Play className="mr-2" size={20} />
                  <span>Assista o vídeo</span>
                </a>
              </div>
            </div>
          </div>
          
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
        </div>
      </div>
      
      {/* Forma decorativa com as cores da marca */}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#222632" d="M0,10 C300,60 600,80 900,50 C1200,20 1440,40 1440,80 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
