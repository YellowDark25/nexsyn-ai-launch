
import React from "react";
import { motion } from "framer-motion";
import { Check, Instagram, Linkedin, Youtube, Clock, MessageCircle } from "lucide-react";

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="transition-transform duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
        {icon}
      </div>
    </motion.a>
  );
};

const SocialMediaLinks = () => {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <SocialLink href="https://www.linkedin.com/" icon={<Linkedin size={20} />} />
      <SocialLink href="https://www.instagram.com/nexsyn.si/" icon={<Instagram size={20} />} />
      <SocialLink href="https://www.youtube.com/@SomosNexsyn" icon={<Youtube size={20} />} />
    </div>
  );
};

export const SubmissionSuccess = () => {
  return (
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

      <div className="bg-nexblue/20 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">O que acontece agora?</h4>
        <div className="space-y-3 text-left">
          <div className="flex items-start">
            <div className="mt-1 mr-3 text-nexlime">
              <Clock size={18} />
            </div>
            <p className="text-gray-200">
              <strong className="text-white">Retorno em até 24h</strong> - Nossa equipe analisará sua solicitação e entrará em contato em até 24 horas úteis.
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="mt-1 mr-3 text-nexlime">
              <MessageCircle size={18} />
            </div>
            <p className="text-gray-200">
              <strong className="text-white">Diagnóstico</strong> - Agendaremos uma reunião online de 30 minutos para entender melhor seu caso e preparar um plano personalizado.
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-lg font-medium text-white">
        Enquanto isso, que tal seguir a Nexsyn nas redes sociais?
      </p>
      
      <SocialMediaLinks />
    </motion.div>
  );
};
