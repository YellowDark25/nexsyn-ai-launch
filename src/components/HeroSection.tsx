import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Cpu, BrainCircuit, Bot, Zap, Network, BarChart3 } from "lucide-react";

const HERO_BG = "relative bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51]";
const HERO_GRADIENT_TEXT = "bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 bg-clip-text text-transparent";
const HERO_GRADIENT_BG = "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70";

const TechIconsAnimation = () => {
  const icons = [
    { 
      icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-400" />,
      delay: 0.2,
      size: "lg"
    },
    { 
      icon: <BrainCircuit className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-amber-400" />,
      delay: 0.4,
      size: "md"
    },
    { 
      icon: <Bot className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-orange-500" />,
      delay: 0.6,
      size: "xl"
    },
    { 
      icon: <Zap className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-amber-300" />,
      delay: 0.3,
      size: "md"
    },
    { 
      icon: <Network className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-300" />,
      delay: 0.5,
      size: "lg"
    },
    { 
      icon: <BarChart3 className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-amber-500" />,
      delay: 0.7,
      size: "md"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: { delay: number }) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: custom.delay,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }),
    hover: {
      y: -10,
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: (i: number) => ({
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 3 + Math.random() * 4,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div 
      className="relative w-full h-full flex items-center justify-center p-2 sm:p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 p-1 sm:p-2 w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
        {icons.map((icon, i) => (
          <motion.div
            key={i}
            custom={{ delay: icon.delay }}
            variants={itemVariants}
            whileHover="hover"
            className={`relative flex items-center justify-center ${
              icon.size === 'lg' ? 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' : 
              icon.size === 'md' ? 'w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16' : 
              'w-12 h-12 sm:w-14 sm:h-14'
            }`}
          >
            <motion.div
              className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10"
              variants={pulseVariants}
              custom={i}
              initial="initial"
              animate="animate"
            />
            <div className="relative z-10 bg-gradient-to-br from-white/90 to-white/80 p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg md:rounded-xl shadow-md sm:shadow-lg backdrop-blur-sm border border-white/20">
              {icon.icon}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M${Math.random() * 100} ${Math.random() * 100} L${Math.random() * 100} ${Math.random() * 100}`}
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeDasharray="0 1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.5, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className={`relative min-h-screen ${HERO_BG} flex items-center pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24 overflow-visible`}
    >
      {/* Efeitos de fundo */}
      <div className={HERO_GRADIENT_BG}></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="container mx-auto px-4 sm:px-6 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Esquerda: texto */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 md:gap-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge 
                variant="outline" 
                className="mb-2 bg-white/5 border-orange-400/30 text-orange-300 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Novidade: Consultoria Estratégica em IA
              </Badge>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight ${HERO_GRADIENT_TEXT} drop-shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Sua Empresa Pronta para a Era da Inteligência Artificial
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Implantação completa em 30 dias, sem conhecimento técnico. Receba um diagnóstico gratuito e descubra onde a IA pode acelerar seus resultados.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-4 sm:mt-6 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                asChild 
                className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <a href="#contato" className="w-full text-center">
                  <span className="relative z-10">Solicitar Diagnóstico</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </Button>
            </motion.div>
          </div>
          {/* Right side: animation */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative overflow-visible mt-8 lg:mt-0">
            {/* Elementos decorativos flutuantes */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full mix-blend-screen blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-800/10 to-transparent rounded-full mix-blend-screen blur-3xl"></div>
            <motion.div 
              className="relative z-10 rounded-2xl overflow-visible shadow-[0_25px_50px_-12px_rgba(255,145,0,0.3)] border border-orange-400/20 bg-gradient-to-br from-[#0A0F1F]/90 to-[#1A1B41]/90 backdrop-blur-xl w-full max-w-[500px] p-1.5 mx-auto"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl -z-10 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#0A1A3A] to-[#1A1B51] p-1 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-20"></div>
                <div className="relative z-10 w-full h-full min-h-[220px] xs:min-h-[280px] sm:min-h-[350px] flex items-center justify-center p-2 sm:p-4">
                  <div className="absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0A1A3A] to-[#1A1B51]">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}></div>
                    
                    {/* Animated gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear'
                      }}
                    />
                    
                    {/* Main icons animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TechIconsAnimation />
                    </div>
                  </div>
                </div>
              </div>
              {/* Efeito de brilho */}
              {/* Efeito de brilho laranja no container da imagem */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-transparent rounded-xl -z-10 blur-md"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
