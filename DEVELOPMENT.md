# BZB Platform - Development Guide

## Project Phases Status

### ✅ Phase 1: Project Setup & Configuration - COMPLETE
- [x] Next.js 14 configuration
- [x] TypeScript strict mode
- [x] Tailwind CSS with custom theme
- [x] ESLint & Prettier setup
- [x] Global styles and animations
- [x] Environment configuration

**Files Created:**
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js settings
- `tailwind.config.js` - Design tokens and theme
- `postcss.config.js` - CSS processing
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting
- `src/styles/globals.css` - Global styles

---

### ✅ Phase 2: Routing & Layouts - COMPLETE
- [x] Route constants
- [x] Utility helpers
- [x] Main layout wrapper
- [x] Navigation component (sticky header)
- [x] Footer component
- [x] Responsive mobile menu
- [x] Layout composition

**Files Created:**
- `src/utils/constants.ts` - Routes, navigation links, company info
- `src/utils/helpers.ts` - Utility functions
- `src/layouts/MainLayout.tsx` - Main layout wrapper
- `src/layouts/Container.tsx` - Max-width container
- `src/layouts/Section.tsx` - Section wrapper with variants
- `src/components/common/Navigation.tsx` - Sticky navigation with mobile menu
- `src/components/common/Footer.tsx` - Footer with contact info
- `src/app/page.tsx` - Home page template
- `src/app/layout.tsx` - Root layout

**Routes Structure:**
```
/                    - Home
/bzb                 - About BZB
/referral            - Referral Program
/about               - About Us
/contact             - Contact Page
/member              - Member Area
/member/dashboard    - Member Dashboard
/member/profile      - Member Profile
```

---

### ✅ Phase 3: Reusable Components - COMPLETE
- [x] Button component (4 variants)
- [x] Card component
- [x] Step card component
- [x] Feature card component
- [x] Input field component
- [x] Text area component
- [x] Hero section component
- [x] FAQ accordion component
- [x] Contact info section
- [x] Contact form component

**Files Created:**
- `src/components/common/Button.tsx` - Flexible button with variants
- `src/components/common/Card.tsx` - Card wrapper with hover effects
- `src/components/common/StepCard.tsx` - Step display cards
- `src/components/common/FeatureCard.tsx` - Feature showcase cards
- `src/components/common/Input.tsx` - Form input field
- `src/components/common/TextArea.tsx` - Multi-line text input
- `src/components/sections/Hero.tsx` - Large hero section
- `src/components/sections/FAQ.tsx` - FAQ accordion
- `src/components/sections/ContactInfo.tsx` - Contact information display
- `src/components/sections/ContactForm.tsx` - Contact form
- `src/components/index.ts` - Component exports

---

## Component Usage Guide

### Button Component
```tsx
import { Button } from '@/components';

// Primary button
<Button>Click Me</Button>

// Secondary variant
<Button variant="secondary">Secondary</Button>

// With icon
<Button icon={<Check />} iconPosition="left">Save</Button>

// As link
<Button href="/page">Go to Page</Button>

// Full width loading state
<Button fullWidth loading>Processing...</Button>
```

### Card Component
```tsx
import { Card } from '@/components';

<Card onClick={() => console.log('clicked')}>
  <div className="p-6">
    <h3>Card Content</h3>
  </div>
</Card>
```

### Input Component
```tsx
import { Input } from '@/components';

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={errors.email}
  icon={<Mail />}
/>
```

### Hero Section
```tsx
import { Hero, Button } from '@/components';

<Hero
  title="Welcome to BZB"
  subtitle="Born to Win"
  description="Your real estate journey starts here"
>
  <Button>Get Started</Button>
</Hero>
```

### FAQ Component
```tsx
import { FAQ } from '@/components';

<FAQ
  title="Frequently Asked Questions"
  items={[
    {
      question: "How do I join?",
      answer: "Simply click on 'Become a Member' and fill out the form."
    },
    // More items...
  ]}
/>
```

---

## Design System

### Colors
- **Primary Yellow**: `#FFC107` - Main action color
- **Dark Primary**: `#0F1117` - Main background
- **Dark Secondary**: `#1F2937` - Secondary background
- **Accent**: White text on dark backgrounds

