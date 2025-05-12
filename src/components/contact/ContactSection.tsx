
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
    <section id="contato" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexorange">Agende seu diagnóstico</span> <span className="text-nexblue">gratuito</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 font-medium">
            Preencha o formulário abaixo e nossa equipe entrará em contato para agendar
            uma conversa sem compromisso sobre como a IA pode transformar sua empresa.
          </p>
        </motion.div>

        <motion.div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="bg-[#0E141F] rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-nexblue/20"
          variants={formAnimation}
          initial="hidden"
          animate={isFormVisible ? "visible" : "hidden"}
        >
          <ContactForm isVisible={isFormVisible} />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
