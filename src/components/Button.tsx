import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variants = {
  primary: 'bg-zinc-50 text-zinc-900 hover:bg-white',
  secondary: 'border border-border-strong text-zinc-100 hover:border-white/30 hover:bg-white/5',
  ghost: 'text-zinc-400 hover:text-zinc-100',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  href,
  target,
  rel,
  disabled = false,
  type = 'button',
}) => {
  const classes = `inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {icon}
    </button>
  );
};

export default Button;
