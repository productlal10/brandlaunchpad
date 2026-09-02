'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenBooking: (track?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#171615] text-[#F5F1EA]/70 pt-16 pb-10 border-t border-[#F5F1EA]/10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-12 border-b border-[#F5F1EA]/12">
          {/* Brand Info */}
          <div className="max-w-[320px]">
            <div className="text-[18px] font-bold tracking-[6px] text-[#F5F1EA] mb-2.5">
              LAL10
            </div>
            <div className="font-serif italic text-[18px] md:text-[19px] text-[#F5F1EA]/60">
              From moodboard to marketplace.
            </div>
            <p className="text-[12.5px] text-[#F5F1EA]/50 mt-4 leading-relaxed font-sans">
              Connecting emerging and scaling apparel brands with India&apos;s leading certified MSME factories and real-time market data.
            </p>
          </div>

          {/* Footer Links Column Group */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {/* Services */}
            <div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-[#F5F1EA]/45 font-semibold mb-4">
                Services
              </div>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <Link href="#offerings" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="#intelligence" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    Trend Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="#offerings" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    Sourcing
                  </Link>
                </li>
                <li>
                  <Link href="#engagement" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    Market Intelligence
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-[#F5F1EA]/45 font-semibold mb-4">
                Company
              </div>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <Link href="#team" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#engagement" className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors">
                    Engagement
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-[#C9A16B] hover:text-[#E4B889] transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-[#F5F1EA]/45 font-semibold mb-4">
                Get in Touch
              </div>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <button
                    onClick={() => onOpenBooking('General')}
                    className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors text-left"
                  >
                    Book a Call
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:hello@lal10.com"
                    className="text-[#F5F1EA]/75 hover:text-[#C9A16B] transition-colors"
                  >
                    hello@lal10.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright & Subtext */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-[#F5F1EA]/50">
          <div>© {new Date().getFullYear()} Lal10 FashionOS. Part of Lal10.</div>
          <div>The playbook behind launching and scaling brands.</div>
        </div>
      </div>
    </footer>
  );
};
