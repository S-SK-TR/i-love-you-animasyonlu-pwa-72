import React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          'bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white shadow-md shadow-[var(--brand-500)]/20': variant === 'default',
          'bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-primary)] border border-[var(--border)]': variant === 'secondary',
          'hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]': variant === 'ghost',
          'bg-rose-600 hover:bg-rose-500 text-white': variant === 'destructive',
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;