# BZB Platform - Page Implementation Roadmap

## Overview
This document outlines the structure and implementation plan for all main pages of the BZB platform based on the PDF design specifications.

---

## Phase 4: Page Implementation

### 1. Home Page (`/src/app/page.tsx`)

**Sections to Include:**
- Hero section with CTA
- About BZB section
- Features overview (Property Investment, Referral, Member Services)
- Referral program teaser
- Call-to-action section
- Contact CTA

**Key Components:**
```tsx
- Hero
- FeatureCard (4 cards: Builders, Investment, Referral, Services)
- Button (CTA)
- Section layout
```

**Layout Example:**
```
[Navigation]
  ↓
[Hero with "Build Your Future" + CTA]
  ↓
[About BZB Section]
  ↓
[4 Feature Cards]
  ↓
[Referral Program Preview]
  ↓
[Final CTA]
  ↓
[Footer]
```

---

### 2. BZB Page (`/src/app/bzb/page.tsx`)

**Sections to Include:**
- Hero with "Building Trust. Creating Opportunities."
- Who We Are section
- Our Story section
- What We Do section (4 offerings)
- Vision & Mission section
- Contact CTA

**Key Components:**
```tsx
- Hero
- FeatureCard (service cards)
- Text sections
- Button (CTA)
```

**Services to Display:**
1. Builders & Developers
2. Property Investment
3. Referral Program
4. Member Services

---

### 3. Referral Program Page (`/src/app/referral/page.tsx`)

**Sections to Include:**
- Hero with QR code mockup
- How the referral works (5 steps)
- Referral levels section
- Why join program (5 benefits)
- FAQ section
- Final CTA

**Key Components:**
```tsx
- Hero
- StepCard (5 steps)
- FeatureCard (5 benefits)
- FAQ
- Button (CTA)
```

**Steps:**
1. Become a Member
2. Share Your Referral
3. Grow Your Team
4. Complete Referral Levels
5. Earn Recognition

**Benefits:**
1. Easy to Share
2. Real Time Tracking
3. Level Based Growth
4. Exclusive Rewards
5. Strong Community

---

### 4. About Page (`/src/app/about/page.tsx`)

**Sections to Include:**
- Hero section
- Company information
- Story/History
- Mission statement
- Vision statement
- Contact form

**Key Components:**
```tsx
- Hero
- Text sections
- ContactForm
- Button (CTA)
```

---

### 5. Contact Page (`/src/app/contact/page.tsx`)

**Sections to Include:**
- Hero section
- Contact form
- Contact information (address, phone, email)
- Map section (placeholder)
- FAQ section

**Key Components:**
```tsx
- Hero
- ContactForm
- ContactInfo
- FAQ
```

---

### 6. Member Dashboard (`/src/app/member/dashboard/page.tsx`)

**Future Implementation - Protected Route**

Will include:
- User profile widget
- Referral stats
- Team members list
- Rewards tracking
- Quick actions

---

## Page-Specific Imports

### Page 1: Home
```tsx
import Hero from '@/components/sections/Hero';
import { FeatureCard, Button } from '@/components';
import Section from '@/layouts/Section';
import Container from '@/layouts/Container';
```

### Page 2: BZB
```tsx
import Hero from '@/components/sections/Hero';
import { FeatureCard } from '@/components';
import Section from '@/layouts/Section';
```

### Page 3: Referral
```tsx
import Hero from '@/components/sections/Hero';
import { StepCard, FeatureCard, FAQ } from '@/components';
import Section from '@/layouts/Section';
```

### Page 4: About
```tsx
import Hero from '@/components/sections/Hero';
import { ContactForm, Button } from '@/components';
import Section from '@/layouts/Section';
```

### Page 5: Contact
```tsx
import Hero from '@/components/sections/Hero';
import { ContactForm, ContactInfo, FAQ } from '@/components';
import Section from '@/layouts/Section';
```

---

## Data Structure Examples

### Feature Card Data
```typescript
const features = [
  {
    icon: Building,
    title: 'Builders & Developers',
    description: 'Creating premium residential and commercial developments.',
    badge: 'Featured'
  },
  // ...
];
```

