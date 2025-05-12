
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import { Link } from "react-router-dom";

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
  isCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
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
  error,
  isCheckbox = false,
  checked = false,
  onCheckboxChange
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

  // Function to replace anchor tags with React Router Links
  const renderLabel = () => {
    if (!isCheckbox) return label;
    
    // Use regex to find and replace anchor tags with Link components
    const linkPattern = /<a\s+href=['"]([^'"]+)['"]\s+(?:target=['"][^'"]*['"])?\s*class=['"]([^'"]+)['"]\s*>([^<]+)<\/a>/;
    const match = label.match(linkPattern);
    
    if (match) {
      const [fullMatch, href, className, text] = match;
      const beforeLink = label.substring(0, label.indexOf(fullMatch));
      const afterLink = label.substring(label.indexOf(fullMatch) + fullMatch.length);
      
      return (
        <>
          {beforeLink}
          <Link to={href} className={className}>
            {text}
          </Link>
          {afterLink}
        </>
      );
    }
    
    return label;
  };

  return (
    <motion.div 
      variants={inputAnimation}
      custom={animationOrder}
      animate={isVisible ? "visible" : "hidden"}
      className="mb-2"
    >
      {isCheckbox ? (
        <div className="flex items-start space-x-2 mt-2">
          <Checkbox 
            id={id} 
            checked={checked} 
            onCheckedChange={onCheckboxChange} 
            className="mt-1 data-[state=checked]:bg-nexorange data-[state=checked]:border-nexorange"
          />
          <label 
            htmlFor={id} 
            className="text-sm text-gray-300 cursor-pointer"
          >
            {renderLabel()}
          </label>
        </div>
      ) : (
        <>
          <label htmlFor={id} className="block text-base font-medium text-white mb-2">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            required
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border ${error ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-nexorange focus:border-transparent text-white font-medium transition-all duration-300`}
            placeholder={placeholder}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </>
      )}
    </motion.div>
  );
};
