
import React, { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'spin';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

// Configurações de animação para cada tipo
const animationVariants: Record<AnimationType, string> = {
  'fade-up': 'opacity-0 translate-y-10',
  'fade-down': 'opacity-0 -translate-y-10',
  'fade-left': 'opacity-0 translate-x-10',
  'fade-right': 'opacity-0 -translate-x-10',
  'zoom-in': 'opacity-0 scale-95',
  'zoom-out': 'opacity-0 scale-105',
  'spin': 'opacity-0 rotate-90'
};

// Classes de transição para quando o elemento está visível
const visibleClasses: Record<AnimationType, string> = {
  'fade-up': 'opacity-100 translate-y-0',
  'fade-down': 'opacity-100 translate-y-0',
  'fade-left': 'opacity-100 translate-x-0',
  'fade-right': 'opacity-100 translate-x-0',
  'zoom-in': 'opacity-100 scale-100',
  'zoom-out': 'opacity-100 scale-100',
  'spin': 'opacity-100 rotate-0'
};

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = "0px",
  className,
  once = true,
  ...props
}: ScrollRevealProps) {
  
  const { ref, isVisible } = useScrollReveal({
    threshold,
    rootMargin,
    delay
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'transition-all transform',
        isVisible ? visibleClasses[animation] : animationVariants[animation],
        className
      )}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
