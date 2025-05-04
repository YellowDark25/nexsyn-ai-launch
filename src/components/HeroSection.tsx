
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ensureLottiePlayerLoaded } from "../utils/lottieLoader";
import { Card, CardContent } from "./ui/card";

const HeroSection = () => {
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Load lottie player
  useEffect(() => {
    const loadLottie = async () => {
      try {
        await ensureLottiePlayerLoaded();
        setLottieLoaded(true);
      } catch (error) {
        console.error("Could not load lottie:", error);
      }
    };
    loadLottie();
  }, []);

  // Animation on load
  useEffect(() => {
    // Small delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Função para criar efeito de partículas aprimorado
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Limpar partículas existentes
    const existingParticles = heroSection.querySelectorAll(".particle");
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
  
  return <section id="home" className="relative min-h-screen bg-gradient-to-br from-[#15191F] to-[#1A1F2C] flex items-center pt-20 overflow-hidden">
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
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-nexlime to-nexlime/80 bg-clip-text text-transparent transition-all animate-pulse-soft">
                  Sua empresa está perdendo tempo com tarefas manuais?
                </span>
                <br />
                <span 
                  className="bg-gradient-to-r from-nexorange to-nexorange/80 bg-clip-text text-transparent mt-4 block transition-all"
                  style={{animationDelay: '0.2s'}}
                >
                  A Nexsyn aplica inteligência Artificial onde realmente importa: nos processos que te custam tempo, energia e dinheiro.
                </span>
              </h1>
              
              <Card className="glass-morphism mb-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <p className="text-xl md:text-2xl font-medium text-white">
                    Consultoria estratégica para integrar procesos, eliminar retrabalho, automatizar operações e destravar o crescimento da sua empresa
                  </p>
                </CardContent>
              </Card>
              
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <div className="w-10 h-10 rounded-full bg-nexlime/20 flex items-center justify-center text-nexlime">
                  🎯
                </div>
                <p className="text-lg md:text-xl text-gray-300">
                  Descubra como a IA pode gerar lucro na sua empresa
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contato" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-nexorange to-nexorange/90 hover:from-nexorange/90 hover:to-nexorange text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,111,0,0.5)] group relative overflow-hidden"
                >
                  <span className="relative z-10">Agende agora. é GRÁTIS</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></div>
                </a>
                
                <a 
                  href="#vsl" 
                  className="inline-flex items-center justify-center bg-transparent border-2 border-nexlime hover:bg-nexlime/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,217,33,0.3)]"
                >
                  Assista o vídeo
                </a>
              </div>
            </div>
          </div>
          
          <div 
            className={`w-full md:w-1/2 flex justify-center transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="w-full max-w-md relative animate-float glass-morphism p-6 rounded-2xl">
              {lottieLoaded ? (
                <lottie-player 
                  src="https://lottie.host/d30aa13c-5e48-415e-b057-f059a0a674b2/6HPj8ElGhm.json" 
                  background="transparent" 
                  speed="1" 
                  style={{
                    width: "100%",
                    height: "400px"
                  }} 
                  loop 
                  autoplay
                ></lottie-player>
              ) : (
                <div className="flex items-center justify-center w-full h-[400px] bg-gray-800/30 backdrop-blur-sm rounded-lg animate-pulse">
                  <p className="text-gray-400">Carregando animação...</p>
                </div>
              )}
              
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
    </section>;
};

export default HeroSection;
