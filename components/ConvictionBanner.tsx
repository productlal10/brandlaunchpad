'use client';

import React from 'react';

export const ConvictionBanner: React.FC = () => {
  return (
    <div className="bg-[#5B1F28] text-[#F5F1EA] py-20 md:py-24 relative overflow-hidden">
      {/* Subtle Background Geometric Accent */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#7A2A34]/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-[11px] tracking-[2.5px] uppercase text-[#F5F1EA]/60 font-semibold mb-6">
          Operators, not advisers
        </div>
        <p className="font-serif font-normal text-[28px] sm:text-[34px] md:text-[40px] leading-[1.35] max-w-[940px] text-[#F5F1EA]">
          We don&apos;t just read about fashion. We have{' '}
          <em className="italic text-[#E4B889] font-normal">
            designed, sampled, produced and shipped
          </em>{' '}
          it — across womenswear, menswear and kidswear.
        </p>
      </div>
    </div>
  );
};
