
import React, { useEffect, useState } from "react";
import { useConversionTracking } from "../hooks/useConversionTracking";

const WhatsappButton = () => {
  const { trackWhatsAppClick } = useConversionTracking();
  const [isVisible, setIsVisible] = useState(false);

  // Efeito para animação de entrada suave
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackWhatsAppClick('floating_button');
    
    // Abre o WhatsApp em uma nova aba
    window.open(
      "https://wa.me/556592934536?text=Olá!%20Vi%20o%20site%20da%20Nexsyn%20e%20gostaria%20de%20mais%20informações%20sobre%20consultoria%20em%20IA.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <a
      href="https://wa.me/556592934536?text=Olá!%20Vi%20o%20site%20da%20Nexsyn%20e%20gostaria%20de%20mais%20informações%20sobre%20consultoria%20em%20IA."
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button ${isVisible ? 'visible' : ''}`}
      onClick={handleClick}
      aria-label="Fale conosco pelo WhatsApp"
      data-testid="whatsapp-button"
    >
      <div className="whatsapp-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          width="24"
          height="24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.174.196-.347.221-.644.075-.297-.15-1.255-.463-2.39-1.475-.884-.795-1.484-1.784-1.66-2.087-.173-.297-.018-.458.13-.606.136-.133.296-.347.445-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.508-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.874 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a7.29 7.29 0 01-1.199-.098c-1.308-.22-2.542-.88-3.61-1.733L6.6 18.38l.438-1.4c.15-.458.22-.942.2-1.43a6.88 6.88 0 01.2-1.7c.098-.37.2-.738.347-1.102.05-.099.025-.198-.025-.297-.05-.099-.397-.99-.57-1.356-.148-.26-.396-.382-.67-.37-.273.01-.52.16-.77.347-.25.187-1.04.893-1.04 2.18 0 1.286.94 2.495 1.09 2.673.136.174 1.856 2.81 4.535 3.95.645.273 1.165.43 1.65.545.57.124 1.115.158 1.634.068.52-.09 1.61-.62 1.837-1.213.227-.595.227-1.104.174-1.214-.05-.11-.198-.174-.42-.297" />
          <path d="M12 1.5C6.202 1.5 1.5 6.202 1.5 12c0 2.13.662 4.105 1.794 5.74L1.5 22.5l4.794-1.756A10.44 10.44 0 0012 22.5c5.798 0 10.5-4.702 10.5-10.5S17.798 1.5 12 1.5m0 19.5c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9-4.05 9-9 9" />
        </svg>
      </div>
    </a>
  );
};

export default WhatsappButton;
