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

  const loadUser = () => {
    const storedUser = localStorage.getItem("bzb_user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(
        user.fullName ||
        user.name ||
        user.email ||
        "Member"
      );
      setUserEmail(user.email || "");
    } else {
      setUserName("");
    }
  };

  loadUser();

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("userChanged", loadUser);
  setShowProfileMenu(false);


  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("userChanged", loadUser);
   
  };
}, []);

  const links = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'MBD', href: ROUTES.MBD },
    { label: 'Referral', href: ROUTES.REFERRAL },
    { label: 'About Us', href: ROUTES.ABOUT },
     { label: 'Dashboard', href: ROUTES.Dashboard },
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
              src="/images/logo/MBD Log.svg"
              alt="MBD Logo"
              width={220}
              height={120}
              priority
              className="object-contain"
            />

            {/* <div className="flex flex-col leading-none">
              <span className="text-white text-[47px] font-bold tracking-tight">
                MBD
              </span>

              <span className="text-gray-300 uppercase tracking-[0.45em] text-[7px] mt-1">
                Born To Win
              </span>
            </div> */}
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
           <div className="relative">


   

  </div>
      
        </div>

        {/* Mobile Menu Button */}
       
      </div>

      {/* Mobile Menu */}
    
    </nav>
  );
}
