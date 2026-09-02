'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose, serviceName }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [brandName, setBrandName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerService: serviceName,
          fullName,
          email,
          phone,
          brandName,
          projectBrief,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit partner inquiry.');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171615]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FBFAF7] border border-[#E4DED3] max-w-[540px] w-full shadow-2xl relative">
        <div className="p-6 bg-[#171615] text-[#F5F1EA] flex justify-between items-start">
          <div>
            <div className="text-[10px] tracking-[2.5px] uppercase text-[#C9A16B] font-semibold mb-1">
              Lal10 Partner Network
            </div>
            <h3 className="font-serif text-[24px] font-normal">
              Request Intro: {serviceName}
            </h3>
            <p className="text-[12px] text-[#F5F1EA]/70 mt-1">
              Direct connection with verified specialist partners. No agency markups.
            </p>
          </div>
          <button onClick={handleClose} className="p-1 text-[#F5F1EA]/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-[#5B1F28] mx-auto mb-3" />
              <h4 className="font-serif text-[24px] text-[#171615] mb-2">Introduction Requested</h4>
              <p className="text-[14px] text-[#57524B] mb-6 leading-relaxed">
                We have received your request for <span className="font-semibold text-[#171615]">{serviceName}</span>.
                Our ecosystem coordinator will initiate direct email introductions with vetted partners.
              </p>
              <button
                onClick={handleClose}
                className="bg-[#171615] text-white px-6 py-2.5 text-[11px] tracking-[1.5px] uppercase font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-[#5B1F28]/10 text-[#5B1F28] text-[12.5px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#171615] mb-1">
                  Founder Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Mehta"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13.5px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#171615] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#171615] mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atelier Noir"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13.5px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#171615] mb-1">
                  Project Brief &amp; Scope Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your timeline, number of SKUs, or specific marketplace requirements..."
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#E4DED3] focus:border-[#5B1F28] outline-none text-[13px]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-[#5B1F28] text-white hover:bg-[#7A2A34] px-6 py-2.5 text-[11px] tracking-[1.5px] uppercase font-semibold transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Intro</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
