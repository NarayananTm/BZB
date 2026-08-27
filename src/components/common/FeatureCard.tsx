'use client';

import type { FC, ReactNode } from 'react';
import Card from './Card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, badge }) => {
  return (
    <Card className="p-6 bg-dark-800 hover:bg-dark-700">
      <div className="flex flex-col h-full">
        {/* Icon Container */}
        <div className="mb-4 flex items-start justify-between">
          <div className="w-12 h-12 bg-primary-500 bg-opacity-10 rounded-lg flex items-center justify-center text-primary-500">
            {icon}
          </div>
          {badge && (
            <span className="text-xs font-semibold bg-primary-500 text-dark-900 px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{description}</p>

        {/* Bottom Accent */}
        <div className="mt-4 h-1 w-8 bg-primary-500 rounded-full" />
      </div>
    </Card>
  );
};

export default FeatureCard;
