'use client';

import type { FC, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
  labelClassName?: string;
}

const Input: FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  helperText, 
  className,
  labelClassName,
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className={cn(
          "block text-sm font-medium mb-2",
          labelClassName || "text-dark-900"
        )}>
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={cn(
            'w-full px-4 py-3 bg-dark-900 border-2 border-dark-800 rounded-lg text-white placeholder-gray-500',
            'focus:outline-none focus:border-primary-500 transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {helperText && !error && <p className="text-gray-400 text-xs mt-1">{helperText}</p>}
    </div>
  );
};

export default Input;
