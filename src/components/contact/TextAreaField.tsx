
import React from "react";
import { motion } from "framer-motion";

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  isVisible: boolean;
  animationOrder: number;
  rows: number;
}

export const TextAreaField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  isVisible,
  animationOrder,
  rows 
}: TextAreaFieldProps) => {
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
    >
      <label htmlFor={id} className="block text-base font-medium text-white/90 mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          required
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border-2 border-gray-700/80 hover:border-gray-600/80 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent text-white/90 font-medium transition-all duration-300 placeholder-gray-500 resize-none"
          placeholder={placeholder}
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5"></div>
      </div>
    </motion.div>
  );
};
