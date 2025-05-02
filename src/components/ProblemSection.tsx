
import React, { useEffect, useRef } from "react";
import { Bug, Clock, Users } from "lucide-react";

const ProblemCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType,
  title: string,
  description: string
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="card-hover bg-white rounded-xl p-6 shadow-md opacity-0 transform transition duration-500"
    >
      <div className="rounded-full bg-nexlime/20 p-3 inline-flex mb-4">
        <Icon size={28} className="text-nexblue" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ProblemSection = () => {
  return (
    <section id="problema" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexblue">A dor real</span> das empresas com IA
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Lidamos diariamente com empresas que investiram em promessas de IA que não entregaram resultados.
            Identificamos os 3 principais problemas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProblemCard 
            icon={Bug}
            title="Frustração com ferramentas"
            description="Muitas ferramentas prometem IA, mas não entregam resultados práticos ou exigem conhecimento técnico que a maioria das empresas não tem."
          />
          
          <ProblemCard 
            icon={Clock}
            title="Falta de tempo"
            description="Implementar IA exige dedicação e experimentação. A maioria dos gestores não consegue dedicar meses para encontrar a solução certa."
          />
          
          <ProblemCard 
            icon={Users}
            title="Equipe despreparada"
            description="Contratar especialistas em IA é caro e criar conhecimento interno pode demorar anos, atrasando a inovação e resultados."
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg md:text-xl font-semibold text-nexblue">
            Esses desafios impedem que sua empresa capture o verdadeiro valor da Inteligência Artificial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
