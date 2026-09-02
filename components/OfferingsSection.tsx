'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface OfferingsSectionProps {
  onOpenBooking: (track?: string) => void;
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="offerings" className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-28">
      <div className="text-[11px] tracking-[2.5px] uppercase text-[#5B1F28] font-semibold mb-4">
        What We Bring to the Table
      </div>
      <h2 className="font-serif font-normal text-[38px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.5px] max-w-[760px] mb-5 text-[#171615]">
        Three capabilities, one operating system.
      </h2>
      <p className="text-[16.5px] md:text-[18px] leading-[1.6] text-[#6B655E] max-w-[660px] mb-16">
        Everything a founder needs to go from concept to a live, competitive listing — grounded in real supply-chain experience, not theory.
      </p>

      <div className="grid grid-cols-1 divide-y divide-[#E4DED3]">
        {/* 01 Product */}
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 md:py-12 group">
          <div className="font-serif text-[38px] md:text-[44px] text-[#C9A16B] font-normal group-hover:text-[#5B1F28] transition-colors">
            01
          </div>
          <div className="max-w-[760px]">
            <h3 className="font-serif text-[26px] md:text-[30px] font-medium mb-3 text-[#171615] group-hover:text-[#5B1F28] transition-colors">
              Product
            </h3>
            <p className="text-[15.5px] md:text-[16px] leading-[1.7] text-[#57524B] mb-4">
              Design direction, moodboard review, range finalisation, sample development and quality approvals.
              Assortment planning powered by Lal10 Market Intelligence.
            </p>
            <button
              onClick={() => onOpenBooking('Launch Sprint')}
              className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[1px] uppercase font-semibold text-[#5B1F28] hover:text-[#7A2A34]"
            >
              <span>Explore Product Advisory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 02 Trend Intelligence */}
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 md:py-12 group">
          <div className="font-serif text-[38px] md:text-[44px] text-[#C9A16B] font-normal group-hover:text-[#5B1F28] transition-colors">
            02
          </div>
          <div className="max-w-[760px]">
            <div className="flex items-baseline gap-4 flex-wrap mb-3">
              <h3 className="font-serif text-[26px] md:text-[30px] font-medium text-[#171615] group-hover:text-[#5B1F28] transition-colors">
                Trend Intelligence
              </h3>
              <span className="text-[9.5px] tracking-[1.5px] uppercase font-semibold text-[#5B1F28] border border-[#D8C4B0] px-3 py-0.5 bg-[#F3EEE4]">
                Powered by FashionOS
              </span>
            </div>
            <p className="text-[15.5px] md:text-[16px] leading-[1.7] text-[#57524B] mb-4">
              Competitor brands analysis on SKU level — pricing, inventory and revenue across all digital distribution channels.
              Data-driven insight to inform your positioning and go-to-market strategy.
            </p>
            <a
              href="#intelligence"
              className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[1px] uppercase font-semibold text-[#5B1F28] hover:text-[#7A2A34]"
            >
              <span>View Interactive Intelligence Engine</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 03 Sourcing */}
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 md:py-12 group border-b border-[#E4DED3]">
          <div className="font-serif text-[38px] md:text-[44px] text-[#C9A16B] font-normal group-hover:text-[#5B1F28] transition-colors">
            03
          </div>
          <div className="max-w-[760px]">
            <h3 className="font-serif text-[26px] md:text-[30px] font-medium mb-3 text-[#171615] group-hover:text-[#5B1F28] transition-colors">
              Sourcing
            </h3>
            <p className="text-[15.5px] md:text-[16px] leading-[1.7] text-[#57524B] mb-4">
              Vendor introductions from our network, fabric library access, supplier shortlisting guidance and production-readiness assessment.
            </p>
            <button
              onClick={() => onOpenBooking('Launch Sprint')}
              className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[1px] uppercase font-semibold text-[#5B1F28] hover:text-[#7A2A34]"
            >
              <span>Access Sourcing Network</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
