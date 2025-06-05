import React from "react";
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

type FooterProps = React.HTMLAttributes<HTMLElement> & {
  // Add any additional props here if needed
};

const Footer: React.FC<FooterProps> = (props) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
      color: "text-nexlime",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/nexsyn.si/",
      label: "Instagram",
      color: "text-nexlime",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@SomosNexsyn",
      label: "YouTube",
      color: "text-nexlime",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Problema", href: "#problema" },
    { name: "Solução", href: "#solucao" },
    { name: "Resultados", href: "#resultados" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Contato", href: "#contato" },
  ];

  const contactInfo = [
    { icon: Mail, text: "contato@nexsyn.com.br" },
    { icon: Phone, text: "(65) 99293-4536" },
    { icon: MapPin, text: "São Paulo, Brasil" },
  ];

  const legalLinks = [
    { name: "Política de Privacidade", to: "/politica-de-privacidade" },
    { name: "Termos de Serviço", to: "/termos-de-servico" },
  ];

  // Filter out any non-standard props that might be passed to React.Fragment
  const { className, ...rest } = props;
  const safeProps = Object.fromEntries(
    Object.entries(rest).filter(
      ([key]) => !key.startsWith('data-') && key !== 'data-lov-id'
    )
  );

  return (
    <footer 
      className={`bg-[#15191F] text-gray-300 py-16 lg:py-24 ${className || ''}`} 
      {...safeProps}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-start">
            <img
              src="/lovable-uploads/9e39c707-25f3-40d0-9e71-cdebc2d511eb.png"
              alt="NEXSYN Logo"
              className="h-10 mb-4 w-auto"
            />
            <p className="text-sm mb-6">
              Consultoria estratégica em Inteligência Artificial para empresas que querem resultados reais.
            </p>
            <div className="flex space-x-4 mt-auto">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`text-gray-400 hover:${social.color} transition-colors duration-300`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-nexlime transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contato</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center">
                  <info.icon size={16} className="mr-2 text-gray-500" />
                  {info.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Empty column for spacing on larger screens */}
          <div></div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} NEXSYN Intelligence. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 text-gray-400">
            {legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link to={link.to} className="hover:text-nexlime transition-colors duration-300">
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          Powered by <span className="text-nexlime">NEXSYN Intelligence</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
