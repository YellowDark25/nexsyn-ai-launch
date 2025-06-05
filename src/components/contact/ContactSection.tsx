
import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ContactForm } from "./ContactForm";

const ContactSection = () => {
  // Using the scroll reveal hook with correct typing
  const { ref, isVisible: isFormVisible } = useScrollReveal({
    threshold: 0.1,
  });

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contato" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51] text-white">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ6IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-screen blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400">
            <span className="text-white">Agende seu diagnóstico</span> <span className="text-amber-300">gratuito</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 font-medium">
            Preencha o formulário abaixo e nossa equipe entrará em contato para agendar
            uma conversa sem compromisso sobre como a IA pode transformar sua empresa.
          </p>
        </motion.div>

        <motion.div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/30 transition-all duration-500"
          variants={formAnimation}
          initial="hidden"
          animate={isFormVisible ? "visible" : "hidden"}
          whileHover={{ 
            y: -5,
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)'
          }}
          transition={{ duration: 0.3 }}
        >
          <ContactForm isVisible={isFormVisible} />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
