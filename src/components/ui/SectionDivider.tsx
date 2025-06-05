import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  flip?: boolean;
}

const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className = '', flip = false, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`relative w-full h-16 md:h-24 overflow-hidden ${className}`}
        {...props}
      >
        <motion.div 
          className={`absolute inset-0 w-full h-full ${
            flip 
              ? 'bg-gradient-to-b from-transparent via-orange-500/10 to-transparent' 
              : 'bg-gradient-to-t from-transparent via-orange-500/10 to-transparent'
          }`}
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-1/3 h-px bg-gradient-to-r ${
              flip 
                ? 'from-transparent via-amber-400/30 to-transparent' 
                : 'from-transparent via-orange-400/50 to-transparent'
            }`} />
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/5 to-amber-500/5 backdrop-blur-sm"
          initial={{ y: flip ? -20 : 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    );
  }
);

SectionDivider.displayName = 'SectionDivider';

export { SectionDivider };
