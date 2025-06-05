
import React from "react";
import { motion } from "framer-motion";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isVisible: boolean;
  animationOrder: number;
  type?: string;
  error?: string;
}

export const InputField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  isVisible,
  animationOrder,
  type = "text",
  error
}: InputFieldProps) => {
  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div 
      variants={inputAnimation}
      custom={animationOrder}
      animate={isVisible ? "visible" : "hidden"}
      className="mb-2"
    >
      <label htmlFor={id} className="block text-base font-medium text-white/90 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          required
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border-2 ${
            error ? 'border-red-500/80 bg-red-500/5' : 'border-gray-700/80 hover:border-gray-600/80'
          } focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent text-white/90 font-medium transition-all duration-300 placeholder-gray-500`}
          placeholder={placeholder}
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5"></div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 font-medium flex items-center">
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </motion.div>
  );
};
