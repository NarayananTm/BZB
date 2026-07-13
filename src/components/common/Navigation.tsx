'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  UserCircle2,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { ROUTES } from '@/utils/constants';

export default function Navigation() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');
const [showProfileMenu, setShowProfileMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const storedUser = localStorage.getItem('bzb_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.fullName || parsed.name || parsed.email || 'Member');
      } catch {
        setUserName('Member');
      }
    }

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

  const handleLogout = async () => {
    localStorage.removeItem('bzb_token');
    localStorage.removeItem('bzb_user');
    await fetch('/api/logout', { method: 'POST' });
    setUserName('');
    router.push('/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
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
       {userName ? (

  <div className="relative">

    <button
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className="
      flex
      items-center
      gap-3

      rounded-xl

      border
      border-white/20

      bg-white/10

      px-4
      py-3

      backdrop-blur-lg

      transition-all

      hover:bg-white/20
      "
    >

      <UserCircle2
        className="text-[#FFD31A]"
        size={36}
      />

      <div className="text-left">

        <p className="text-white text-sm font-semibold">
          {userName}
        </p>

        <p className="text-gray-300 text-xs">
          Member
        </p>

      </div>

      <ChevronDown
        size={18}
        className={`text-white transition-transform ${
          showProfileMenu ? "rotate-180" : ""
        }`}
      />

    </button>

    {showProfileMenu && (

      <div
        className="
        absolute
        right-0
        mt-3

        w-72

        rounded-2xl

        bg-[#181818]

        border
        border-white/10

        shadow-2xl

        overflow-hidden

        z-50
        "
      >

        <div className="p-5 border-b border-white/10">

          <div className="flex items-center gap-3">

            <UserCircle2
              size={46}
              className="text-[#FFD31A]"
            />

            <div>

              <h4 className="text-white font-semibold">
                {userName}
              </h4>

              <p className="text-gray-400 text-sm">
                {userEmail}
              </p>

            </div>

          </div>

        </div>

        <Link
          href="/member/dashboard"
          className="
          flex
          items-center
          gap-3

          px-5
          py-4

          text-white

          hover:bg-white/10
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <button
          onClick={handleLogout}
          className="
          w-full

          flex
          items-center
          gap-3

          px-5
          py-4

          text-red-400

          hover:bg-red-500/10
          "
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    )}

  </div>

) : (

  <Link
    href="/login"
    className="
    bg-white
    text-black

    font-semibold

    rounded-xl

    px-8
    py-4

    hover:bg-[#FFD31A]

    transition-all
    duration-300
    "
  >
    Login / Register
  </Link>

)}
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
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

          {userName ? (
            <div className="space-y-3">
              <div className="text-[#FFD31A] text-[18px]">Welcome, {userName}</div>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full text-center text-[20px] bg-white text-black font-semibold rounded-xl py-4 hover:bg-[#FFD31A] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block w-full text-center text-[20px] bg-white text-black font-semibold rounded-xl py-4 hover:bg-[#FFD31A] transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
