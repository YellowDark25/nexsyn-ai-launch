
import React, { useEffect, useState } from "react";
import { createLottiePlayerElement, ensureLottiePlayerLoaded } from "../utils/lottieLoader";
import solutionAnimation from "../assets/animations/solution-animation.json";

const SolutionSection = () => {
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const lottieRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLottie = async () => {
      try {
        await ensureLottiePlayerLoaded();
        
        if (lottieRef.current) {
          // Clear previous content
          lottieRef.current.innerHTML = '';
          
          const player = createLottiePlayerElement(solutionAnimation, {
            width: "100%",
            height: "100%",
            loop: true,
            autoplay: true,
            speed: "1"
          });
          
          lottieRef.current.appendChild(player);
          setLottieLoaded(true);
        }
      } catch (error) {
        console.error("Could not load lottie animation:", error);
        setLottieError(true);
      }
    };

    loadLottie();
  }, []);

  return (
    <section id="solucoes" className="relative py-24 bg-gradient-to-b from-[#222632] to-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            <span className="bg-gradient-to-r from-nexlime to-nexlime/80 bg-clip-text text-transparent">
              Nossas Soluções
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Metodologia comprovada para aplicar Inteligência Artificial onde realmente importa para o seu negócio.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Animação */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md h-[400px] relative glass-morphism rounded-xl p-6">
              {/* Lottie container */}
              <div 
                ref={lottieRef} 
                className="w-full h-full flex items-center justify-center"
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
            </div>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2">
            <div className="neo-blur p-8 rounded-xl">
              <h3 className="text-3xl font-bold mb-6 text-white">
                Transformação Digital Estratégica
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 p-2 bg-nexlime/20 text-nexlime rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 text-white">Diagnóstico Personalizado</h4>
                    <p className="text-gray-300">Avaliação detalhada dos seus processos para identificar oportunidades de automação com IA</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 p-2 bg-nexorange/20 text-nexorange rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 text-white">Desenvolvimento Sob Medida</h4>
                    <p className="text-gray-300">Implementação de soluções de IA customizadas para suas necessidades específicas</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 p-2 bg-nexlime/20 text-nexlime rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 text-white">Integração Sem Rupturas</h4>
                    <p className="text-gray-300">Implementação suave com seus sistemas atuais, sem interrupções no seu negócio</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
