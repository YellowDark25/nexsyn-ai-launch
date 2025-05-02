
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nexblue text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <img 
              src="/lovable-uploads/9e39c707-25f3-40d0-9e71-cdebc2d511eb.png" 
              alt="NEXSYN Logo" 
              className="h-10 mb-4" 
            />
            <p className="text-gray-300 mb-4">
              Consultoria estratégica em Inteligência Artificial para empresas que querem resultados reais.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-nexlime transition-colors duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  in
                </div>
              </a>
              <a href="#" className="hover:text-nexlime transition-colors duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  f
                </div>
              </a>
              <a href="#" className="hover:text-nexlime transition-colors duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  ig
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-nexlime transition-colors duration-300">Home</a></li>
              <li><a href="#problema" className="hover:text-nexlime transition-colors duration-300">Problema</a></li>
              <li><a href="#solucao" className="hover:text-nexlime transition-colors duration-300">Solução</a></li>
              <li><a href="#resultados" className="hover:text-nexlime transition-colors duration-300">Resultados</a></li>
              <li><a href="#depoimentos" className="hover:text-nexlime transition-colors duration-300">Depoimentos</a></li>
              <li><a href="#contato" className="hover:text-nexlime transition-colors duration-300">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>contato@nexsyn.com.br</li>
              <li>(11) 99999-9999</li>
              <li>São Paulo, Brasil</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            &copy; {currentYear} NEXSYN Intelligence. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-gray-300">
            <a href="#" className="hover:text-nexlime transition-colors duration-300">Termos de Uso</a>
            <span>|</span>
            <a href="#" className="hover:text-nexlime transition-colors duration-300">Política de Privacidade</a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Powered by <span className="text-nexlime">NEXSYN Intelligence</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
