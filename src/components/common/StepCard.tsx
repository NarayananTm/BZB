'use client';

import type { FC, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
  isActive?: boolean;
}

const StepCard: FC<StepCardProps> = ({ number, title, description, icon, isActive = false }) => {
  return (
    <div className="relative">
      {/* Step Container */}
      <div
        className={`p-6 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-primary-500 text-dark-900 shadow-lg scale-105'
            : 'bg-dark-800 text-white hover:bg-dark-700'
        }`}
      >
        {/* Step Number */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              isActive ? 'bg-dark-900 text-primary-500' : 'bg-primary-500 text-dark-900'
            }`}
          >
            {number}
          </div>
          {icon && <div className="w-6 h-6">{icon}</div>}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`text-sm leading-relaxed ${isActive ? 'text-dark-800' : 'text-gray-400'}`}>
          {description}
        </p>
      </div>

      {/* Connector Arrow */}
      <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2">
        <ArrowRight className={`w-6 h-6 ${isActive ? 'text-primary-500' : 'text-gray-600'}`} />
      </div>
    </div>
  );
};

export default StepCard;
