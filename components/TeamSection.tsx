'use client';

import React from 'react';

export const TeamSection: React.FC = () => {
  const team = [
    {
      initials: 'MG',
      name: 'Maneet Gohil',
      role: 'Co-founder, Lal10 & TheFashionOS',
      bio: "Co-founder of Lal10 and TheFashionOS, and a TEDx speaker. Over the past decade he's turned raw ideas into operating companies, with deep expertise in exports and go-to-market. At Lal10 he's built a full-stack fashion ecosystem connecting global D2C and B2B brands with certified MSME factories. Forbes 30 Under 30 and Entrepreneur 35 Under 35.",
    },
    {
      initials: 'SG',
      name: 'Sanchit Govil',
      role: 'Co-founder, Lal10',
      bio: 'Co-founder of Lal10, where he has built partnerships with Indian and global brands. A Forbes India 30 Under 30 honoree, he believes business is built on the relationships and financial systems most founders overlook — a philosophy that shapes how Lal10 operates behind the scenes.',
    },
    {
      initials: 'AJ',
      name: 'Albin Jose',
      role: 'Co-founder & CPO / AI',
      bio: 'Owns product and the technology layer — the tooling that keeps 50 factories, their capacity and their quality data in one connected system.',
    },
  ];

  return (
    <section id="team" className="bg-[#171615] text-[#F5F1EA] py-24 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-[11px] tracking-[2.5px] uppercase text-[#C9A16B] font-semibold mb-4">
          Who&apos;s Behind It
        </div>
        <h2 className="font-serif font-normal text-[38px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.5px] max-w-[760px] mb-5 text-[#F5F1EA]">
          Operators who&apos;ve built the machine.
        </h2>
        <p className="text-[16.5px] md:text-[18px] leading-[1.6] text-[#F5F1EA]/70 max-w-[700px] mb-14">
          A founding team spanning marketplace strategy, production discipline, and the technology that ties 50 factories into one system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="border border-[#F5F1EA]/15 p-8 md:p-9 bg-[#171615] hover:border-[#C9A16B]/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-[60px] h-[60px] border border-[#C9A16B] text-[#C9A16B] flex items-center justify-center font-serif text-[24px] mb-6">
                  {member.initials}
                </div>
                <h3 className="font-serif text-[22px] md:text-[24px] font-medium text-[#F5F1EA] mb-1">
                  {member.name}
                </h3>
                <div className="text-[11px] tracking-[1.5px] uppercase text-[#C9A16B] font-semibold mb-5">
                  {member.role}
                </div>
                <p className="text-[14px] md:text-[14.5px] leading-[1.7] text-[#F5F1EA]/75 font-normal">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
