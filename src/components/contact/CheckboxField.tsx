
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  isVisible: boolean;
  animationOrder: number;
  error?: string;
}

export const CheckboxField = ({
  id,
  label,
  checked,
  onCheckedChange,
  isVisible,
  animationOrder,
  error
}: CheckboxFieldProps) => {
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
      <div className="flex items-start space-x-3 mt-1">
        <Checkbox 
          id={id} 
          checked={checked} 
          onCheckedChange={onCheckedChange} 
          className="mt-0.5 h-5 w-5 rounded-md border-2 border-gray-600 bg-gray-800/50 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-orange-500 data-[state=checked]:to-amber-500 data-[state=checked]:border-transparent focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
        />
        <div className="flex-1">
          <label 
            htmlFor={id} 
            className="text-sm text-gray-300/90 cursor-pointer leading-relaxed"
            dangerouslySetInnerHTML={{ __html: label }}
          />
          {error && (
            <p className="mt-2 text-sm text-red-400 font-medium flex items-start">
              <svg className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
