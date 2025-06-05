'use client';

import React, { useEffect, useState, useRef } from 'react';
// Importa o utilitário de carregamento original e os dados da animação
import { createLottiePlayerElement, ensureLottiePlayerLoaded } from "../utils/lottieLoader";
import solutionAnimation from "../assets/animations/solution-animation.json";

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SolutionSectionProps {
  title: string;
  description: string;
  solutions: {
    title: string;
    items: string[];
  };
  onLearnMoreClick: () => void;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function SolutionSection({
  title,
  description,
  solutions,
  onLearnMoreClick,
}: SolutionSectionProps) {
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const loadLottie = async () => {
      try {
        await ensureLottiePlayerLoaded();

        if (!lottieRef.current) return;

        if (playerRef.current) {
          try {
            playerRef.current.remove();
          } catch (e) {
            console.error("Error removing previous lottie player:", e);
          }
          playerRef.current = null;
        }

        const player = createLottiePlayerElement(solutionAnimation, {
          width: "100%",
          height: "100%",
          loop: true,
          autoplay: true,
          speed: "1"
        });

        playerRef.current = player;
        lottieRef.current.appendChild(player);
        setLottieLoaded(true);
        setLottieError(false);
      } catch (error) {
        console.error("Could not load lottie animation:", error);
        setLottieError(true);
        setLottieLoaded(false);
      }
    };

    loadLottie();

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.remove();
        } catch (e) {
          console.error("Error removing lottie player on unmount:", e);
        }
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <section id="solucoes" className="w-full py-24 relative overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51]">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              {description}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/10 to-amber-500/10 blur-3xl rounded-3xl opacity-50"></div>
            <div className="relative backdrop-blur-sm bg-background/30 rounded-3xl border border-border/40 p-6 shadow-lg h-[400px] flex items-center justify-center">
              {/* Container para a animação Lottie carregada via utilitário */}
              <div ref={lottieRef} className="w-full h-full flex items-center justify-center">
                 {!lottieLoaded && !lottieError && (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800/30 rounded-lg animate-pulse">
                    {/* Placeholder pulsante enquanto carrega */}
                    <p className="text-gray-400">Carregando animação...</p>
                  </div>
                )}
                {lottieError && (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800/30 backdrop-blur-sm rounded-lg text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p>Não foi possível carregar a animação</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative backdrop-blur-sm bg-background/30 rounded-3xl border border-border/40 p-6 shadow-lg">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/10 to-amber-500/10 blur-xl rounded-3xl opacity-50"></div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">{solutions.title}</h3>
              
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {solutions.items.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemFadeIn}
                    className="flex items-start gap-3 group"
                  >
                    <div className="rounded-full bg-orange-500/20 p-1 mt-0.5 group-hover:bg-orange-500/30 transition-colors">
                      <Check className="h-4 w-4 text-orange-500" />
                    </div>
                    <span className="text-foreground/90">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6"
              >
                <a
                  href="#contato"
                  className="group rounded-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-12 px-6 py-3 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    onLearnMoreClick();
                  }}
                >
                  Saiba Mais
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Example usage
export default function SolutionSectionExample() {

  return (
    <SolutionSection
      title="Nossas Soluções"
      description="Metodologia comprovada para aplicar Inteligência Artificial onde realmente importa para o seu negócio."
      solutions={{
        title: "Transformação Digital Estratégica",
        items: [
          "Diagnóstico Personalizado",
          "Desenvolvimento Sob Medida",
          "Integração Sem Rupturas",
        ]
      }}
      onLearnMoreClick={() => {}}
    />
  );
}
