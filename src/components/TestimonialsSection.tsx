import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Silva",
      position: "Diretor de Operações",
      company: "TechSolutions",
      text: "A implementação de IA da Nexsyn automatizou nosso atendimento ao cliente, reduzindo o tempo de resposta de horas para segundos. Nossos clientes estão mais satisfeitos e nossa equipe finalmente tem tempo para tarefas estratégicas.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Mariana Oliveira",
      position: "CEO",
      company: "InnovateX",
      text: "Tentamos implementar IA por conta própria por meses sem resultados. A Nexsyn entregou uma solução funcional em apenas 2 semanas. O ROI foi positivo já no primeiro mês de uso.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Rafael Mendes",
      position: "Gerente de Marketing",
      company: "GrowthBrand",
      text: "Nossa equipe de marketing ganhou superpoderes com a IA da Nexsyn. Criamos conteúdo 3x mais rápido e nossos resultados melhoraram significativamente. Recomendo fortemente.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    } else if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51]"
    >
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ6IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
           initial="hidden"
           animate={controls}
           variants={containerVariants}
           className="text-center mb-12 space-y-4"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400">
            O que nossos <span className="text-white">clientes</span> dizem
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Empresas reais, resultados reais. Conheça algumas histórias de transformação com a Nexsyn.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative max-w-4xl mx-auto mt-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
           <AnimatePresence mode="wait">
             {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index === currentIndex ? 0 : (index > currentIndex ? 50 : -50) }}
                animate={{ opacity: index === currentIndex ? 1 : 0, x: index === currentIndex ? 0 : (index > currentIndex ? -50 : 50) }}
                exit={{ opacity: 0, x: index === currentIndex ? 0 : (index > currentIndex ? 50 : -50) }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "absolute inset-0",
                  index === currentIndex ? "z-10" : "z-0 pointer-events-none"
                )}
              >
                <Card className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 h-full flex flex-col border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
                  {/* Rating stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-amber-400 fill-amber-400" size={20} />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-lg md:text-xl mb-6 text-gray-200 flex-grow relative pl-6">
                    <Quote className="absolute -left-1 -top-2 text-orange-500/20" size={24} />
                    {testimonial.text}
                  </p>

                  <Separator className="my-4 bg-gray-700" />

                  {/* Person info */}
                  <div className="flex items-center">
                     <Avatar className="h-14 w-14 border-2 border-orange-400/30">
                       {testimonial.image ? (
                         <AvatarImage src={testimonial.image} alt={testimonial.name} />
                       ) : (
                         <AvatarFallback className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-300 font-bold text-xl">
                            {testimonial.name.charAt(0)}
                         </AvatarFallback>
                       )}
                     </Avatar>
                    <div className="ml-4">
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      <p className="text-gray-300 text-sm">
                        {testimonial.position}
                      </p>
                      <p className="text-orange-400 text-sm font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                   {/* Decorative elements */}
                   <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/5 rounded-full -z-10"></div>
                   <div className="absolute -top-4 -left-4 w-16 h-16 bg-amber-500/5 rounded-full -z-10"></div>
                </Card>
              </motion.div>
            ))}
           </AnimatePresence>
           {/* Invisible height placeholder for absolute positioned cards */}
           <div className="h-[340px] md:h-[360px]"></div>
        </motion.div>

        {/* Navigation buttons and dots */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 backdrop-blur-sm transition-all duration-300 text-white shadow-lg hover:shadow-orange-500/20 hover:-translate-x-0.5"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-300",
                  currentIndex === index ? "bg-gradient-to-r from-orange-400 to-amber-400 w-8" : "bg-gray-600/50 hover:bg-gray-500/70 w-3"
                )}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 backdrop-blur-sm transition-all duration-300 text-white shadow-lg hover:shadow-orange-500/20 hover:translate-x-0.5"
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
