'use client';

import type { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/helpers';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';

  const variants = {
    primary: 'bg-primary-500 text-dark-900 hover:bg-primary-600',
    secondary:
      'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-dark-900',
    dark: 'bg-dark-800 text-white hover:bg-dark-700',
    ghost: 'bg-transparent text-primary-500 hover:bg-dark-800',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  const iconElement = icon && (
    <span className={iconPosition === 'left' ? 'order-first' : 'order-last'}>{icon}</span>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </Link>
    );
  }

  // Otherwise render as regular button
  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {iconPosition === 'left' && iconElement}
      {loading ? 'Loading...' : children}
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

export default Button;
