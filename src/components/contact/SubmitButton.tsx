
import React from "react";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
}

export const SubmitButton = ({ isLoading, text, loadingText }: SubmitButtonProps) => {
  const buttonAnimation = {
    initial: { 
      background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
      boxShadow: '0 4px 15px -5px rgba(249, 115, 22, 0.4)'
    },
    hover: { 
      scale: 1.03,
      background: [
        'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
        'linear-gradient(135deg, #ea580c 0%, #d97706 100%)',
        'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)'
      ],
      boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)',
      transition: { 
        duration: 0.5,
        background: {
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        },
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 10
        }
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: '0 2px 10px -3px rgba(249, 115, 22, 0.4)'
    },
    disabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
      background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
      boxShadow: 'none'
    }
  };

  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      className={`text-white px-10 py-4 rounded-xl font-semibold text-lg w-full md:w-auto flex items-center justify-center space-x-2 ${
        isLoading ? 'opacity-70' : ''
      }`}
      variants={buttonAnimation}
      initial="initial"
      whileHover={isLoading ? 'disabled' : 'hover'}
      whileTap={isLoading ? 'disabled' : 'tap'}
      animate={isLoading ? 'disabled' : 'initial'}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <svg className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </>
      )}
    </motion.button>
  );
};
