
import React from "react";
import { Bug, Clock, Users } from "lucide-react";
import { ScrollReveal } from "./ui/scroll-reveal";
import { motion } from "framer-motion";

const ProblemCard = ({ icon: Icon, title, description, index }: {
  icon: React.ElementType,
  title: string,
  description: string,
  index: number
}) => {
  return (
    <ScrollReveal 
      delay={index * 100}
      animation="fade-up"
      className="w-full"
    >
      <motion.div 
        className="card-hover bg-[#222632] rounded-xl p-6 shadow-md border border-gray-800 h-full"
        whileHover={{ 
          y: -10, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
          borderColor: "rgba(255,111,0,0.3)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="rounded-full bg-nexorange/20 p-3 inline-flex mb-4"
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "rgba(255,111,0,0.3)" 
          }}
        >
          <Icon size={28} className="text-nexorange" />
        </motion.div>
        <motion.h3 
          className="text-xl font-bold mb-3 text-white"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, textShadow: "0 0 8px rgba(255,111,0,0.3)" }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-300"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </ScrollReveal>
  );
};

const ProblemSection = () => {
  const problems = [
    {
      icon: Bug,
      title: "Frustração com ferramentas",
      description: "Muitas ferramentas prometem IA, mas não entregam resultados práticos ou exigem conhecimento técnico que a maioria das empresas não tem."
    },
    {
      icon: Clock,
      title: "Falta de tempo",
      description: "Implementar IA exige dedicação e experimentação. A maioria dos gestores não consegue dedicar meses para encontrar a solução certa."
    },
    {
      icon: Users,
      title: "Equipe despreparada",
      description: "Contratar especialistas em IA é caro e criar conhecimento interno pode demorar anos, atrasando a inovação e resultados."
    }
  ];
  
  return (
    <section id="problema" className="py-20 bg-[#1A1F2C]">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal animation="fade-down" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexorange">A dor real</span> das empresas com IA
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Lidamos diariamente com empresas que investiram em promessas de IA que não entregaram resultados.
            Identificamos os 3 principais problemas:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <ProblemCard 
              key={problem.title}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
              index={index}
            />
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={300} className="mt-12 text-center">
          <motion.p 
            className="text-lg md:text-xl font-semibold text-nexorange"
            whileInView={{ 
              textShadow: ["0 0 0px rgba(255,111,0,0)", "0 0 8px rgba(255,111,0,0.5)", "0 0 0px rgba(255,111,0,0)"]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            Esses desafios impedem que sua empresa capture o verdadeiro valor da Inteligência Artificial.
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemSection;
