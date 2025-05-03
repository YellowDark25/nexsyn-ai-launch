import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ensureLottiePlayerLoaded } from "../utils/lottieLoader";
const HeroSection = () => {
  const [lottieLoaded, setLottieLoaded] = useState(false);

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

  // Função para criar efeito de partículas
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Criar partículas - alternando entre laranja e verde
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

      // Alternando cores entre laranja e verde para as partículas
      if (i % 3 === 0) {
        particle.style.background = "rgba(201, 217, 33, 0.3)"; // Verde #C9D921
      } else {
        particle.style.background = "rgba(255, 111, 0, 0.3)"; // Laranja #FF6F00
      }

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
      const animation = particle.animate([{
        transform: "translate(0, 0)"
      }, {
        transform: `translate(${xMove * 100}px, ${yMove * 100}px)`
      }], {
        duration,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out"
      });
    }
    return () => {
      // Limpar partículas ao desmontar
      const particles = document.querySelectorAll(".particle");
      particles.forEach(p => p.remove());
    };
  }, []);
  return <section id="home" className="relative min-h-screen bg-[#15191F] flex items-center pt-20 overflow-hidden">
      {/* Background animado */}
      <div id="hero-background" className="absolute inset-0 particle-container z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-16 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
              <span className="text-[#c9d921]">Você quer aplicar IA no seu negócio,</span><br />
              <span className="text-[#c9d921]">mas não sabe por onde começar?</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-white">
              Nós aplicamos por você. Em até <span className="text-nexorange font-bold">15 dias</span>, sua empresa já estará colhendo os resultados.
            </p>
            
            <p className="text-lg md:text-xl mb-8 md:mb-10 text-gray-300">
              🎯 Descubra como a IA pode gerar lucro na sua empresa
            </p>
            
            <a href="#contato" className="inline-flex items-center bg-nexorange hover:bg-nexorange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg group">
              Agende agora. é GRÁTIS
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md relative animate-float">
              {lottieLoaded ? <lottie-player src="https://lottie.host/d30aa13c-5e48-415e-b057-f059a0a674b2/6HPj8ElGhm.json" background="transparent" speed="1" style={{
              width: "100%",
              height: "400px"
            }} loop autoplay></lottie-player> : <div className="flex items-center justify-center w-full h-[400px] bg-gray-800 rounded-lg animate-pulse">
                  <p className="text-gray-400">Carregando animação...</p>
                </div>}
              
              <div className="absolute -bottom-4 w-full h-10 bg-gradient-to-t from-[#15191F] to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Forma decorativa com as cores da marca */}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-[#15191F] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#222632" d="M0,10 C300,60 600,80 900,50 C1200,20 1440,40 1440,80 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>;
};
export default HeroSection;