### Step Card Data
```typescript
const steps = [
  {
    number: 1,
    title: 'Become a Member',
    description: 'Register and activate your membership',
    icon: User
  },
  // ...
];
```

### FAQ Data
```typescript
const faqItems = [
  {
    question: 'Is joining the referral program free?',
    answer: 'Yes, membership registration is free for all users.'
  },
  // ...
];
```

---

## Responsive Design Considerations

All pages should be:
- ✅ Mobile-first approach
- ✅ Fully responsive (sm, md, lg breakpoints)
- ✅ Touch-friendly buttons and links
- ✅ Readable on all screen sizes
- ✅ Optimized images with Next.js Image component

### Responsive Grid Examples:
```tsx
// 1 column on mobile, 2 on tablet, 4 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Stack on mobile, flex on desktop
<div className="flex flex-col md:flex-row gap-8">
```

---

## SEO Optimization

Each page should have:

### Metadata
```typescript
export const metadata: Metadata = {
  title: 'Page Title | BZB',
  description: 'Page description...',
  keywords: ['keyword1', 'keyword2'],
};
```

### Open Graph
- og:title
- og:description
- og:image
- og:url

### Structured Data (if needed)
- JSON-LD for schema.org

---

## Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={isAboveTheFold}
  loading="lazy"
/>
```

### Dynamic Imports
```tsx
const HeavyComponent = dynamic(
  () => import('@/components/Heavy'),
  { loading: () => <p>Loading...</p> }
);
```

### Code Splitting
- Each route is automatically code-split
- Only load what's needed for each page

---

## Accessibility Requirements

- ✅ Semantic HTML (`<nav>`, `<main>`, `<section>`)
- ✅ ARIA labels on interactive elements
- ✅ Proper heading hierarchy
- ✅ Color contrast meets WCAG AA
- ✅ Keyboard navigation support
- ✅ Alt text on all images

---

## Future Enhancements

### Phase 5: Advanced Features
- [ ] User authentication
- [ ] Member dashboard
- [ ] Payment integration
- [ ] Email notifications
- [ ] Analytics tracking
- [ ] Multi-language support

### Phase 6: Backend Integration
- [ ] API endpoints
- [ ] Database setup
- [ ] User management
- [ ] Referral tracking system
- [ ] Payment processing

### Phase 7: Deployment & Scaling
- [ ] Production deployment
- [ ] CDN setup
- [ ] Database optimization
- [ ] Caching strategy
- [ ] Monitoring & logging

---

## Testing Strategy

### Unit Tests
- Component rendering
- Props validation
- Event handling

### Integration Tests
- Page routing
- Layout composition
- Component interaction

### E2E Tests
- User journeys
- Form submission
- Navigation flows

---

## Development Timeline Estimate

| Phase | Task | Duration |
|-------|------|----------|
| 4 | Home Page | 2-3 hours |
| 4 | BZB Page | 1-2 hours |
| 4 | Referral Page | 2-3 hours |
| 4 | About Page | 1-2 hours |
| 4 | Contact Page | 1-2 hours |
| 4 | Testing & QA | 2-3 hours |
| **Total** | **Phase 4** | **~12 hours** |

---

## Checklist for Each Page

- [ ] Create page file in `/src/app/`
- [ ] Add metadata with SEO info
- [ ] Design layout structure
- [ ] Add all sections
- [ ] Implement responsive design
- [ ] Add interactive elements
- [ ] Test on mobile devices
- [ ] Run lint check
- [ ] Format code
- [ ] Commit to git

---

## Quick Reference: Component Locations

| Component | Import Path |
|-----------|-------------|
| Button | `@/components/common/Button` |
| Card | `@/components/common/Card` |
| FeatureCard | `@/components/common/FeatureCard` |
| StepCard | `@/components/common/StepCard` |
| Hero | `@/components/sections/Hero` |
| FAQ | `@/components/sections/FAQ` |
| ContactForm | `@/components/sections/ContactForm` |
| ContactInfo | `@/components/sections/ContactInfo` |
| Section | `@/layouts/Section` |
| Container | `@/layouts/Container` |

---

**Ready to start Phase 4? 🚀**

Begin with the Home page and use it as a template for other pages.
