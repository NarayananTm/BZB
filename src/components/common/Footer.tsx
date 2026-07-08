'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'BZB', href: ROUTES.BZB },
    { label: 'Referral', href: ROUTES.REFERRAL },
    { label: 'About', href: ROUTES.ABOUT },
    // { label: 'Contact Us', href: ROUTES.CONTACT },
  ];

  const contact = {
    address: 'Head Office - 4-A East Cross Street, Vellore - 632007',
    phones: ['+91 77320 05003', '+8847 95232'],
    email: 'bzb000777@gmail.com',
  };

  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo/BZB Logo.png"
                alt="BZB Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-white text-[20px] font-bold tracking-tight">
                  BZB
                </span>

                <span className="text-gray-300 uppercase tracking-[0.45em] text-[6px] mt-1">
                  Born To Win
                </span>
              </div>


            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Let&apos;s build your future together. Whether you&apos;re looking for your next
              property or want to leverage business
              opportunity to grow and scale your network,
              BZB is here to support your dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="ml-72">
            <h3 className="text-white font-bold mb-6 text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">{contact.address}</span>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone} className="flex gap-3">
                  <Phone className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0 mt-1" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Empty column for spacing on larger screens */}
          <div></div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} BZB. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-500 hover:text-primary-500 text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-500 hover:text-primary-500 text-xs transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


