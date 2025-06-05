import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ui/scroll-reveal";
import { cn } from "@/lib/utils";

const ResultsSection = () => {
  const [position, setPosition] = useState(0);
  
  const slideLeft = () => {
    setPosition((prev) => (prev === 0 ? beforeAfterContent.length - 1 : prev - 1));
    setSlideDirection(-1);
  };
  
  const slideRight = () => {
    setPosition((prev) => (prev === beforeAfterContent.length - 1 ? 0 : prev + 1));
    setSlideDirection(1);
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

  return (
    <section id="resultados" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51]">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ6IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal animation="fade-down" className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400">
            Antes e Depois com <span className="text-white">IA</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Veja a transformação que a IA aplicada de forma estratégica pode trazer para a sua operação
          </p>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">

            <div className="absolute top-4 md:top-10 right-4 md:right-10 flex space-x-2 z-20">
              <motion.button
                onClick={slideLeft}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  position === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-nexblue hover:bg-nexblue/80 text-white"
                )}
                disabled={position === 0}
                aria-label="Slide anterior"
                whileHover={position !== 0 ? { scale: 1.1 } : {}}
                whileTap={position !== 0 ? { scale: 0.9 } : {}}
              >
                <ArrowLeft size={20} />
              </motion.button>
              <motion.button
                onClick={slideRight}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  position === beforeAfterContent.length - 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-nexblue hover:bg-nexblue/80 text-white"
                )}
                disabled={position === beforeAfterContent.length - 1}
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
                ease: "easeInOut",
              }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-8 text-white text-center md:text-left">
                {content.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                    <h4 className="font-bold text-lg text-white">{content.before.title}</h4>
                  </div>
                  
                  <ul className="space-y-4">
                    {content.before.points.map((point, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start text-gray-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <XCircle className="text-red-400 h-5 w-5 mr-3 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                    <h4 className="font-bold text-lg text-white">{content.after.title}</h4>
                  </div>
                  
                  <ul className="space-y-4">
                    {content.after.points.map((point, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start text-gray-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.4 }}
                      >
                        <CheckCircle className="text-green-400 h-5 w-5 mr-3 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

           <div className="flex justify-center space-x-2 mt-8">
            {beforeAfterContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setPosition(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  position === index ? "bg-gradient-to-r from-orange-400 to-amber-400 w-8 scale-110" : "bg-gray-600/50 hover:bg-gray-500/70 w-3"
                )}
                aria-label={`Ver slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        <ScrollReveal animation="fade-up" delay={300} className="mt-16 text-center">
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 font-medium mb-8">
            Estamos transformando empresas como a sua todos os dias. Você pode ser o próximo.
          </p>
          <motion.a
            href="#contato"
            className="inline-flex items-center bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quero transformar minha empresa
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResultsSection;
