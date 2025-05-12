
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#15191F]">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto bg-[#1A1F2C] p-6 md:p-10 rounded-xl shadow-lg">
          <div className="mb-8">
            <Link 
              to="/"
              className="inline-flex items-center text-nexorange hover:text-nexlime transition-colors mb-4"
            >
              <ArrowLeft size={18} className="mr-2" />
              Voltar para a página inicial
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
            <p className="text-gray-400">Última atualização: 12 de Maio de 2025</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 mb-4">
              A NEXSYN Intelligence ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e divulgamos suas informações pessoais quando você utiliza nossos serviços, incluindo nosso site e formulários de contato.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Informações que coletamos</h2>
            <p className="text-gray-200 mb-4">
              Coletamos as seguintes informações quando você preenche nossos formulários:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-200 space-y-2">
              <li>Nome completo</li>
              <li>Número de WhatsApp</li>
              <li>Nome da empresa</li>
              <li>Descrição dos desafios ou objetivos relacionados à IA</li>
              <li>Qualquer outra informação que você opte por nos fornecer</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Como utilizamos suas informações</h2>
            <p className="text-gray-200 mb-4">
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-200 space-y-2">
              <li>Responder às suas solicitações e fornecer os serviços solicitados</li>
              <li>Criar e administrar sua conta, quando aplicável</li>
              <li>Enviar informações sobre nossos serviços, atualizações e promoções</li>
              <li>Melhorar e personalizar nossos serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Compartilhamento de dados</h2>
            <p className="text-gray-200 mb-4">
              Não compartilhamos suas informações pessoais com terceiros, exceto:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-200 space-y-2">
              <li>Com fornecedores de serviços que nos auxiliam a operar nosso negócio</li>
              <li>Para cumprir exigências legais ou regulatórias</li>
              <li>Para proteger nossos direitos, privacidade, segurança ou propriedade</li>
              <li>Em conexão com uma venda ou transação comercial</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Segurança dos dados</h2>
            <p className="text-gray-200 mb-4">
              Implementamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda acidental ou alteração. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Seus direitos</h2>
            <p className="text-gray-200 mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-200 space-y-2">
              <li>Acessar, corrigir ou excluir seus dados pessoais</li>
              <li>Restringir ou opor-se ao processamento de seus dados</li>
              <li>Solicitar a portabilidade de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contato</h2>
            <p className="text-gray-200 mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato conosco em:
            </p>
            <p className="text-gray-200 mb-4">
              Email: privacidade@nexsyn.com.br<br />
              Telefone: (11) 99999-9999
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Alterações nesta política</h2>
            <p className="text-gray-200 mb-4">
              Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre quaisquer alterações.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
