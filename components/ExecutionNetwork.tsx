'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ExecutionNetworkProps {
  onOpenPartnerModal: (serviceName: string) => void;
}

export const ExecutionNetwork: React.FC<ExecutionNetworkProps> = ({ onOpenPartnerModal }) => {
  const partners = [
    {
      num: '01',
      title: 'Photography & Shoots',
      desc: 'E-commerce, model, flat-lay and lifestyle imagery, shot to marketplace spec.',
    },
    {
      num: '02',
      title: 'Marketplace Onboarding',
      desc: 'Myntra and Amazon account setup, catalog upload, listing and returns handling.',
    },
    {
      num: '03',
      title: 'Identity & Packaging',
      desc: 'Logo, brand guidelines, packaging, label and tag artwork.',
    },
    {
      num: '04',
      title: 'Performance Marketing',
      desc: 'Marketplace ads, social, influencer outreach and D2C website setup.',
    },
    {
      num: '05',
      title: 'Legal & Compliance',
      desc: 'Trademark registration, BIS compliance and brand protection.',
    },
    {
      num: '06',
      title: 'Logistics & Warehousing',
      desc: '3PL setup, warehousing and last-mile delivery optimisation.',
    },
  ];

  return (
    <section id="network" className="bg-[#F3EEE4] py-24 md:py-28 border-y border-[#E4DED3]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] tracking-[2.5px] uppercase text-[#5B1F28] font-semibold mb-4">
          Execution Network
        </div>
        <h2 className="font-serif font-normal text-[38px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.5px] max-w-[760px] mb-5 text-[#171615]">
          We advise. Vetted partners execute.
        </h2>
        <p className="text-[16.5px] md:text-[18px] leading-[1.6] text-[#6B655E] max-w-[680px] mb-14">
          We&apos;re consultants, not an agency. Through Lal10&apos;s curated network of affiliate partners,
          we connect you with verified specialists for everything beyond strategy. Partners bill you directly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E4DED3] border border-[#E4DED3]">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-[#FBFAF7] p-8 md:p-9 flex flex-col justify-between hover:bg-[#FFFFFF] transition-colors group cursor-pointer"
              onClick={() => onOpenPartnerModal(partner.title)}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="font-serif text-[30px] md:text-[32px] text-[#C9A16B] group-hover:text-[#5B1F28] transition-colors">
                    {partner.num}
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#5B1F28]">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-serif text-[20px] md:text-[22px] font-medium mb-2.5 text-[#171615] group-hover:text-[#5B1F28] transition-colors">
                  {partner.title}
                </h3>
                <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-[#6B655E]">
                  {partner.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E4DED3]/60 text-[11px] uppercase tracking-[1px] font-semibold text-[#8A837A] group-hover:text-[#5B1F28] flex items-center gap-1">
                <span>Request Introduction</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
