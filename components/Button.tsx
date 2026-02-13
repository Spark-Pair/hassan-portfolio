
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-300 rounded-full select-none';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 active:scale-95',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-100 active:scale-95',
    outline: 'bg-transparent border border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600 active:scale-95',
    ghost: 'text-slate-600 hover:text-indigo-600 px-2'
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-[10px]',
    md: 'px-8 py-3.5 text-[11px]',
    lg: 'px-10 py-5 text-[12px]'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
