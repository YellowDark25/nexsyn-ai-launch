
import React, { useState } from "react";
import { Check, Instagram, Linkedin, Youtube } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  whatsapp: string;
  company: string;
  challenge: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    company: "",
    challenge: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Usando o hook de revelação de scroll para animações
  const { ref: formRef, isVisible: isFormVisible } = useScrollReveal({
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.whatsapp || !formData.company || !formData.challenge) {
      toast({
        title: "Erro no envio",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    // Preparar mensagem para WhatsApp
    const message = `
*Nova solicitação de diagnóstico:*
*Nome:* ${formData.name}
*WhatsApp:* ${formData.whatsapp}
*Empresa:* ${formData.company}
*Desafio:* ${formData.challenge}
    `.trim();
    
    // Número do Alberto
    const phoneNumber = "+556592934536";
    
    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp em nova janela
    window.open(whatsappURL, "_blank");
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Você será redirecionado para o WhatsApp para enviar os detalhes para nosso consultor.",
        duration: 5000,
      });
    }, 1000);
  };

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

  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };

  const buttonAnimation = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#FF6B00",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { scale: 0.95 }
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
          ref={formRef}
          className="bg-[#0E141F] rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-nexblue/20"
          variants={formAnimation}
          initial="hidden"
          animate={isFormVisible ? "visible" : "hidden"}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  variants={inputAnimation}
                  custom={0}
                  animate={isFormVisible ? "visible" : "hidden"}
                >
                  <label htmlFor="name" className="block text-base font-medium text-white mb-2">
                    Seu nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium transition-all duration-300"
                    placeholder="Digite seu nome"
                  />
                </motion.div>
                
                <motion.div 
                  variants={inputAnimation}
                  custom={1}
                  animate={isFormVisible ? "visible" : "hidden"}
                >
                  <label htmlFor="whatsapp" className="block text-base font-medium text-white mb-2">
                    WhatsApp (com DDD) *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium transition-all duration-300"
                    placeholder="(00) 00000-0000"
                  />
                </motion.div>
              </div>
              
              <motion.div 
                variants={inputAnimation}
                custom={2}
                animate={isFormVisible ? "visible" : "hidden"}
              >
                <label htmlFor="company" className="block text-base font-medium text-white mb-2">
                  Nome da empresa *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium transition-all duration-300"
                  placeholder="Digite o nome da sua empresa"
                />
              </motion.div>
              
              <motion.div 
                variants={inputAnimation}
                custom={3}
                animate={isFormVisible ? "visible" : "hidden"}
              >
                <label htmlFor="challenge" className="block text-base font-medium text-white mb-2">
                  Qual seu principal desafio atual? *
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  required
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium transition-all duration-300"
                  placeholder="Descreva brevemente seu principal desafio ou objetivo com IA"
                />
              </motion.div>
              
              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-nexorange text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg w-full md:w-auto ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  variants={buttonAnimation}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isLoading ? "Enviando..." : "Quero meu diagnóstico gratuito"}
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexlime mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Check size={32} className="text-nexblue" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white">Solicitação enviada com sucesso!</h3>
              <p className="text-lg text-gray-200 mb-6">
                Obrigado pelo seu interesse! Você será redirecionado para o WhatsApp para enviar seus dados ao nosso consultor.
              </p>
              <p className="text-lg font-medium text-white">
                Enquanto isso, que tal seguir a Nexsyn nas redes sociais?
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <motion.a 
                  href="https://www.linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
                    <Linkedin size={20} />
                  </div>
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/nexsyn.si/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
                    <Instagram size={20} />
                  </div>
                </motion.a>
                <motion.a 
                  href="https://www.youtube.com/@SomosNexsyn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-transform duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
                    <Youtube size={20} />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
