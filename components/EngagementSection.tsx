'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface EngagementSectionProps {
  onOpenBooking: (track?: string) => void;
}

export const EngagementSection: React.FC<EngagementSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="engagement" className="bg-[#F3EEE4] py-24 md:py-28 border-y border-[#E4DED3]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] tracking-[2.5px] uppercase text-[#5B1F28] font-semibold mb-4">
          Engagement Options
        </div>
        <h2 className="font-serif font-normal text-[38px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.5px] max-w-[760px] mb-5 text-[#171615]">
          Ways to work with us.
        </h2>
        <p className="text-[16.5px] md:text-[18px] leading-[1.6] text-[#6B655E] max-w-[680px] mb-14">
          Three engagement tracks — from launching your first collection to ongoing growth support and standalone market intelligence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Card 01: Launch Sprint */}
          <div className="bg-[#FBFAF7] border border-[#E4DED3] border-t-[3px] border-t-[#5B1F28] p-8 md:p-11 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <div className="text-[11px] tracking-[1.5px] uppercase text-[#5B1F28] font-bold">01</div>
                <span className="text-[10px] tracking-[1px] font-semibold uppercase bg-[#5B1F28]/10 text-[#5B1F28] px-2.5 py-0.5">
                  Flagship
                </span>
              </div>
              <h3 className="font-serif text-[28px] md:text-[32px] font-medium mb-2 text-[#171615]">
                Launch Sprint
              </h3>
              <div className="text-[14px] text-[#6B655E] mb-1.5 font-medium">
                For founders launching their first collection
              </div>
              <div className="text-[13px] text-[#8A837A] pb-5 mb-6 border-b border-[#E4DED3]">
                6–10 week engagement
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  'Product strategy — moodboard, range finalisation, design direction',
                  'Assortment planning powered by Market Intelligence',
                  'Fabric mapping and material selection advisory',
                  'Vendor introduction and supplier shortlisting',
                  'Product-market fit validation against live data',
                  'Pricing strategy — MRP, discount corridor, margins',
                ].map((item, idx) => (
                  <li key={idx} className="text-[14.5px] md:text-[15px] leading-[1.5] text-[#3A362F] pl-6 relative">
                    <span className="absolute left-0 top-2 w-[7px] h-[7px] border-[1.5px] border-[#5B1F28] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenBooking('Launch Sprint')}
              className="w-full flex items-center justify-center gap-2 bg-[#5B1F28] text-[#FBFAF7] hover:bg-[#7A2A34] py-3.5 px-4 text-[11px] tracking-[1.5px] uppercase font-semibold transition-all group"
            >
              <span>Apply for Launch Sprint</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 02: Growth Advisory */}
          <div className="bg-[#FBFAF7] border border-[#E4DED3] border-t-[3px] border-t-[#C9A16B] p-8 md:p-11 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <div className="text-[11px] tracking-[1.5px] uppercase text-[#5B1F28] font-bold">02</div>
                <span className="text-[10px] tracking-[1px] font-semibold uppercase bg-[#C9A16B]/15 text-[#171615] px-2.5 py-0.5">
                  Scale &amp; Retainer
                </span>
              </div>
              <h3 className="font-serif text-[28px] md:text-[32px] font-medium mb-2 text-[#171615]">
                Growth Advisory
              </h3>
              <div className="text-[14px] text-[#6B655E] mb-1.5 font-medium">
                For brands that want continued strategic guidance
              </div>
              <div className="text-[13px] text-[#8A837A] pb-5 mb-6 border-b border-[#E4DED3]">
                Continued strategic guidance
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  'Monthly performance review — sell-through, returns, health',
                  'Next-collection planning and seasonal calendar',
                  'New category expansion strategy',
                  'Sale-event strategy (EORS, BFF, BBD)',
                  'Ongoing vendor pipeline and sourcing advisory',
                  'Priority access to Lal10\'s vendor & fabric network',
                ].map((item, idx) => (
                  <li key={idx} className="text-[14.5px] md:text-[15px] leading-[1.5] text-[#3A362F] pl-6 relative">
                    <span className="absolute left-0 top-2 w-[7px] h-[7px] border-[1.5px] border-[#C9A16B] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenBooking('Growth Advisory')}
              className="w-full flex items-center justify-center gap-2 bg-[#171615] text-[#FBFAF7] hover:bg-[#5B1F28] py-3.5 px-4 text-[11px] tracking-[1.5px] uppercase font-semibold transition-all group"
            >
              <span>Explore Growth Advisory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 03: Market Intelligence (Full Width) */}
          <div className="md:col-span-2 bg-[#171615] text-[#F5F1EA] border-t-[3px] border-t-[#C9A16B] p-8 md:p-12 shadow-lg">
            <div className="flex justify-between items-baseline mb-2">
              <div className="text-[11px] tracking-[1.5px] uppercase text-[#C9A16B] font-bold">03</div>
              <span className="text-[10px] tracking-[1.5px] font-semibold uppercase bg-[#C9A16B]/20 text-[#C9A16B] px-3 py-0.5 border border-[#C9A16B]/40">
                Data Track
              </span>
            </div>
            <h3 className="font-serif text-[30px] md:text-[34px] font-medium mb-2 text-[#F5F1EA]">
              Market Intelligence
            </h3>
            <p className="text-[14.5px] md:text-[15px] text-[#F5F1EA]/75 max-w-[660px] pb-6 mb-7 border-b border-[#F5F1EA]/15">
              Powered by Lal10&apos;s FashionOS arm. Competitor brands analysis on SKU level across all digital distribution channels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-4 mb-8">
              {[
                'SKU-level analysis across all digital channels',
                'Price-band mapping and discount-pattern tracking',
                'Inventory depth and availability monitoring',
                'Revenue estimation across digital channels',
                'Bestseller identification and rating-trend analysis',
                'Actionable report for assortment & positioning',
              ].map((item, idx) => (
                <div key={idx} className="text-[14.5px] text-[#F5F1EA]/85 pl-6 relative leading-[1.5]">
                  <span className="absolute left-0 top-2 w-[7px] h-[7px] border-[1.5px] border-[#C9A16B] rounded-full" />
                  {item}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F5F1EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[13px] text-[#F5F1EA]/60">
                Includes category deep dive report and 1-on-1 strategic assortment debrief.
              </span>
              <button
                onClick={() => onOpenBooking('Market Intelligence')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A16B] text-[#171615] hover:bg-[#E4B889] py-3 px-6 text-[11px] tracking-[1.5px] uppercase font-bold transition-all"
              >
                <span>Request Intelligence Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
