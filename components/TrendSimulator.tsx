'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, BarChart3, ArrowRight, ShieldCheck, Layers, RefreshCw } from 'lucide-react';
import { CategoryTrendData } from '@/lib/types';

interface TrendSimulatorProps {
  onOpenBooking: (track?: string) => void;
}

export const TrendSimulator: React.FC<TrendSimulatorProps> = ({ onOpenBooking }) => {
  const [trends, setTrends] = useState<CategoryTrendData[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string>('womenswear-contemporary');
  const [simulatedPrice, setSimulatedPrice] = useState<number>(2499);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTrends() {
      try {
        const res = await fetch('/api/trends');
        const data = await res.json();
        if (data.categories) {
          setTrends(data.categories);
        }
      } catch (err) {
        console.error('Failed to load trends:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTrends();
  }, []);

  const activeCategory = trends.find((t) => t.id === selectedCatId) || trends[0];

  // Calculated metrics
  const estimatedFactoryCost = Math.round(simulatedPrice * 0.32);
  const marketplaceFeeEst = Math.round(simulatedPrice * 0.18);
  const netMarginEst = Math.round(simulatedPrice - estimatedFactoryCost - marketplaceFeeEst);
  const netMarginPercent = simulatedPrice > 0 ? Math.round((netMarginEst / simulatedPrice) * 100) : 0;

  return (
    <section id="intelligence" className="bg-[#171615] text-[#F5F1EA] py-24 md:py-28 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#5B1F28]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A16B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[11px] tracking-[2.5px] uppercase text-[#C9A16B] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FashionOS Intelligence Engine</span>
            </div>
            <h2 className="font-serif font-normal text-[36px] sm:text-[46px] md:text-[52px] leading-[1.08] text-[#F5F1EA]">
              Market Data &amp; Assortment Simulator
            </h2>
          </div>
          <p className="text-[14.5px] text-[#F5F1EA]/70 max-w-[420px] leading-relaxed">
            Live SKU datafeed tracking price elasticity, discount patterns, and inventory velocity across Myntra, Amazon, and D2C channels.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#F5F1EA]/15">
          {trends.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2.5 text-[12px] tracking-[1px] uppercase font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCatId === cat.id
                  ? 'bg-[#C9A16B] text-[#171615] shadow-sm'
                  : 'text-[#F5F1EA]/70 hover:text-[#F5F1EA] hover:bg-[#F5F1EA]/5'
              }`}
            >
              {cat.categoryName.split('·')[0].trim()}
            </button>
          ))}
        </div>

        {activeCategory ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Card: Market Intelligence Metrics */}
            <div className="lg:col-span-7 bg-[#23211F] border border-[#F5F1EA]/15 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F1EA]/10 mb-6">
                  <h3 className="font-serif text-[22px] md:text-[26px] text-[#F5F1EA] font-normal">
                    {activeCategory.categoryName}
                  </h3>
                  <span className="text-[11px] font-mono text-[#C9A16B] bg-[#C9A16B]/15 px-2.5 py-1 border border-[#C9A16B]/30">
                    YoY Growth: {activeCategory.marketDemandGrowthYoY}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#171615] p-4 border border-[#F5F1EA]/10">
                    <div className="text-[10.5px] uppercase tracking-wider text-[#8A837A] mb-1 font-semibold">
                      Selling Price Range
                    </div>
                    <div className="text-[16px] md:text-[18px] font-serif text-[#F5F1EA]">
                      {activeCategory.avgSellingPrice}
                    </div>
                  </div>

                  <div className="bg-[#171615] p-4 border border-[#F5F1EA]/10">
                    <div className="text-[10.5px] uppercase tracking-wider text-[#8A837A] mb-1 font-semibold">
                      Target Gross Margin
                    </div>
                    <div className="text-[16px] md:text-[18px] font-serif text-[#C9A16B]">
                      {activeCategory.grossMarginBenchmark}
                    </div>
                  </div>

                  <div className="bg-[#171615] p-4 border border-[#F5F1EA]/10 col-span-2 sm:col-span-1">
                    <div className="text-[10.5px] uppercase tracking-wider text-[#8A837A] mb-1 font-semibold">
                      Sell-Through Pace
                    </div>
                    <div className="text-[16px] md:text-[18px] font-serif text-[#F5F1EA]">
                      {activeCategory.avgDaysToSellThrough} Days Avg
                    </div>
                  </div>
                </div>

                {/* Sub-categories */}
                <div className="mb-6">
                  <div className="text-[11px] uppercase tracking-[1.5px] text-[#8A837A] font-semibold mb-3">
                    Top Trending Product Forms (High-Demand SKUs)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeCategory.topPerformingSubCategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[12.5px] bg-[#171615] text-[#F5F1EA]/90 px-3 py-1.5 border border-[#F5F1EA]/15 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A16B]" />
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#5B1F28]/30 border border-[#5B1F28]/60 text-[13px] text-[#F5F1EA]/85 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#E4B889] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#E4B889]">Channel Discount Corridor:</span>{' '}
                    {activeCategory.discountCorridor}. Return rate benchmark calibrated at{' '}
                    {activeCategory.returnRateBenchmark}.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Interactive Margin Simulator */}
            <div className="lg:col-span-5 bg-[#23211F] border border-[#F5F1EA]/15 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F1EA]/10 mb-6">
                  <div className="text-[11px] tracking-[1.5px] uppercase text-[#C9A16B] font-semibold">
                    Unit Economics Sandbox
                  </div>
                  <BarChart3 className="w-4 h-4 text-[#C9A16B]" />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[12px] uppercase tracking-wider text-[#F5F1EA]/80 font-medium">
                      Simulated Retail Price (MRP)
                    </label>
                    <span className="font-serif text-[20px] text-[#C9A16B]">₹{simulatedPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="999"
                    max="6999"
                    step="100"
                    value={simulatedPrice}
                    onChange={(e) => setSimulatedPrice(Number(e.target.value))}
                    className="w-full h-2 bg-[#171615] rounded-lg appearance-none cursor-pointer accent-[#C9A16B]"
                  />
                  <div className="flex justify-between text-[10px] text-[#8A837A] mt-1 font-mono">
                    <span>₹999</span>
                    <span>₹3,999</span>
                    <span>₹6,999</span>
                  </div>
                </div>

                {/* Estimated Unit Waterfall */}
                <div className="space-y-3 bg-[#171615] p-4 border border-[#F5F1EA]/10 mb-6 font-mono text-[12px]">
                  <div className="flex justify-between text-[#F5F1EA]/75">
                    <span>Target Sourcing / FOB Cost (~32%):</span>
                    <span className="text-[#F5F1EA]">₹{estimatedFactoryCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#F5F1EA]/75">
                    <span>Marketplace / Logistics (~18%):</span>
                    <span className="text-[#F5F1EA]">₹{marketplaceFeeEst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-[#F5F1EA]/10 flex justify-between text-[#C9A16B] font-bold text-[13px]">
                    <span>Net Contribution / Brand Margin:</span>
                    <span>₹{netMarginEst.toLocaleString('en-IN')} ({netMarginPercent}%)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking('Market Intelligence')}
                className="w-full flex items-center justify-center gap-2.5 bg-[#C9A16B] text-[#171615] hover:bg-[#E4B889] py-3.5 px-4 text-[11px] tracking-[1.5px] uppercase font-bold transition-all shadow-md group"
              >
                <span>Request Custom Category Assortment Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-[#8A837A]">Loading FashionOS market trends...</div>
        )}
      </div>
    </section>
  );
};
