
import React from "react";
import { ArrowRight, Play } from "lucide-react";

const HeroContent = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div 
      className={`w-full md:w-1/2 mb-10 md:mb-0 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="neo-blur p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute -top-28 -right-28 w-56 h-56 bg-nexorange/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-28 -left-28 w-56 h-56 bg-nexlime/20 rounded-full blur-3xl"></div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-nexlime to-nexlime/80 bg-clip-text text-transparent block mb-2">
            🟢 Sua empresa está perdendo tempo com tarefas manuais?
          </span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium mb-6">
          <span className="flex items-start">
            <span className="text-3xl mr-2">🧠</span>
            <span>A <span className="text-nexorange font-bold">Nexsyn aplica Inteligência Artificial</span> onde realmente importa:</span>
          </span>
          <span className="block mt-2 text-gray-300">
            <span className="flex items-center">
              <span className="text-nexorange mr-2">➡️</span> 
              <span>Nos processos que te custam <br />tempo, energia e dinheiro.</span>
            </span>
          </span>
        </h2>
        
        <div className="glass-morphism p-4 rounded-xl mb-6">
          <h3 className="text-xl font-medium mb-3 flex items-center">
            <span className="mr-2">✨</span>
            <span>Consultoria estratégica com IA:</span>
          </h3>
          
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-nexlime mr-2">✔️</span>
              <span>Integra processos desconectados</span>
            </li>
            <li className="flex items-start">
              <span className="text-nexlime mr-2">✔️</span>
              <span>Elimina retrabalho e erros manuais</span>
            </li>
            <li className="flex items-start">
              <span className="text-nexlime mr-2">✔️</span>
              <span>Automatiza tarefas críticas</span>
            </li>
            <li className="flex items-start">
              <span className="text-nexlime mr-2">✔️</span>
              <span>Libera tempo e energia da sua equipe</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a 
            href="#contato" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-nexorange to-nexorange/90 hover:from-nexorange/90 hover:to-nexorange text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,111,0,0.5)] group relative overflow-hidden"
          >
            <span className="relative z-10">Agende agora. é GRÁTIS</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></div>
          </a>
          
          <a 
            href="#vsl" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-nexlime hover:bg-nexlime/10 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,217,33,0.3)]"
          >
            <Play className="mr-2" size={20} />
            <span>Assista o vídeo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
