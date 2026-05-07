/**
 * Reusable Button Component
 * Features: Multiple variants, smooth animations, accessibility
 */

import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button - Reusable button component with multiple variants
 * @param variant - 'primary' (bright brand), 'secondary' (bordered), 'ghost' (minimal)
 * @param size - 'sm' (small), 'md' (medium), 'lg' (large)
 * @param icon - Optional icon to display next to text
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  href,
  disabled = false,
  type = 'button'
}) => {
  const variants = {
    primary: 'bg-brand text-bg hover:brightness-110 shadow-lg shadow-brand/20',
    secondary: 'border-2 border-brand/50 text-brand hover:bg-brand/10',
    ghost: 'border border-white/20 text-white hover:border-brand/50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  const buttonClasses = `
    font-bold uppercase tracking-widest rounded-lg
    transition-all duration-300 flex items-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={buttonClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {content}
    </motion.button>
  );
};

export default Button;
