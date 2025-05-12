
import React from "react";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
}

export const SubmitButton = ({ isLoading, text, loadingText }: SubmitButtonProps) => {
  const buttonAnimation = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#FF6B00",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      className={`bg-nexorange text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg w-full md:w-auto ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      variants={buttonAnimation}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {isLoading ? loadingText : text}
    </motion.button>
  );
};
