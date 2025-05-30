
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-nexblue">Perguntas</span> <span className="text-nexorange">Frequentes</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
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
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6 bg-gray-50">
                <AccordionTrigger className="text-left text-lg font-semibold text-nexblue hover:text-nexorange transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed pt-4">
                  {faq.answer}
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
          <p className="text-lg text-gray-600 mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <a 
            href="https://wa.me/5565999745637?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20os%20serviços%20da%20Nexsyn."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-nexorange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Fale conosco no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
