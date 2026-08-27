'use client';

import type { FC, ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'alt';
}

const Section: FC<SectionProps> = ({
  children,
  className = '',
  id,
  variant = 'default',
}) => {
  const bgClass = variant === 'alt' ? 'bg-dark-800' : 'bg-dark-900';

  return (
    <section id={id} className={`py-12 md:py-20 lg:py-24 ${bgClass} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
