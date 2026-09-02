'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (track?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFAF7]/95 backdrop-blur-md shadow-sm border-b border-[#E4DED3]'
          : 'bg-[#FBFAF7]/90 backdrop-blur-md border-b border-[#E4DED3]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center gap-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="text-[19px] font-bold tracking-[6px] text-[#171615]">
            LAL10
          </span>
          <span className="text-[10px] tracking-[2.5px] text-[#8A837A] font-medium mt-[3px]">
            FASHIONOS · FASHION BRAND OPERATING SYSTEM
          </span>
        </Link>

        {/* Desktop Navigation Links — Exact Sequence from HTML */}
        <div className="hidden lg:flex items-center gap-9">
          <Link
            href="#offerings"
            className="text-[12px] tracking-[1.5px] font-semibold text-[#57524B] hover:text-[#5B1F28] uppercase transition-colors"
          >
            What We Do
          </Link>
          <Link
            href="#process"
            className="text-[12px] tracking-[1.5px] font-semibold text-[#57524B] hover:text-[#5B1F28] uppercase transition-colors"
          >
            Process
          </Link>
          <Link
            href="#engagement"
            className="text-[12px] tracking-[1.5px] font-semibold text-[#57524B] hover:text-[#5B1F28] uppercase transition-colors"
          >
            Engagement
          </Link>
          <Link
            href="#team"
            className="text-[12px] tracking-[1.5px] font-semibold text-[#57524B] hover:text-[#5B1F28] uppercase transition-colors"
          >
            Team
          </Link>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenBooking('General')}
            className="flex items-center gap-2.5 bg-[#171615] text-[#FBFAF7] hover:bg-[#5B1F28] px-[22px] py-[12px] text-[11px] tracking-[1.5px] font-semibold uppercase transition-all duration-200 shadow-sm group"
          >
            <span>Book a Discovery Call</span>
            <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => onOpenBooking('General')}
            className="text-[10px] tracking-[1.5px] font-semibold uppercase bg-[#171615] text-[#FBFAF7] px-3.5 py-2"
          >
            Book Call
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#171615] hover:text-[#5B1F28]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBFAF7] border-b border-[#E4DED3] px-6 py-6 shadow-xl animate-fade-in flex flex-col gap-4">
          <Link
            href="#offerings"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[13px] tracking-[1.5px] font-semibold text-[#171615] py-2 border-b border-[#E4DED3]/60 uppercase"
          >
            What We Do
          </Link>
          <Link
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[13px] tracking-[1.5px] font-semibold text-[#171615] py-2 border-b border-[#E4DED3]/60 uppercase"
          >
            Process
          </Link>
          <Link
            href="#engagement"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[13px] tracking-[1.5px] font-semibold text-[#171615] py-2 border-b border-[#E4DED3]/60 uppercase"
          >
            Engagement
          </Link>
          <Link
            href="#team"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[13px] tracking-[1.5px] font-semibold text-[#171615] py-2 border-b border-[#E4DED3]/60 uppercase"
          >
            Team
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[12px] tracking-[1.5px] text-[#8A837A] font-medium py-1 uppercase"
          >
            Admin Dashboard →
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking('General');
            }}
            className="mt-2 w-full flex justify-center items-center gap-2 bg-[#171615] text-[#FBFAF7] hover:bg-[#5B1F28] py-3.5 text-[12px] tracking-[1.5px] font-semibold uppercase"
          >
            <span>Book a Discovery Call</span>
            <span className="text-[14px]">→</span>
          </button>
        </div>
      )}
    </nav>
  );
};
