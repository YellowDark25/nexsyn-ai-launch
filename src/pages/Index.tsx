
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VSLSection from '../components/VSLSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import ResultsSection from '../components/ResultsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import OfferSection from '../components/OfferSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/Footer';
import WhatsappButton from '../components/WhatsappButton';

const Index = () => {
  // Alterando o título da página
  useEffect(() => {
    document.title = "Consultoria Estratégica em IA | Nexsyn";
    
    // Função para lidar com a navegação por âncoras (hash links)
    const handleHashLink = () => {
      const { hash } = window.location;
      if (hash) {
        // Pequeno atraso para garantir que os elementos estejam carregados
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navbarHeight = 80; // altura aproximada da navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 100);
      }
    };

    // Executar ao carregar a página
    handleHashLink();

    // Adicionar listener para mudanças no hash
    window.addEventListener('hashchange', handleHashLink);
    return () => window.removeEventListener('hashchange', handleHashLink);
  }, []);

  return (
    <div className="min-h-screen bg-nexbg">
      <Navbar />
      <HeroSection />
      <VSLSection />
      <ProblemSection />
      <SolutionSection />
      <ResultsSection />
      <TestimonialsSection />
      <OfferSection />
      <ContactSection />
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default Index;
