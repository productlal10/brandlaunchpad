'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (track?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <header className="relative bg-[#171615] text-[#F5F1EA] overflow-hidden min-h-[640px] md:min-h-[720px] flex items-center">
      {/* Background Photography Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Lal10 FashionOS Atelier Cutting Table and Textiles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        {/* Editorial Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(100deg, rgba(23,22,21,0.96) 0%, rgba(23,22,21,0.85) 45%, rgba(23,22,21,0.58) 100%)'
          }}
        />
        {/* Subtle warm grain / highlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A16B]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 text-[10.5px] md:text-[11px] tracking-[2.5px] uppercase text-[#C9A16B] font-semibold mb-8 md:mb-9 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A16B]" />
          <span>Part of Lal10 · The playbook behind launching &amp; scaling brands</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-serif text-[48px] sm:text-[62px] lg:text-[76px] font-normal leading-[1.03] tracking-[-0.5px] max-w-[920px] mb-8 text-[#F5F1EA] text-balance">
          Your fashion brand, built on{' '}
          <em className="italic font-normal text-[#C9A16B] underline decoration-[#5B1F28]/60 decoration-1 underline-offset-8">
            supply-chain intelligence.
          </em>
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-[17px] md:text-[19px] leading-[1.65] text-[#F5F1EA]/80 max-w-[680px] mb-11 font-sans">
          An operating system for founders entering fashion — from market intelligence,
          product strategy and assortment planning to sourcing advisory and marketplace readiness.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-10">
          <button
            onClick={() => onOpenBooking('Launch Sprint')}
            className="inline-flex items-center justify-center gap-3 text-[#F5F1EA] hover:text-[#C9A16B] text-[13px] tracking-[1.5px] uppercase font-semibold border-b border-[#F5F1EA]/40 hover:border-[#C9A16B] pb-2 transition-all group"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#C9A16B]" />
          </button>

          <a
            href="#offerings"
            className="inline-flex items-center justify-center gap-3 text-[#F5F1EA]/70 hover:text-[#F5F1EA] text-[13px] tracking-[1.5px] uppercase font-semibold border-b border-[#F5F1EA]/20 hover:border-[#F5F1EA]/60 pb-2 transition-all group"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
};
