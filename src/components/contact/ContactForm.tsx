
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "../../hooks/use-toast";
import { InputField } from "./InputField";
import { TextAreaField } from "./TextAreaField";
import { SubmitButton } from "./SubmitButton";

interface FormData {
  name: string;
  whatsapp: string;
  company: string;
  challenge: string;
}

interface FormErrors {
  whatsapp?: string;
  privacyPolicy?: string;
}

interface ContactFormProps {
  isVisible: boolean;
}

export const ContactForm = ({ isVisible }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    company: "",
    challenge: ""
  });

  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (name === 'whatsapp' && errors.whatsapp) {
      setErrors(prev => ({ ...prev, whatsapp: undefined }));
    }
  };

  const handlePrivacyPolicyChange = (checked: boolean) => {
    setPrivacyPolicyAccepted(checked);
    if (checked && errors.privacyPolicy) {
      setErrors(prev => ({ ...prev, privacyPolicy: undefined }));
    }
  };

  const validateWhatsApp = (number: string): boolean => {
    // Brazilian phone number format with optional country code
    // Accepts formats like: +55 65 92934536, 55 65 92934536, 65 92934536, 6592934536
    const whatsappRegex = /^(\+?\d{2}\s?)?(\d{2})\s?(\d{8,9})$/;
    return whatsappRegex.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let formErrors: FormErrors = {};
    let hasError = false;
    
    // Validate WhatsApp number
    if (!validateWhatsApp(formData.whatsapp)) {
      formErrors.whatsapp = "Formato inválido. Use: (DDD) 00000-0000 ou 00 00000-0000";
      hasError = true;
    }
    
    // Validate privacy policy acceptance
    if (!privacyPolicyAccepted) {
      formErrors.privacyPolicy = "Você precisa aceitar a política de privacidade para continuar.";
      hasError = true;
    }
    
    if (hasError) {
      setErrors(formErrors);
      return;
    }
    
    // Basic validation for other fields
    if (!formData.name || !formData.company || !formData.challenge) {
      toast({
        title: "Erro no envio",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    // Prepare WhatsApp message
    const message = `
*Nova solicitação de diagnóstico:*
*Nome:* ${formData.name}
*WhatsApp:* ${formData.whatsapp}
*Empresa:* ${formData.company}
*Desafio:* ${formData.challenge}
    `.trim();
    
    // Alberto's phone number
    const phoneNumber = "+556592934536";
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new window
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

  if (isSubmitted) {
    return <SubmissionSuccess />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          id="name"
          label="Seu nome completo *"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite seu nome"
          isVisible={isVisible}
          animationOrder={0}
        />
        
        <InputField 
          id="whatsapp"
          label="WhatsApp (com DDD) *"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          isVisible={isVisible}
          animationOrder={1}
          type="tel"
          error={errors.whatsapp}
        />
      </div>
      
      <InputField 
        id="company"
        label="Nome da empresa *"
        value={formData.company}
        onChange={handleChange}
        placeholder="Digite o nome da sua empresa"
        isVisible={isVisible}
        animationOrder={2}
      />
      
      <TextAreaField
        id="challenge"
        label="Qual seu principal desafio atual? *"
        value={formData.challenge}
        onChange={handleChange}
        placeholder="Descreva brevemente seu principal desafio ou objetivo com IA"
        isVisible={isVisible}
        animationOrder={3}
        rows={4}
      />
      
      <InputField 
        id="privacy-policy"
        label="Concordo com a <a href='/politica-de-privacidade' target='_blank' class='text-nexorange hover:underline'>Política de Privacidade</a> e com o processamento dos meus dados *"
        value=""
        onChange={() => {}}
        placeholder=""
        isVisible={isVisible}
        animationOrder={4}
        isCheckbox={true}
        checked={privacyPolicyAccepted}
        onCheckboxChange={handlePrivacyPolicyChange}
      />
      
      {errors.privacyPolicy && (
        <p className="text-sm text-red-500 mt-1">{errors.privacyPolicy}</p>
      )}
      
      <div className="text-center">
        <SubmitButton 
          isLoading={isLoading} 
          text="Quero meu diagnóstico gratuito" 
          loadingText="Enviando..."
        />
      </div>
    </form>
  );
};

const SubmissionSuccess = () => {
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
      <p className="text-lg font-medium text-white">
        Enquanto isso, que tal seguir a Nexsyn nas redes sociais?
      </p>
      <SocialMediaLinks />
    </motion.div>
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

import { Check, Instagram, Linkedin, Youtube } from "lucide-react";
