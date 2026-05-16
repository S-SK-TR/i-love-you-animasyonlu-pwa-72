import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, size = 'md', className, ...props }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = twMerge(
    clsx(
      'glass-card rounded-lg font-medium transition-all duration-200 ease-in-out',
      'hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/50',
      sizeClasses[size],
      className
    )
  );

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;