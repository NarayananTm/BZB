'use client';

import type { FC, ReactNode } from 'react';

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
  alignment?: 'left' | 'center';
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  alignment = 'center',
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/80 to-dark-900/90 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`flex flex-col ${
            alignment === 'center' ? 'items-center text-center' : 'items-start text-left'
          } gap-6 md:gap-8`}
        >
          {/* Title */}
          <div>
            <h1 className="hero-title mb-4 animate-fade-in-up text-white">{title}</h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-primary-500 font-semibold mb-4">
                {subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed animate-fade-in-up">
              {description}
            </p>
          )}

          {/* Children/CTA */}
          {children && <div className="mt-4 animate-fade-in-up">{children}</div>}
        </div>
      </div>

      {/* Gradient Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500 opacity-5 rounded-full blur-3xl z-0" />
    </section>
  );
};

export default Hero;
