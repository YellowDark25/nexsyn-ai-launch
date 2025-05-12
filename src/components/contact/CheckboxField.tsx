
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import { LinkText } from "./LinkText";

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
      <div className="flex items-start space-x-2 mt-2">
        <Checkbox 
          id={id} 
          checked={checked} 
          onCheckedChange={onCheckedChange} 
          className="mt-1 data-[state=checked]:bg-nexorange data-[state=checked]:border-nexorange"
        />
        <label 
          htmlFor={id} 
          className="text-sm text-gray-300 cursor-pointer"
        >
          <LinkText text={label} />
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </motion.div>
  );
};
