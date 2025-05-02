
import React from "react";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/5511999999999?text=Olá!%20Vi%20o%20site%20da%20Nexsyn%20e%20gostaria%20de%20mais%20informações%20sobre%20consultoria%20em%20IA."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
    </a>
  );
};

export default WhatsappButton;
