'use client';

import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      number: '10+',
      label: 'Brands launched across womenswear, menswear & kidswear',
    },
    {
      number: '50',
      label: 'Certified factories in one connected system',
    },
    {
      number: '35',
      label: 'Day design-to-delivery benchmark',
    },
    {
      number: 'E2E',
      label: 'Design → Sample → Production → Listing',
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-[#E4DED3]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="border-l border-[#E4DED3] pl-6 py-2 group hover:border-[#5B1F28] transition-colors">
            <div className="font-serif text-[48px] md:text-[60px] font-normal text-[#5B1F28] leading-none mb-3.5 tracking-tight group-hover:scale-105 transition-transform origin-left">
              {stat.number}
            </div>
            <div className="text-[11.5px] md:text-[12px] tracking-[1px] leading-[1.55] text-[#57524B] uppercase font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
