
import React, { useEffect, Suspense } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import ResultsSection from '../components/ResultsSection';
import OfferSection from '../components/OfferSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/Footer';
import WhatsappButton from '../components/WhatsappButton';
import { LazyVSLSection, LazyTestimonialsSection, LazyFAQSection } from '../components/LazyComponents';

// Loading component for better UX
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nexorange"></div>
  </div>
);

const Index = () => {
  // Changing page title and SEO improvements
  useEffect(() => {
    document.title = "Consultoria Estratégica em IA | Nexsyn - Transforme sua Empresa com Inteligência Artificial";
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Transforme sua empresa com consultoria estratégica em IA. Implementação em até 15 dias, sem conhecimento técnico. Diagnóstico gratuito disponível.');
    
    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'consultoria IA, inteligência artificial, transformação digital, automação empresarial, IA para empresas, consultoria tecnológica');
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Consultoria Estratégica em IA | Nexsyn' },
      { property: 'og:description', content: 'Transforme sua empresa com IA aplicada em até 15 dias, sem conhecimento técnico.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Nexsyn' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });
    
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);
    
    // Hash link navigation function
    const handleHashLink = () => {
      const { hash } = window.location;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navbarHeight = 80;
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

    handleHashLink();
    window.addEventListener('hashchange', handleHashLink);
    return () => window.removeEventListener('hashchange', handleHashLink);
  }, []);

  return (
    <div className="min-h-screen bg-nexbg">
      <Navbar />
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <LazyVSLSection />
      </Suspense>
      
      <ProblemSection />
      <SolutionSection />
      <ResultsSection />
      
      <Suspense fallback={<SectionLoader />}>
        <LazyTestimonialsSection />
      </Suspense>
      
      <OfferSection />
      
      <Suspense fallback={<SectionLoader />}>
        <LazyFAQSection />
      </Suspense>
      
      <ContactSection />
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default Index;
