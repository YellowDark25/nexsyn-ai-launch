
import React, { useEffect, useRef, useState } from "react";
import { Search, CalendarCheck, Compass, Headphones } from "lucide-react";
import { ensureLottiePlayerLoaded } from "../utils/lottieLoader";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const SolutionStep = ({ number, title, description, icon: Icon, delay }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-up");
              entry.target.classList.remove("opacity-0");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={stepRef}
      className="flex flex-col md:flex-row items-start md:items-center gap-4 opacity-0 transform"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-nexorange text-white font-bold text-xl shrink-0">
        {number}
      </div>
      
      <div className="bg-[#222632] p-6 rounded-xl shadow-md w-full md:flex items-center border border-gray-800">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0 md:mr-6">
          <div className="w-14 h-14 rounded-full bg-nexblue/20 flex items-center justify-center">
            <Icon size={24} className="text-nexblue" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SolutionSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieError, setLottieError] = useState(false);

  // Load lottie player
  useEffect(() => {
    const loadLottie = async () => {
      try {
        await ensureLottiePlayerLoaded();
        setLottieLoaded(true);
      } catch (error) {
        console.error("Could not load lottie:", error);
        setLottieError(true);
      }
    };
    
    loadLottie();
    
    // Set a timeout to show placeholder if lottie takes too long
    const timeoutId = setTimeout(() => {
      if (!lottieLoaded) {
        console.warn("Lottie animation taking too long to load");
        setLottieError(true);
      }
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scale-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section id="solucao" className="py-20 bg-[#15191F]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            A <span className="text-nexorange">solução Nexsyn</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Implementamos inteligência artificial de forma prática, rápida e focada em resultados.
            Nossa metodologia simplifica o complexo e entrega valor desde o primeiro dia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div 
            ref={imageRef} 
            className="order-2 md:order-1 opacity-0"
          >
            {lottieLoaded && !lottieError ? (
              <lottie-player 
                src="https://lottie.host/5ec35c0e-7117-41bc-b95a-c98c2fe7e710/mT4nhbhArE.json"
                background="transparent"
                speed="1"
                style={{ width: "100%", height: "400px" }}
                loop
                autoplay
              ></lottie-player>
            ) : (
              <div className="flex items-center justify-center w-full h-[400px] bg-[#222632] rounded-lg border border-gray-800">
                <p className="text-gray-400">
                  {lottieError ? "Não foi possível carregar a animação" : "Carregando animação..."}
                </p>
              </div>
            )}
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Transformamos complexidade em clareza
            </h3>
            
            <p className="text-lg mb-6 text-gray-300">
              Nossa abordagem conecta sua operação atual com as possibilidades da inteligência artificial, 
              criando uma <span className="font-semibold text-white">ponte entre desafios reais e soluções inteligentes</span>.
            </p>
            
            <p className="text-lg mb-6 text-gray-300">
              Ao contrário de consultores que apenas indicam ferramentas ou desenvolvedores que apenas criam código, 
              nós focamos em <span className="font-semibold text-white">resultados mensuráveis para o seu negócio</span>.
            </p>
            
            <a href="#contato" className="inline-flex items-center bg-nexorange hover:bg-nexorange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              Quero implementar na minha empresa
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <SolutionStep 
            number={1}
            title="Diagnóstico"
            description="Mapeamento completo dos pontos onde a IA pode trazer maior impacto para seu negócio, com análise de custo-benefício."
            icon={Search}
            delay={0}
          />
          
          <SolutionStep 
            number={2}
            title="Planejamento"
            description="Definição clara das soluções, ferramentas e processos, com cronograma de implementação e métricas de sucesso."
            icon={CalendarCheck}
            delay={200}
          />
          
          <SolutionStep 
            number={3}
            title="Execução"
            description="Implementação rápida com equipe especializada ou orientação passo a passo para sua equipe interna."
            icon={Compass}
            delay={400}
          />
          
          <SolutionStep 
            number={4}
            title="Suporte contínuo"
            description="Acompanhamento dos resultados e ajustes necessários, garantindo que a tecnologia continue gerando valor ao longo do tempo."
            icon={Headphones}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
