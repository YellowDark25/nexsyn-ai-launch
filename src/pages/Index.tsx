import React, { useEffect, Suspense, useCallback } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import { SolutionSection } from '../components/SolutionSection';
import ResultsSection from '../components/ResultsSection';
import OfferSection from '../components/OfferSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/Footer';
import WhatsappButton from '../components/WhatsappButton';
import AnalyticsTracker from '../components/analytics/AnalyticsTracker';
import { LazyVSLSection, LazyTestimonialsSection, LazyFAQSection } from '../components/LazyComponents';
import { SectionDivider } from '../components/ui/SectionDivider';

// Loading component for better UX
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nexorange"></div>
  </div>
);

const Index = () => {
  // Analytics Measurement ID - replace with your actual GA4 Measurement ID
  const GA_MEASUREMENT_ID = import.meta.env.VITE_REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

  // Function to handle scrolling to a section with navbar offset
  const handleScrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Altura da sua barra de navegação (ajuste se necessário)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []); // Dependency array is empty as it doesn't depend on component props or state

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
    
    // Hash link navigation function (modified to use handleScrollToSection)
    const handleHashLink = () => {
      const { hash } = window.location;
      if (hash) {
        const sectionId = hash.substring(1); // Remove the '#' character
        handleScrollToSection(sectionId);
      }
    };

    // Executar no carregamento inicial da página e em mudanças na hash
    handleHashLink();
    window.addEventListener('hashchange', handleHashLink);
    // Garantir que a rolagem ocorra mesmo que a página já tenha carregado com a hash na URL
    if (window.location.hash) {
      window.dispatchEvent(new Event('hashchange'));
    }

    return () => window.removeEventListener('hashchange', handleHashLink);
  }, [handleScrollToSection]); // Added handleScrollToSection to dependency array

  return (
    <div className="min-h-screen bg-nexbg">
      {/* Analytics Tracker */}
      <AnalyticsTracker measurementId={GA_MEASUREMENT_ID} />
      
      <Navbar onScrollToSection={handleScrollToSection} />
      <HeroSection />
      
      <SectionDivider flip={true} />
      
      <Suspense fallback={<SectionLoader />}>
        <LazyVSLSection />
      </Suspense>
      
      <SectionDivider />
      
      <ProblemSection />
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
        onLearnMoreClick={() => {
          console.log("Saiba Mais button clicked!");
          handleScrollToSection("contato");
        }}
      />
      <SectionDivider flip={true} />
      
      <ResultsSection />
      
      <SectionDivider flip={false} />
      
      <Suspense fallback={<SectionLoader />}>
        <LazyTestimonialsSection />
      </Suspense>
      
      <SectionDivider flip={true} />
      
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
