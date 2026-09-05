'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'MBD', href: ROUTES.MBD },
    { label: 'Referral', href: ROUTES.REFERRAL },
    { label: 'About', href: ROUTES.ABOUT },
    // { label: 'Contact Us', href: ROUTES.CONTACT },
  ];

  const contact = {
    address: 'Head Office : 4-A East Cross Road, Gandhi Nagar, Vellore - 632007',
    phones: ['77320 05003', '98417 68255'],
    email: 'bzb000777@gmail.com',
  };

  return (
    <footer className="bg-[#181616] text-white overflow-hidden">

      <div className="mx-auto max-w-[1450px] px-6 lg:px-10 py-16 lg:py-20">

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.8fr_1fr] gap-12 lg:gap-24">

          {/* ================= Left ================= */}

          <div>

            <div className="flex items-center gap-3">

              <Image
                src="/images/logo/MBD Log.svg"
                alt="MBD Logo"
                width={46}
                height={46}
                priority
                className="object-contain"
              />

              <div className="leading-none">

                <h2 className="text-[22px] font-bold tracking-tight">
                  BZB
                </h2>

                <p className="mt-1 text-[6px] uppercase tracking-[0.45em] text-gray-400">
                  Born To Win
                </p>

              </div>

            </div>

            <h3 className="mt-8 text-[24px] font-semibold leading-tight">
              Let's Build Your Future Together
            </h3>

            <p className="mt-5 max-w-[330px] text-sm leading-8 text-gray-400">
              Whether you're looking for your dream property,
              a trusted investment, or an opportunity to grow
              with our referral program, BZB is here to
              support your journey.
            </p>

          </div>

          {/* ================= Quick Links ================= */}

          <div className="md:justify-self-center">

            <h3 className="mb-8 text-sm font-semibold">
              Quick links
            </h3>

            <ul className="space-y-5">

              {quickLinks.map((link) => (

                <li key={link.href}>

                  <Link
                    href={link.href}
                    className="
                      text-sm
                      text-gray-400

                      transition-colors
                      duration-300

                      hover:text-primary-500
                    "
                  >
                    {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* ================= Contact ================= */}

          <div className="md:justify-self-end">
                        <h3 className="mb-8 text-sm font-semibold">
              Contact Us
            </h3>

            <ul className="space-y-5">

              <li className="flex items-start gap-3">

                <MapPin
                  className="
                    mt-1
                    h-4
                    w-4
                    flex-shrink-0
                    text-primary-500
                  "
                />

                <span
                  className="
                    text-sm
                    leading-7
                    text-gray-400
                  "
                >
                  {contact.address}
                </span>

              </li>

              {contact.phones.map((phone) => (

                <li
                  key={phone}
                  className="flex items-center gap-3"
                >

                  <Phone
                    className="
                      h-4
                      w-4
                      flex-shrink-0
                      text-primary-500
                    "
                  />

                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="
                      text-sm
                      text-gray-400

                      transition-colors
                      duration-300

                      hover:text-primary-500
                    "
                  >
                    {phone}
                  </a>

                </li>

              ))}

              <li className="flex items-center gap-3">

                <Mail
                  className="
                    h-4
                    w-4
                    flex-shrink-0
                    text-primary-500
                  "
                />

                <a
                  href={`mailto:${contact.email}`}
                  className="
                    text-sm
                    text-gray-400

                    transition-colors
                    duration-300

                    hover:text-primary-500
                  "
                >
                  {contact.email}
                </a>

              </li>

            </ul>

          </div>

        </div>

        {/* ================= Bottom Footer ================= */}

        <div
          className="
            mt-16

            border-t
            border-white/10

            pt-6
          "
        >

          <div
            className="
              flex

              flex-col
              items-center
              justify-between

              gap-4

              text-center

              md:flex-row
              md:text-left
            "
          >

            <p className="text-xs text-gray-500">
              © {currentYear} BZB. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-6">

              <Link
                href="/"
                className="
                  text-xs
                  text-gray-500

                  transition-colors
                  duration-300

                  hover:text-primary-500
                "
              >
                Privacy Policy
              </Link>

              <Link
                href="/"
                className="
                  text-xs
                  text-gray-500

                  transition-colors
                  duration-300

                  hover:text-primary-500
                "
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}