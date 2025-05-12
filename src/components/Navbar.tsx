
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 ${
        isScrolled
          ? "bg-[#15191F]/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src="/lovable-uploads/9e39c707-25f3-40d0-9e71-cdebc2d511eb.png" 
            alt="NEXSYN Logo" 
            className="h-8 md:h-10" 
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-gray-200 hover:text-nexorange transition-colors duration-300 font-medium ${
                item.name === "Solução" ? "text-nexorange" : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#contato"
          className="hidden md:block bg-nexorange hover:bg-nexorange/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
        >
          Diagnóstico Gratuito
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#222632] absolute top-full left-0 right-0 shadow-lg animate-slide-up">
          <nav className="flex flex-col p-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`py-3 hover:text-nexorange border-b border-gray-700 ${
                  item.name === "Solução" ? "text-nexorange" : "text-gray-200"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contato"
              className="mt-4 bg-nexorange hover:bg-nexorange/90 text-white px-4 py-2 rounded-lg font-medium text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Diagnóstico Gratuito
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
