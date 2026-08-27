'use client';

import type { FC, ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ children, className, hover = true, onClick }) => {
  return (
    <div
      className={cn(
        'card rounded-xl overflow-hidden shadow-lg transition-all duration-300',
        hover && 'hover:shadow-xl hover:scale-105 cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
