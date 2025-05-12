
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ui/scroll-reveal";

const ResultsSection = () => {
  const [position, setPosition] = useState(0);
  
  const slideLeft = () => {
    if (position > 0) setPosition(position - 1);
  };
  
  const slideRight = () => {
    if (position < 1) setPosition(position + 1);
  };

  const beforeAfterContent = [{
    title: "Atendimento ao cliente",
    before: {
      title: "Antes da IA",
      points: ["Atrasos de horas para responder clientes", "Equipe sobrecarregada e estressada", "Inconsistência nas respostas", "Perda de vendas por demora"]
    },
    after: {
      title: "Com a IA da Nexsyn",
      points: ["Respostas instantâneas 24/7", "Equipe focada em casos complexos", "Comunicação padronizada e eficiente", "Aumento de 30% em conversões"]
    }
  }, {
    title: "Gestão de documentos",
    before: {
      title: "Antes da IA",
      points: ["Horas perdidas buscando informações", "Documentos duplicados e desorganizados", "Dificuldade para encontrar dados", "Erros de versão e compliance"]
    },
    after: {
      title: "Com a IA da Nexsyn",
      points: ["Busca inteligente e instantânea", "Organização automática", "Extração de dados em segundos", "Controle total de versões e acessos"]
    }
  }];
  
  const content = beforeAfterContent[position];
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const [slideDirection, setSlideDirection] = useState(0);

  const handleSlide = (newDirection: number) => {
    setSlideDirection(newDirection);
    if (newDirection > 0) {
      slideRight();
    } else {
      slideLeft();
    }
  };

  return (
    <section id="resultados" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal animation="fade-down" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nexorange">
            <span className="text-nexblue">Antes e Depois</span> com IA
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Veja a transformação que a IA aplicada de forma estratégica pode trazer para a sua operação
          </p>
        </ScrollReveal>

        <ScrollReveal animation="zoom-in">
          <motion.div 
            className="relative bg-[#0E141F] rounded-2xl shadow-lg p-6 md:p-10 overflow-hidden"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="absolute top-6 right-6 flex space-x-2">
              <motion.button 
                onClick={() => handleSlide(-1)} 
                disabled={position === 0} 
                className={`p-2 rounded-full transition-colors ${position === 0 ? 'bg-gray-600 text-gray-400' : 'bg-nexblue text-white'}`} 
                aria-label="Slide anterior"
                whileHover={position !== 0 ? { scale: 1.1 } : {}}
                whileTap={position !== 0 ? { scale: 0.9 } : {}}
              >
                <ArrowLeft size={20} />
              </motion.button>
              <motion.button 
                onClick={() => handleSlide(1)} 
                disabled={position === beforeAfterContent.length - 1} 
                className={`p-2 rounded-full transition-colors ${position === beforeAfterContent.length - 1 ? 'bg-gray-600 text-gray-400' : 'bg-nexblue text-white'}`} 
                aria-label="Próximo slide"
                whileHover={position !== beforeAfterContent.length - 1 ? { scale: 1.1 } : {}}
                whileTap={position !== beforeAfterContent.length - 1 ? { scale: 0.9 } : {}}
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>

            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={position}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
                <h3 className="text-2xl font-bold mb-8 text-white">
                  {content.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-[#1A1F2C] rounded-xl p-6 shadow-md border border-red-300/20"
                    whileHover={{ 
                      y: -5, 
                      borderColor: "rgba(239, 68, 68, 0.4)",
                      boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.2)"
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <h4 className="font-bold text-lg text-white">{content.before.title}</h4>
                    </div>
                    
                    <ul className="space-y-4">
                      {content.before.points.map((point, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 3 }}
                        >
                          <XCircle className="text-red-400 h-6 w-6 mr-3 mt-0.5 shrink-0" />
                          <span className="text-gray-200 font-medium">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-[#1A1F2C] rounded-xl p-6 shadow-md border border-green-300/20"
                    whileHover={{ 
                      y: -5, 
                      borderColor: "rgba(34, 197, 94, 0.4)",
                      boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.2)"
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <h4 className="font-bold text-lg text-white">{content.after.title}</h4>
                    </div>
                    
                    <ul className="space-y-4">
                      {content.after.points.map((point, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                          whileHover={{ x: 3 }}
                        >
                          <CheckCircle className="text-green-400 h-6 w-6 mr-3 mt-0.5 shrink-0" />
                          <span className="text-gray-200 font-medium">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up" delay={300} className="mt-10 text-center">
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 font-medium mb-6">
            Estamos transformando empresas como a sua todos os dias. Você pode ser o próximo.
          </p>
          <motion.a 
            href="#contato" 
            className="inline-flex items-center bg-nexorange hover:bg-nexorange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(255, 111, 0, 0.4)"
            }}
            whileTap={{ scale: 0.97 }}
          >
            Quero transformar minha empresa
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResultsSection;
