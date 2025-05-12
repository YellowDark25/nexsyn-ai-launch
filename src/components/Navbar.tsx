
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Detectar a seção ativa baseado na posição de rolagem
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveItem(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Executar uma vez para configurar o item inicial ativo
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Problema", href: "#problema" },
    { name: "Solução", href: "#solucoes" },
    { name: "Resultados", href: "#resultados" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Contato", href: "#contato" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8 ${
        isScrolled
          ? "bg-[#15191F]/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src="/lovable-uploads/9e39c707-25f3-40d0-9e71-cdebc2d511eb.png" 
            alt="NEXSYN Logo" 
            className="h-8 md:h-10" 
          />
        </motion.a>

        {/* Desktop Menu com animação */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`text-gray-200 transition-colors duration-300 font-medium relative`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ color: "#FF6F00" }}
            >
              {item.name}
              {activeItem === item.href.substring(1) && (
                <motion.span 
                  className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-nexorange"
                  layoutId="activeSection"
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30
                  }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* CTA Button com animação */}
        <motion.a
          href="#contato"
          className="hidden md:block bg-nexorange text-white px-4 py-2 rounded-lg font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 15px rgba(255,111,0,0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Diagnóstico Gratuito
        </motion.a>

        {/* Mobile Menu Button com animação */}
        <motion.button
          className="md:hidden text-gray-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu com animações */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-[#222632] absolute top-full left-0 right-0 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col p-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`py-3 border-b border-gray-700 ${
                    activeItem === item.href.substring(1) ? "text-nexorange" : "text-gray-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                className="mt-4 bg-nexorange hover:bg-nexorange/90 text-white px-4 py-2 rounded-lg font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: menuItems.length * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Diagnóstico Gratuito
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
