export const ROUTES = {
  HOME: '/',
  BZB: '/bzb',
  REFERRAL: '/referral',
  ABOUT: '/about',
  CONTACT: '/contact',
  MEMBER: '/member',
  MEMBER_DASHBOARD: '/member/dashboard',
  MEMBER_PROFILE: '/member/profile',
} as const;

export const NAVIGATION_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'BZB', href: ROUTES.BZB },
  { label: 'Referral', href: ROUTES.REFERRAL },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Contact', href: ROUTES.CONTACT },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'BZB', href: ROUTES.BZB },
    { label: 'Referral', href: ROUTES.REFERRAL },
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Contact Us', href: ROUTES.CONTACT },
  ],
  contact: {
    address: '4-A East Cross Road, Gandhi Nagar, Vellore - 632007',
    phone: ['77320 05003', '98417 68255'],
    email: 'bzb000777@gmail.com',
  },
} as const;

export const COMPANY_INFO = {
  name: 'BZB',
  tagline: 'Born to Win',
  fullTagline: 'Invest. Refer. Grow. Reward.',
  description: 'Building Dreams. Creating Opportunities.',
  mission:
    'Our mission is to deliver high-quality, sustainable residential and commercial developments while creating a transparent and customer-focused experience.',
  vision:
    'To become a leading real estate and community driven platform that empowers individuals through trusted property developments, innovative investment opportunities, and a rewarding referral ecosystem.',
} as const;
