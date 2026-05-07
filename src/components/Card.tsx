/**
 * Reusable Card Component
 * Features: Responsive, smooth hover effects, customizable styling
 */

import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: 'glow' | 'lift' | 'scale' | 'none';
  onClick?: () => void;
}

/**
 * Card - Renders a glass-morphism card with smooth hover animations
 * @param children - Card content
 * @param className - Additional Tailwind classes
 * @param hover - Type of hover effect ('glow', 'lift', 'scale', 'none')
 * @param onClick - Click handler
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = 'lift',
  onClick
}) => {
  const hoverVariants = {
    glow: {
      boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)',
      borderColor: 'rgba(0, 242, 255, 0.5)'
    },
    lift: {
      y: -8,
      boxShadow: '0 20px 40px rgba(0, 242, 255, 0.15)'
    },
    scale: {
      scale: 1.05
    },
    none: {}
  };

  return (
    <motion.div
      whileHover={hoverVariants[hover]}
      onClick={onClick}
      className={`
        bg-surface/80 border border-white/10 rounded-2xl
        backdrop-blur-xl transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
