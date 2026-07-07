# BZB Platform - Born to Win

A modern real estate and referral platform built with Next.js, React, and TypeScript.

## Project Overview

BZB is a comprehensive real estate platform featuring:
- **Property Investment**: Curated real estate investment opportunities
- **Referral Program**: Multi-level referral system with rewards
- **Member Dashboard**: Personalized member tracking and management
- **Community Building**: Connect and grow with thousands of members

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide Icons
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Package Manager**: npm/yarn

## Project Structure

```
src/
├── pages/           # Next.js pages
├── components/      # React components
│   ├── common/      # Reusable components
│   └── sections/    # Page sections
├── layouts/         # Layout wrappers
├── styles/          # Global styles
├── utils/           # Utility functions
└── types/           # TypeScript types

public/
└── images/          # Static images
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Development

```bash
# Start dev server
npm run dev

# Run linting
npm run lint
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

### Build & Production

```bash
# Build
npm run build

# Start production server
npm start
```

## Features

### Phase 1: Project Setup ✅
- [x] Next.js configuration
- [x] TypeScript setup
- [x] Tailwind CSS theme
- [x] ESLint & Prettier
- [x] Global styles

### Phase 2: Routing & Layouts (In Progress)
- [ ] Page routing structure
- [ ] Navigation component
- [ ] Footer component
- [ ] Responsive layouts

### Phase 3: Reusable Components (Coming)
- [ ] Hero section
- [ ] Button variants
- [ ] Card components
- [ ] Form elements
- [ ] Feature cards

### Phase 4+: Pages (Coming)
- [ ] Home page
- [ ] Referral program page
- [ ] About page
- [ ] Contact page

## Design System

### Colors
- **Primary**: Yellow (#FFC107)
- **Secondary**: Dark backgrounds (#1F2937, #0F1117)
- **Accent**: White text

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (content)

### Components
- **Buttons**: Primary, Secondary, Dark variants
- **Cards**: Elevated with hover effects
- **Sections**: Responsive containers

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Use semantic HTML
- Follow accessibility standards (WCAG 2.1)

### Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Styles: kebab-case classes (e.g., `btn-primary`)

### Component Structure
```typescript
import type { FC } from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  // Props definition
}

const Component: FC<ComponentProps> = ({ ...props }) => {
  return <div>{/* Content */}</div>;
};

export default Component;
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SITE_NAME=BZB Platform
NEXT_PUBLIC_API_URL=https://api.bzb.com
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
See `Dockerfile` for containerization setup.

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/feature-name`
4. Create a Pull Request

## License

All rights reserved © 2024 BZB Platform

## Support

For support, contact: bzb000777@gmail.com

---

**Status**: Phase 1 Complete ✅ | Phase 2 In Progress 🔄
