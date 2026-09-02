'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Calendar, Clock, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { ApparelCategory, BrandStage, BudgetTier } from '@/lib/types';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: string;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({
  isOpen,
  onClose,
  defaultTrack = 'Launch Sprint',
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brandName: '',
    category: 'Womenswear' as ApparelCategory,
    stage: 'Concept & Moodboard' as BrandStage,
    budget: '₹15L – ₹35L ($18k – $42k)' as BudgetTier,
    preferredDate: '',
    preferredTimeSlot: 'Morning (10:00 AM - 1:00 PM IST)',
    notes: '',
    trackInterest: defaultTrack,
  });

  if (!isOpen) return null;

  const categories: ApparelCategory[] = [
    'Womenswear',
    'Menswear',
    'Kidswear',
    'Footwear & Accessories',
    'Multi-category',
  ];

  const stages: BrandStage[] = [
    'Concept & Moodboard',
    'Sampling & Development',
    'Production Ready',
    'Scaling Existing Label',
  ];

  const budgets: BudgetTier[] = [
    '₹5L – ₹15L ($6k – $18k)',
    '₹15L – ₹35L ($18k – $42k)',
    '₹35L – ₹75L ($42k – $90k)',
    '₹75L+ ($90k+)',
  ];

  const timeSlots = [
    'Morning (10:00 AM – 1:00 PM IST)',
    'Afternoon (2:00 PM – 5:00 PM IST)',
    'Evening (6:00 PM – 9:00 PM IST)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/discovery-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit discovery call request.');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setStep(1);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171615]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FBFAF7] border border-[#E4DED3] max-w-[620px] w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 md:p-8 bg-[#171615] text-[#F5F1EA] flex justify-between items-start">
          <div>
            <div className="text-[10px] tracking-[2.5px] uppercase text-[#C9A16B] font-semibold mb-1">
              Lal10 FashionOS Advisory
            </div>
            <h3 className="font-serif text-[24px] md:text-[28px] font-normal">
              Book a 30-Min Discovery Call
            </h3>
            <p className="text-[12.5px] text-[#F5F1EA]/70 mt-1">
              Discuss your collection roadmap, supply-chain fit, and feasibility with operators.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 text-[#F5F1EA]/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-[#5B1F28] mx-auto mb-4" />
              <h4 className="font-serif text-[28px] text-[#171615] mb-2">
                Discovery Call Confirmed
              </h4>
              <p className="text-[15px] text-[#57524B] max-w-[440px] mx-auto mb-6 leading-relaxed">
                Thank you, <span className="font-semibold text-[#171615]">{formData.fullName}</span>.
                We have registered your details for <span className="font-semibold text-[#171615]">{formData.brandName}</span>.
                Our founder advisory team will review your category requirements and send calendar invites to{' '}
                <span className="font-semibold text-[#171615]">{formData.email}</span>.
              </p>
              <button
                onClick={handleResetAndClose}
                className="bg-[#171615] text-[#FBFAF7] hover:bg-[#5B1F28] px-8 py-3 text-[11px] tracking-[1.5px] uppercase font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 border-b border-[#E4DED3] pb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step === 1 ? 'bg-[#5B1F28] text-white' : 'bg-[#E4DED3] text-[#57524B]'
                  }`}>1</span>
                  <span className="text-[12px] uppercase tracking-wider font-semibold text-[#171615]">Founder &amp; Brand</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step === 2 ? 'bg-[#5B1F28] text-white' : 'bg-[#E4DED3] text-[#57524B]'
                  }`}>2</span>
                  <span className="text-[12px] uppercase tracking-wider font-semibold text-[#171615]">Category &amp; Scope</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3.5 bg-[#5B1F28]/10 border border-[#5B1F28] text-[#5B1F28] text-[13px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Basic Founder Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[14px] text-[#171615]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                        Work / Founder Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="priya@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[14px] text-[#171615]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[14px] text-[#171615]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                      Brand or Working Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maison Aurelia"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[14px] text-[#171615]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                      Advisory Track of Interest
                    </label>
                    <select
                      value={formData.trackInterest}
                      onChange={(e) => setFormData({ ...formData, trackInterest: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[14px] text-[#171615]"
                    >
                      <option value="Launch Sprint">Launch Sprint (6–10 Week GTM)</option>
                      <option value="Growth Advisory">Growth Advisory (Scale &amp; Retainer)</option>
                      <option value="Market Intelligence">Market Intelligence (SKU &amp; Trend Report)</option>
                      <option value="General">General Discovery &amp; Sourcing Fit</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.fullName || !formData.email || !formData.brandName) {
                          setErrorMessage('Please fill in name, email, and brand name.');
                          return;
                        }
                        setErrorMessage('');
                        setStep(2);
                      }}
                      className="flex items-center gap-2 bg-[#171615] text-[#FBFAF7] hover:bg-[#5B1F28] px-6 py-3 text-[11px] tracking-[1.5px] uppercase font-semibold transition-all"
                    >
                      <span>Continue to Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Category, Budget & Time slot */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-2">
                      Apparel Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`p-2.5 text-[12px] text-left border transition-all ${
                            formData.category === cat
                              ? 'border-[#5B1F28] bg-[#5B1F28]/10 text-[#5B1F28] font-bold'
                              : 'border-[#E4DED3] bg-white text-[#57524B] hover:border-[#171615]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-2">
                      Current Launch Stage
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {stages.map((stg) => (
                        <button
                          key={stg}
                          type="button"
                          onClick={() => setFormData({ ...formData, stage: stg })}
                          className={`p-2.5 text-[12px] text-left border transition-all ${
                            formData.stage === stg
                              ? 'border-[#5B1F28] bg-[#5B1F28]/10 text-[#5B1F28] font-bold'
                              : 'border-[#E4DED3] bg-white text-[#57524B] hover:border-[#171615]'
                          }`}
                        >
                          {stg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                        Allocated Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value as BudgetTier })}
                        className="w-full px-3 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13px] text-[#171615]"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                        Preferred Time Window
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13px] text-[#171615]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] uppercase tracking-wider font-semibold text-[#171615] mb-1.5">
                      Additional Vision / Specific Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Seeking certified linen vendors in Jaipur and pricing benchmarking for D2C..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13px] text-[#171615]"
                    />
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider font-semibold text-[#57524B] hover:text-[#171615]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-[#5B1F28] text-white hover:bg-[#7A2A34] px-7 py-3 text-[11.5px] tracking-[1.5px] uppercase font-semibold transition-all disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Scheduling...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Discovery Call</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
