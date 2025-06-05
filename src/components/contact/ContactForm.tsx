import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "../../hooks/use-toast";
import { InputField } from "./InputField";
import { CheckboxField } from "./CheckboxField";
import { TextAreaField } from "./TextAreaField";
import { SubmitButton } from "./SubmitButton";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { validateWhatsApp } from "../../utils/formValidation";
import { useConversionTracking } from "../../hooks/useConversionTracking";

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
  const { trackFormSubmission, trackWhatsAppClick } = useConversionTracking();
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors: FormErrors = {};
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
    
    // Track form submission
    trackFormSubmission('diagnostic_request', {
      company: formData.company,
      challenge_type: formData.challenge?.substring(0, 50) // First 50 chars for categorization
    });
    
    // Prepare WhatsApp message
    const message = `
*Solicitação de diagnóstico:*
*Nome:* ${formData.name}
*WhatsApp:* ${formData.whatsapp}
*Empresa:* ${formData.company}
*Desafio:* ${formData.challenge}

Vim através da Landpage e gostaria de saber mais sobre as soluções.
    `.trim();
    
    // Updated phone number
    const phoneNumber = "+556592934536";
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Track WhatsApp click
    trackWhatsAppClick('contact_form');
    
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
          placeholder="(65) 99999-9999"
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
      
      <CheckboxField 
        id="privacy-policy"
        label="Concordo com a <a href='/politica-de-privacidade' class='text-nexorange hover:underline'>Política de Privacidade</a> e com os <a href='/termos-de-servico' class='text-nexorange hover:underline'>Termos de Serviço</a> *"
        checked={privacyPolicyAccepted}
        onCheckedChange={handlePrivacyPolicyChange}
        isVisible={isVisible}
        animationOrder={4}
        error={errors.privacyPolicy}
      />
      
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
