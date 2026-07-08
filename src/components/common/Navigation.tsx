'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'BZB', href: ROUTES.BZB },
    { label: 'Referral', href: ROUTES.REFERRAL },
    { label: 'About Us', href: ROUTES.ABOUT },
    // { label: 'Contact', href: ROUTES.CONTACT },
  ];

  return (
<nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-black/20 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1450px] mx-auto h-[88px] px-8 xl:px-12 flex items-center justify-between">
          {/* Logo */}
        {/* Logo */}
<div className="flex justify-start">
  <Link href={ROUTES.HOME} className="flex items-center gap-3">
    <Image
      src="/images/logo/BZB Logo.png"
      alt="BZB Logo"
      width={48}
      height={48}
      priority
      className="object-contain"
    />

    <div className="flex flex-col leading-none">
      <span className="text-white text-[47px] font-bold tracking-tight">
        BZB
      </span>

      <span className="text-gray-300 uppercase tracking-[0.45em] text-[7px] mt-1">
        Born To Win
      </span>
    </div>
  </Link>
</div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-14">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#FFD31A] font-medium text-[25px] hover:text-white transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden lg:flex">
            <Link
              href="/member"
              className="bg-white text-black font-semibold rounded-xl px-8 py-4 hover:bg-[#FFD31A] transition-all duration-300"
            >
              Become a Member
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-xl px-8 py-6 space-y-5">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[#FFD31A] text-[25px] hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/member"
              className="block w-full text-center text-[20px] bg-white text-black font-semibold rounded-xl py-4 hover:bg-[#FFD31A] transition"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </nav>
  );
}
