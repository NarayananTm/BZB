'use client';

import type { FC, TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxChars?: number;
  labelClassName?: string;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  maxChars,
  className,
  labelClassName,
  value,
  ...props
}) => {
  const charCount = typeof value === 'string' ? value.length : 0;
  const showCharCount = maxChars && charCount > 0;

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

      <textarea
        className={cn(
          'w-full px-4 py-3 bg-dark-900 border-2 border-dark-800 rounded-lg text-white placeholder-gray-500',
          'focus:outline-none focus:border-primary-500 transition-colors duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed resize-vertical',
          'min-h-[120px]',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        value={value}
        {...props}
      />

      <div className="flex justify-between items-end mt-2">
        <div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {helperText && !error && <p className="text-gray-400 text-xs">{helperText}</p>}
        </div>
        {showCharCount && (
          <p className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-400'}`}>
            {charCount}/{maxChars}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