### Typography
- **Display Font**: Poppins (headings, bold content)
- **Body Font**: Inter (regular content)
- **Base Size**: 16px
- **Line Height**: 1.5

### Spacing
- Base unit: 4px (Tailwind default)
- Components use: 16px, 24px, 32px, 40px gaps

### Responsive Breakpoints
- `sm`: 640px (small screens)
- `md`: 768px (medium screens)
- `lg`: 1024px (large screens)
- `xl`: 1280px (extra large)

### Button Variants
- **Primary**: Yellow background, dark text
- **Secondary**: Yellow border, yellow text
- **Dark**: Dark background, white text
- **Ghost**: Transparent, yellow text

---

## File Structure

```
src/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   └── layout.tsx           # Root layout
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── StepCard.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── FAQ.tsx
│   │   ├── ContactInfo.tsx
│   │   └── ContactForm.tsx
│   └── index.ts            # Main exports
├── layouts/
│   ├── MainLayout.tsx       # Main wrapper
│   ├── Container.tsx        # Max-width container
│   └── Section.tsx          # Section wrapper
├── pages/                   # Legacy pages (if needed)
├── styles/
│   └── globals.css         # Global styles
├── types/
│   └── layout.ts           # TypeScript types
└── utils/
    ├── constants.ts        # App constants
    └── helpers.ts          # Helper functions

public/
└── images/                 # Static assets
```

---

## Next Steps: Phase 4 - Page Implementation

### Pages to Create:
1. **Home Page** (`/src/app/page.tsx`)
   - Hero with CTA
   - About BZB section
   - Features overview
   - Referral program teaser
   - Call-to-action

2. **BZB Page** (`/src/app/bzb/page.tsx`)
   - Company story
   - Mission & vision
   - Services/offerings
   - Team (if applicable)

3. **Referral Page** (`/src/app/referral/page.tsx`)
   - How referral works (steps)
   - Referral levels
   - Rewards information
   - QR code display
   - FAQ section

4. **About Page** (`/src/app/about/page.tsx`)
   - Company history
   - Mission statement
   - Team members
   - Values

5. **Contact Page** (`/src/app/contact/page.tsx`)
   - Contact form
   - Contact information
   - Office location/map
   - Quick response info

6. **Member Dashboard** (`/src/app/member/dashboard/page.tsx`)
   - Protected route
   - Member stats
   - Referral tracking
   - Account management

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000
npm run lint            # Check for linting issues
npm run format          # Format all code with Prettier
npm run type-check      # Run TypeScript checks

# Production
npm run build           # Build for production
npm start              # Start production server

# Maintenance
npm install            # Install dependencies
npm update             # Update packages
```

---

## Development Guidelines

### Code Style
✅ Use TypeScript for all files
✅ Use semicolons and single quotes
✅ Follow naming conventions
✅ Add JSDoc comments for complex logic
✅ Use arrow functions
✅ Destructure props in components

### Component Guidelines
✅ Use `FC` type for functional components
✅ Export default the component
✅ Define prop interfaces above component
✅ Use semantic HTML elements
✅ Add proper ARIA labels for accessibility
✅ Keep components focused and single-purpose

### Styling Guidelines
✅ Use Tailwind CSS classes
✅ Avoid inline styles
✅ Use custom color utilities
✅ Leverage spacing system
✅ Use responsive prefixes (sm:, md:, lg:)
✅ Add hover and focus states

---

## Notes for Implementation

### Performance Considerations
- Use `'use client'` for interactive components
- Lazy load images where appropriate
- Code split page components
- Optimize font loading
- Use Next.js Image component for images

### Accessibility
- Use semantic HTML (nav, main, section, etc.)
- Add ARIA labels to interactive elements
- Ensure color contrast meets WCAG standards
- Test with keyboard navigation
- Use proper heading hierarchy

### SEO
- Set proper meta tags
- Use semantic HTML
- Optimize Core Web Vitals
- Create XML sitemap
- Add Open Graph tags

---

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Getting Help

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Common Issues
- Clear `.next` folder if builds fail
- Run `npm install` after pulling changes
- Check Node version compatibility (18+)
- Review console for TypeScript errors

---

**Phase 1-3 Completion: 100% ✅**
**Ready for Phase 4 Implementation 🚀**
