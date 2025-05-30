
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-nexblue hover:text-nexorange transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao site
        </Link>
        
        <h1 className="text-3xl font-bold text-nexblue mb-8">Termos de Serviço</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-600 mb-6">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar os serviços da NEXSYN Intelligence ("Nexsyn", "nós", "nosso"), 
              você concorda em cumprir e estar vinculado a estes Termos de Serviço. 
              Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">2. Descrição dos Serviços</h2>
            <p>
              A Nexsyn oferece serviços de consultoria estratégica em Inteligência Artificial, incluindo:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Diagnóstico gratuito de necessidades em IA</li>
              <li>Consultoria em implementação de soluções de IA</li>
              <li>Treinamento e capacitação em tecnologias de IA</li>
              <li>Suporte técnico especializado</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">3. Responsabilidades do Cliente</h2>
            <p>Ao usar nossos serviços, você se compromete a:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Fornecer informações precisas e atualizadas</li>
              <li>Cooperar durante o processo de consultoria</li>
              <li>Respeitar os prazos acordados</li>
              <li>Manter a confidencialidade de informações sensíveis compartilhadas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">4. Propriedade Intelectual</h2>
            <p>
              Todos os materiais, metodologias e soluções desenvolvidas pela Nexsyn 
              permanecem propriedade intelectual da empresa, salvo acordo específico em contrário.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">5. Limitação de Responsabilidade</h2>
            <p>
              A Nexsyn não se responsabiliza por danos indiretos, incidentais ou consequenciais 
              resultantes do uso de nossos serviços, exceto nos casos previstos em lei.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">6. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              Alterações significativas serão comunicadas com antecedência.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-nexblue mb-4">7. Contato</h2>
            <p>
              Para dúvidas sobre estes Termos de Serviço, entre em contato conosco:
            </p>
            <ul className="list-none mt-2">
              <li><strong>Email:</strong> contato@nexsyn.com.br</li>
              <li><strong>WhatsApp:</strong> (65) 99974-5637</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
