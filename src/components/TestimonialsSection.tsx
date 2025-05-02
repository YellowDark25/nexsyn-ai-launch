
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
      rating: 5
    },
    {
      id: 2,
      name: "Mariana Oliveira",
      position: "CEO",
      company: "InnovateX",
      text: "Tentamos implementar IA por conta própria por meses sem resultados. A Nexsyn entregou uma solução funcional em apenas 2 semanas. O ROI foi positivo já no primeiro mês de uso.",
      rating: 5
    },
    {
      id: 3,
      name: "Rafael Mendes",
      position: "Gerente de Marketing",
      company: "GrowthBrand",
      text: "Nossa equipe de marketing ganhou superpoderes com a IA da Nexsyn. Criamos conteúdo 3x mais rápido e nossos resultados melhoraram significativamente. Recomendo fortemente.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
      // Swipe left
      handleNext();
    } else if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrev();
    }
  };

  return (
    <section id="depoimentos" className="py-20 bg-nexbg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que nossos <span className="text-nexorange">clientes</span> dizem
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Empresas reais, resultados reais. Conheça algumas histórias de transformação com a Nexsyn.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10 overflow-hidden hover-scale"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `perspective(1000px) rotateY(${(currentIndex) * 2}deg)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            {/* Rating stars */}
            <div className="flex mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="text-nexlime fill-nexlime" size={20} />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-lg md:text-xl mb-8 text-gray-700 italic">
              "{testimonials[currentIndex].text}"
            </p>

            {/* Person info */}
            <div className="flex items-center">
              <div className="h-14 w-14 rounded-full bg-nexblue/20 flex items-center justify-center text-nexblue font-bold text-xl">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-10 text-6xl font-serif">"</div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-nexlime/10 rounded-full"></div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-nexorange hover:text-white transition-all duration-300 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-nexorange hover:text-white transition-all duration-300 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-nexorange" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
