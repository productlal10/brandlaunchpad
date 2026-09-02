'use client';

import React from 'react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      time: '01 · 30 Min',
      title: 'Discovery Call',
      desc: "Your vision, budget and category — and whether it's the right fit.",
    },
    {
      time: '02 · Week 1–2',
      title: 'Diagnostic',
      desc: 'Budget mapping, market scan and feasibility check against the network.',
    },
    {
      time: '03 · Week 2–10',
      title: 'Launch Sprint',
      desc: 'Product and assortment advisory, factory shortlist, locked collection plan.',
    },
    {
      time: '04 · Week 4–8',
      title: 'Sample & Production',
      desc: 'Development at actuals — a contained first run before you scale.',
    },
    {
      time: '05 · Ongoing',
      title: 'Growth Advisory',
      desc: 'Sell-through review, next-collection planning, category expansion.',
    },
  ];

  return (
    <section id="process" className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-28">
      <div className="text-[11px] tracking-[2.5px] uppercase text-[#5B1F28] font-semibold mb-4">
        How It Works
      </div>
      <h2 className="font-serif font-normal text-[38px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.5px] max-w-[760px] mb-5 text-[#171615]">
        From first call to first order.
      </h2>
      <p className="text-[16.5px] md:text-[18px] leading-[1.6] text-[#6B655E] max-w-[660px] mb-16">
        A structured engagement that takes you from vision to a production-ready collection in 6–10 weeks.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-[#E4DED3] divide-y sm:divide-y-0 sm:divide-x divide-[#E4DED3]">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`py-8 sm:py-9 group hover:bg-[#F3EEE4]/40 transition-colors ${
              idx === 0 ? 'sm:pr-6' : idx === steps.length - 1 ? 'sm:pl-6' : 'sm:px-6'
            }`}
          >
            <div className="text-[11px] tracking-[1.5px] uppercase text-[#8A837A] font-semibold mb-4 group-hover:text-[#5B1F28] transition-colors">
              {step.time}
            </div>
            <h3 className="font-serif text-[21px] md:text-[23px] font-medium mb-2.5 text-[#171615]">
              {step.title}
            </h3>
            <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-[#6B655E]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
