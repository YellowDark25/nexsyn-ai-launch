
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O que é o diagnóstico gratuito de IA?",
      answer: "É uma análise completa e sem compromisso dos processos da sua empresa para identificar oportunidades de implementação de Inteligência Artificial. Avaliamos suas necessidades específicas e apresentamos um plano personalizado."
    },
    {
      question: "Quanto tempo leva para implementar uma solução de IA?",
      answer: "Dependendo da complexidade, nossas soluções podem ser implementadas entre 7 a 30 dias. Começamos sempre com projetos piloto para validar os resultados antes de expandir para toda a operação."
    },
    {
      question: "Preciso ter conhecimento técnico em IA?",
      answer: "Não! Nossa metodologia foi desenvolvida para empresários que não têm conhecimento técnico. Cuidamos de toda a parte técnica enquanto você foca nos resultados do seu negócio."
    },
    {
      question: "Que tipos de empresa podem se beneficiar da IA?",
      answer: "Praticamente todos os segmentos podem se beneficiar: e-commerce, indústria, serviços, saúde, educação, logística, varejo e muito mais. A IA é uma ferramenta versátil que se adapta a diferentes necessidades."
    },
    {
      question: "Qual o investimento necessário?",
      answer: "O investimento varia conforme o projeto e complexidade. Durante o diagnóstico gratuito, apresentamos um orçamento transparente e personalizado para suas necessidades específicas."
    },
    {
      question: "Vocês oferecem suporte após a implementação?",
      answer: "Sim! Oferecemos suporte técnico contínuo, treinamento da equipe e acompanhamento dos resultados para garantir que você obtenha o máximo retorno do investimento."
    },
    {
      question: "Como posso medir o ROI da implementação de IA?",
      answer: "Definimos KPIs específicos antes da implementação e acompanhamos métricas como redução de custos, aumento de produtividade, melhoria na qualidade e satisfação do cliente."
    },
    {
      question: "A IA vai substituir meus funcionários?",
      answer: "Não necessariamente. Nosso foco é potencializar o trabalho humano, automatizando tarefas repetitivas para que sua equipe possa focar em atividades estratégicas e de maior valor agregado."
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51] text-white">
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
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400">
            <span className="text-white">Perguntas</span> Frequentes
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Esclarecemos as principais dúvidas sobre nossos serviços de consultoria em IA
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-gray-700/50 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-sm shadow-lg hover:border-orange-500/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-orange-400 transition-colors px-6 py-5">
                  <span className="text-orange-400 mr-2">•</span> {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-base leading-relaxed px-6 pb-5">
                  <div className="pl-4 border-l-2 border-orange-500/30">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Não encontrou a resposta que procurava?
          </p>
          <motion.a 
            href="https://wa.me/5565999745637?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20os%20serviços%20da%20Nexsyn."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            Fale conosco no WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
