
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
      <label htmlFor={id} className="block text-base font-medium text-white mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        required
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium transition-all duration-300"
        placeholder={placeholder}
      />
    </motion.div>
  );
};
