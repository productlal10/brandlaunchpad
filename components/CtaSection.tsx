'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onOpenBooking: (track?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="max-w-[1200px] mx-auto px-6 md:px-10 py-28 md:py-36 text-center">
      <div className="text-[11px] tracking-[2.5px] uppercase text-[#5B1F28] font-semibold mb-5">
        Next Step
      </div>
      <h2 className="font-serif font-normal text-[44px] sm:text-[54px] md:text-[60px] leading-[1.05] tracking-[-0.5px] mb-6 text-[#171615]">
        Let&apos;s start with a conversation.
      </h2>
      <p className="text-[17px] md:text-[19px] leading-[1.6] text-[#6B655E] max-w-[600px] mx-auto mb-11">
        A 30-minute discovery call to understand your vision, budget and category — and to figure out if this is the right fit for both of us. No commitment, no pitch.
      </p>

      <button
        onClick={() => onOpenBooking('General')}
        className="inline-flex items-center gap-3 bg-[#171615] text-[#FBFAF7] hover:bg-[#5B1F28] px-9 py-4 text-[12px] md:text-[13px] tracking-[1.5px] uppercase font-semibold transition-all duration-200 shadow-md group"
      >
        <span>Book a Discovery Call</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </button>
    </section>
  );
};
