import React from 'react';
import clsx from 'clsx';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'p';
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant = 'p', children, className }) => {
  const baseStyles = {
    h1: 'text-4xl font-extrabold text-gray-900',
    h2: 'text-2xl font-bold text-gray-800',
    h3: 'text-xl font-semibold text-gray-700',
    p: 'text-base text-gray-600',
  };

  return React.createElement(
    variant,
    { className: clsx(baseStyles[variant], className) },
    children
  );
};

export default Typography;
