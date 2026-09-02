'use client';

import React from 'react';

const BRANDS = [
  'Pepe Jeans London',
  'Myntra',
  'Landmark Styli',
  'Amazon',
  'Nordstrom',
  'Wildfang',
  'Bloomingwear',
  'Iconic',
  'True Religion',
  'The Souled Store',
  'Wrogn',
  'Kidbea',
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="bg-[#171615] border-t border-[#F5F1EA]/10 py-7 overflow-hidden relative select-none">
      <div className="text-center text-[10px] tracking-[3px] uppercase text-[#8A837A] font-semibold mb-5">
        Designed, produced &amp; shipped for
      </div>

      <div className="flex overflow-hidden relative w-full">
        {/* Infinite Looping Track */}
        <div className="animate-brand-scroll flex items-center">
          {/* First loop */}
          <div className="flex items-center font-serif italic text-[24px] md:text-[27px] text-[#F5F1EA]/75 whitespace-nowrap">
            {BRANDS.map((brand, idx) => (
              <React.Fragment key={`brand-1-${idx}`}>
                <span className="px-6 md:px-8 hover:text-[#C9A16B] transition-colors">{brand}</span>
                <span className="text-[#5B1F28] text-[18px]">•</span>
              </React.Fragment>
            ))}
          </div>
          {/* Duplicate loop for seamless infinite wrap */}
          <div aria-hidden="true" className="flex items-center font-serif italic text-[24px] md:text-[27px] text-[#F5F1EA]/75 whitespace-nowrap">
            {BRANDS.map((brand, idx) => (
              <React.Fragment key={`brand-2-${idx}`}>
                <span className="px-6 md:px-8 hover:text-[#C9A16B] transition-colors">{brand}</span>
                <span className="text-[#5B1F28] text-[18px]">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
