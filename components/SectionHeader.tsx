
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '', light = false }) => (
  <div className={`max-w-3xl mb-16 ${className}`}>
    <p className={`${light ? 'text-indigo-400' : 'text-indigo-600'} font-extrabold uppercase tracking-[0.2em] text-xs mb-4`}>
      {subtitle}
    </p>
    <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
  </div>
);
