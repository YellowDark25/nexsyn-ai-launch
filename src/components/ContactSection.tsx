
import React, { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "../hooks/use-toast";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Em breve entraremos em contato para agendar seu diagnóstico gratuito.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexorange">Agende seu diagnóstico</span> <span className="text-nexblue">gratuito</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 font-medium">
            Preencha o formulário abaixo e nossa equipe entrará em contato para agendar
            uma conversa sem compromisso sobre como a IA pode transformar sua empresa.
          </p>
        </div>

        <div className="bg-[#0E141F] rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-nexblue/20">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
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
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium"
                    placeholder="Digite seu nome"
                  />
                </div>
                
                <div>
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
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div>
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
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium"
                  placeholder="Digite o nome da sua empresa"
                />
              </div>
              
              <div>
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
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium"
                  placeholder="Descreva brevemente seu principal desafio ou objetivo com IA"
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-nexorange hover:bg-nexorange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg w-full md:w-auto ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Enviando..." : "Quero meu diagnóstico gratuito"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexlime mb-6">
                <Check size={32} className="text-nexblue" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Solicitação enviada com sucesso!</h3>
              <p className="text-lg text-gray-200 mb-6">
                Obrigado pelo seu interesse! Nossa equipe entrará em contato em breve para agendar seu diagnóstico gratuito.
              </p>
              <p className="text-lg font-medium text-white">
                Enquanto isso, que tal seguir a Nexsyn nas redes sociais?
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="hover:scale-110 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
                    in
                  </div>
                </a>
                <a href="#" className="hover:scale-110 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
                    f
                  </div>
                </a>
                <a href="#" className="hover:scale-110 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-nexblue flex items-center justify-center text-white">
                    ig
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
