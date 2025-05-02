
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  // Função para criar efeito de partículas
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Criar partículas
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      
      // Tamanho aleatório
      const size = Math.random() * 8 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posição aleatória
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Opacidade aleatória
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      
      // Adicionar ao container
      heroSection.appendChild(particle);
      
      // Animação
      animateParticle(particle);
    }

    function animateParticle(particle: HTMLElement) {
      // Movimento aleatório
      const xMove = Math.random() * 4 - 2;
      const yMove = Math.random() * 4 - 2;
      const duration = Math.random() * 10000 + 5000;
      
      const animation = particle.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${xMove * 100}px, ${yMove * 100}px)` },
        ],
        {
          duration,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        }
      );
      
      // Conexões entre partículas seriam mais complexas e exigiriam canvas
    }
    
    return () => {
      // Limpar partículas ao desmontar
      const particles = document.querySelectorAll(".particle");
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-nexbg flex items-center pt-20 overflow-hidden">
      {/* Background animado */}
      <div id="hero-background" className="absolute inset-0 particle-container z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-nexorange">Inteligência Artificial</span> que<br />
              <span className="text-nexblue">realmente gera resultados</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
              Você quer aplicar IA, mas se perde em ferramentas e promessas vazias?<br />
              <span className="font-bold">Nós aplicamos por você.</span>
            </h2>
            
            <p className="text-lg md:text-xl mb-8 md:mb-10">
              Em até <span className="font-bold text-nexorange">15 dias</span>, sua empresa estará operando com 
              inteligência real, sem que você precise aprender nada técnico.
            </p>
            
            <a 
              href="#contato" 
              className="inline-flex items-center bg-nexorange hover:bg-nexorange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg group"
            >
              Quero meu diagnóstico gratuito
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md relative animate-float">
              <lottie-player 
                src="https://lottie.host/d30aa13c-5e48-415e-b057-f059a0a674b2/6HPj8ElGhm.json"
                background="transparent"
                speed="1"
                style={{ width: "100%", height: "400px" }}
                loop
                autoplay
              ></lottie-player>
              
              <div className="absolute -bottom-4 w-full h-10 bg-gradient-to-t from-nexbg to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Forma decorativa */}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-nexbg z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#F1F5F5" d="M0,10 C300,60 600,80 900,50 C1200,20 1440,40 1440,80 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
