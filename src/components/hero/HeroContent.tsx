
import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroContent = ({ isVisible }: { isVisible: boolean }) => {
  // Variants para animações staggered
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
        {/* Subtle inner glow effects */}
        <div className="absolute -top-28 -right-28 w-64 h-64 bg-nexorange/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-nexlime/20 rounded-full blur-3xl"></div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
        >
          <span className="bg-gradient-to-r from-nexlime to-nexlime/80 bg-clip-text text-transparent block mb-2">
            Sua empresa está perdendo tempo com tarefas manuais?
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-nexwhite font-normal font-poppins text-lg mb-5 opacity-90"
        >
          👨‍💼 Para donos de pequenas e médias empresas que querem mais eficiência e menos retrabalho.
        </motion.p>
        
        <motion.h2 
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium mb-6"
        >
          <span className="flex items-start">
            <span className="text-3xl mr-2">🧠</span>
            <span>A <span className="text-nexorange font-bold">Nexsyn aplica Inteligência Artificial</span> onde realmente importa:</span>
          </span>
          <span className="block mt-2 text-gray-300">
            <span className="flex items-center">
              <span className="text-nexorange mr-2">➡️</span> 
              <span>Nos processos que te custam <br />tempo, energia e dinheiro.</span>
            </span>
          </span>
        </motion.h2>
        
        {/* Improved card with subtle glassmorphism */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 mb-6 shadow-[0_10px_30px_-15px_rgba(201,217,33,0.2)]"
          whileHover={{ 
            y: -5,
            boxShadow: "0 15px 30px -10px rgba(201,217,33,0.3)",
            borderColor: "rgba(255,255,255,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <h3 className="text-xl font-medium mb-3 flex items-center">
            <span className="mr-2">✨</span>
            <span>Consultoria estratégica com IA:</span>
          </h3>
          
          <ul className="space-y-2 text-gray-300">
            <motion.li 
              className="flex items-start"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.4, duration: 0.4 }
                }
              }}
            >
              <span className="text-nexlime mr-2">✔️</span>
              <span>Integra processos desconectados</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.5, duration: 0.4 }
                }
              }}
            >
              <span className="text-nexlime mr-2">✔️</span>
              <span>Elimina retrabalho e erros manuais</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.6, duration: 0.4 }
                }
              }}
            >
              <span className="text-nexlime mr-2">✔️</span>
              <span>Automatiza tarefas críticas</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.7, duration: 0.4 }
                }
              }}
            >
              <span className="text-nexlime mr-2">✔️</span>
              <span>Libera tempo e energia da sua equipe</span>
            </motion.li>
          </ul>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <motion.a 
            href="#contato" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-nexorange to-nexorange/90 hover:from-nexorange/90 hover:to-nexorange text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 group relative overflow-hidden"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <span className="relative z-10">Agende agora. é GRÁTIS</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></div>
            <motion.span
              className="absolute -z-10 inset-0 rounded-lg opacity-0"
              animate={{ 
                boxShadow: ['0 0 0px rgba(255,111,0,0)', '0 0 20px rgba(255,111,0,0.5)', '0 0 0px rgba(255,111,0,0)'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.a>
          
          <motion.a 
            href="#vsl" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-nexlime hover:bg-nexlime/10 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(201,217,33,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 8,
                ease: "linear",
                repeat: Infinity
              }}
              className="inline-flex items-center justify-center rounded-full bg-nexlime/20 mr-2 h-7 w-7"
            >
              <Play className="text-nexlime" size={16} />
            </motion.span>
            <span>Assista o vídeo</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
