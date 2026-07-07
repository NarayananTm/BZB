import type { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface NavigationLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'dark';
}
