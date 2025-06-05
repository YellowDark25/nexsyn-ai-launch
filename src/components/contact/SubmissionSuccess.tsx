
import React from "react";
import { motion } from "framer-motion";
import { Check, Instagram, Linkedin, Youtube, Clock, MessageCircle } from "lucide-react";

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      whileHover={{ 
        y: -3,
        scale: 1.05,
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.2)'
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.1)'
      }}
      className="relative group transition-all duration-300"
    >
      <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/90 border border-gray-700/50 group-hover:border-orange-500/50 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          {icon}
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
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
      className="text-center py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 mb-6 shadow-lg"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 10,
            delay: 0.2
          } 
        }}
      >
        <Check size={36} className="text-white" strokeWidth={3} />
      </motion.div>
      
      <motion.h3 
        className="text-2xl md:text-3xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Solicitação enviada com sucesso!
      </motion.h3>
      
      <motion.p 
        className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Obrigado pelo seu interesse! Você será redirecionado para o WhatsApp para enviar seus dados ao nosso consultor.
      </motion.p>

      <motion.div 
        className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-gray-700/50 shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h4 className="text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">
          O que acontece agora?
        </h4>
        <div className="space-y-5 text-left">
          <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="mt-0.5 mr-4 text-orange-400 bg-orange-500/10 p-2 rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-white font-medium">Retorno em até 24h</p>
              <p className="text-gray-300 text-sm mt-1">Nossa equipe analisará sua solicitação e entrará em contato em até 24 horas úteis.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start pt-4 border-t border-gray-700/50"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="mt-0.5 mr-4 text-amber-400 bg-amber-500/10 p-2 rounded-lg">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-white font-medium">Diagnóstico personalizado</p>
              <p className="text-gray-300 text-sm mt-1">Agendaremos uma reunião online para entender melhor seu caso e preparar um plano personalizado.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.p 
        className="text-lg font-medium text-gray-300 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Enquanto isso, que tal seguir a Nexsyn nas redes sociais?
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <SocialMediaLinks />
      </motion.div>
    </motion.div>
  );
};
