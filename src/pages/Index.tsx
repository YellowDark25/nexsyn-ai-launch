
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VSLSection from '../components/VSLSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import ResultsSection from '../components/ResultsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import OfferSection from '../components/OfferSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsappButton from '../components/WhatsappButton';

const Index = () => {
  // Alterando o título da página
  useEffect(() => {
    document.title = "Consultoria Estratégica em IA | Nexsyn";
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
