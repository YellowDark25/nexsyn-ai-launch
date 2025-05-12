
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ResultsSection = () => {
  const [position, setPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (position > 0) setPosition(position - 1);
  };

  const slideRight = () => {
    if (position < 1) setPosition(position + 1);
  };

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const beforeAfterContent = [
    {
      title: "Atendimento ao cliente",
      before: {
        title: "Antes da IA",
        points: [
          "Atrasos de horas para responder clientes",
          "Equipe sobrecarregada e estressada",
          "Inconsistência nas respostas",
          "Perda de vendas por demora"
        ]
      },
      after: {
        title: "Com a IA da Nexsyn",
        points: [
          "Respostas instantâneas 24/7",
          "Equipe focada em casos complexos",
          "Comunicação padronizada e eficiente",
          "Aumento de 30% em conversões"
        ]
      }
    },
    {
      title: "Gestão de documentos",
      before: {
        title: "Antes da IA",
        points: [
          "Horas perdidas buscando informações",
          "Documentos duplicados e desorganizados",
          "Dificuldade para encontrar dados",
          "Erros de versão e compliance"
        ]
      },
      after: {
        title: "Com a IA da Nexsyn",
        points: [
          "Busca inteligente e instantânea",
          "Organização automática",
          "Extração de dados em segundos",
          "Controle total de versões e acessos"
        ]
      }
    }
  ];

  const content = beforeAfterContent[position];

  return (
    <section id="resultados" className="py-20 bg-white">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 md:px-8 opacity-0"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexblue">Antes e Depois</span> com IA
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Veja a transformação que a IA aplicada de forma estratégica pode trazer para a sua operação
          </p>
        </div>

        <div className="relative bg-[#0E141F] rounded-2xl shadow-lg p-6 md:p-10 overflow-hidden">
          <div className="absolute top-6 right-6 flex space-x-2">
            <button 
              onClick={slideLeft} 
              disabled={position === 0}
              className={`p-2 rounded-full ${position === 0 ? 'bg-gray-600 text-gray-400' : 'bg-nexblue text-white'}`}
              aria-label="Slide anterior"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={slideRight} 
              disabled={position === beforeAfterContent.length - 1}
              className={`p-2 rounded-full ${position === beforeAfterContent.length - 1 ? 'bg-gray-600 text-gray-400' : 'bg-nexblue text-white'}`}
              aria-label="Próximo slide"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <h3 className="text-2xl font-bold mb-8 text-white">
            {content.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1F2C] rounded-xl p-6 shadow-md border border-red-300/20 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <h4 className="font-bold text-lg text-white">{content.before.title}</h4>
              </div>
              
              <ul className="space-y-4">
                {content.before.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-red-800/30 text-red-300 h-6 w-6 mr-3 mt-0.5 shrink-0 text-xs">✕</span>
                    <span className="text-gray-200 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#1A1F2C] rounded-xl p-6 shadow-md border border-green-300/20 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h4 className="font-bold text-lg text-white">{content.after.title}</h4>
              </div>
              
              <ul className="space-y-4">
                {content.after.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-green-800/30 text-green-300 h-6 w-6 mr-3 mt-0.5 shrink-0 text-xs">✓</span>
                    <span className="text-gray-200 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-lg font-medium mb-6">
            Estamos transformando empresas como a sua todos os dias. Você pode ser o próximo.
          </p>
          <a 
            href="#contato" 
            className="inline-flex items-center bg-nexorange hover:bg-nexorange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Quero transformar minha empresa
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
