
import { lazy } from 'react';

// Lazy load heavy components for better performance
export const LazyVSLSection = lazy(() => import('./VSLSection'));
export const LazyTestimonialsSection = lazy(() => import('./TestimonialsSection'));
export const LazyThreeScene = lazy(() => import('./hero/ThreeScene'));
export const LazyFAQSection = lazy(() => import('./FAQSection'));
