'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Lock, ArrowUpRight, Sparkles } from 'lucide-react';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: string;
}

const stageOptions = [
  'Concept & Early Moodboard',
  'Sampling & Development',
  'Production Ready',
  'Scaling an Existing Label',
  'Looking for Market Intelligence',
];

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({
  isOpen,
  onClose,
  defaultTrack = 'Launch Sprint',
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    brandName: '',
    stage: '',
    email: '',
    notes: '',
    trackInterest: defaultTrack,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.brandName.trim()) {
      setErrorMessage('Please fill in your name, brand, and email to continue.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/discovery-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: '',
          brandName: formData.brandName,
          category: 'General',
          stage: formData.stage || 'Not specified',
          budget: 'Not specified',
          preferredDate: '',
          preferredTimeSlot: 'To be confirmed',
          notes: formData.notes,
          trackInterest: formData.trackInterest,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to submit. Please try again.');
      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setErrorMessage('');
    setFormData({ fullName: '', brandName: '', stage: '', email: '', notes: '', trackInterest: defaultTrack });
    onClose();
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#1A1A1A',
    background: '#FFFFFF',
    border: `1px solid ${focusedField === field ? '#6B1F2A' : '#E4DDD4'}`,
    borderRadius: '6px',
    outline: 'none',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(107,31,42,0.08)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1.6px',
    fontWeight: 600,
    color: '#4A3F35',
    marginBottom: '8px',
  };

  return (
    <>
      <style>{`
        @keyframes lal10ModalIn {
          from { opacity: 0; transform: scale(0.93) translateY(14px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .lal10-modal-card {
          animation: lal10ModalIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          background: 'rgba(12, 10, 9, 0.72)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        {/* Modal Card */}
        <div
          className="lal10-modal-card"
          style={{
            position: 'relative',
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '94vh',
            overflowY: 'auto',
            borderRadius: '16px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F3EFE9',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B5D51',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E8E0D6')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F3EFE9')}
          >
            <X size={15} />
          </button>

          {success ? (
            /* ── Success State ── */
            <div style={{ padding: '52px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6B1F2A 0%, #9B3A47 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
              }}>
                <CheckCircle2 size={30} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '26px', fontWeight: 400, color: '#1A1A1A', marginBottom: '12px', lineHeight: 1.3 }}>
                You&rsquo;re on the list
              </h3>
              <p style={{ fontSize: '14px', color: '#6B5D51', lineHeight: 1.7, maxWidth: '340px', marginBottom: '6px' }}>
                Thank you, <strong style={{ color: '#1A1A1A' }}>{formData.fullName}</strong>. We&rsquo;ve received your request for{' '}
                <strong style={{ color: '#1A1A1A' }}>{formData.brandName}</strong>.
              </p>
              <p style={{ fontSize: '13.5px', color: '#6B5D51', lineHeight: 1.7, maxWidth: '340px', marginBottom: '32px' }}>
                Our advisory team will send a calendar invite to{' '}
                <strong style={{ color: '#6B1F2A' }}>{formData.email}</strong> within 24 hours.
              </p>
              <div style={{ width: '100%', height: '1px', background: '#F0EBE4', marginBottom: '28px' }} />
              <button
                onClick={handleClose}
                style={{
                  padding: '13px 36px', fontSize: '11.5px', letterSpacing: '1.8px',
                  textTransform: 'uppercase', fontWeight: 600, color: '#fff',
                  background: 'linear-gradient(135deg, #1A1A1A, #2E2E2E)',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ padding: '36px 32px 24px', borderBottom: '1px solid #F0EBE4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles size={13} color="#C4956A" />
                  <span style={{ fontSize: '10.5px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C4956A', fontWeight: 600 }}>
                    Lal10 FashionOS Advisory
                  </span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '27px', fontWeight: 400, color: '#1A1A1A', margin: '0 0 6px', lineHeight: 1.2 }}>
                  Book a discovery call
                </h2>
                <p style={{ fontSize: '14px', color: '#8C7B6E', margin: 0, lineHeight: 1.5 }}>
                  Let&rsquo;s explore how we can help your brand grow.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {errorMessage && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '14px 16px', background: '#FEF2F2',
                    border: '1px solid #FECACA', borderRadius: '8px',
                    fontSize: '13px', color: '#DC2626',
                  }}>
                    <AlertCircle size={15} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name + Brand Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Name <span style={{ color: '#6B1F2A' }}>*</span></label>
                    <input
                      type="text" required placeholder="Your name"
                      value={formData.fullName}
                      onChange={e => handleChange('fullName', e.target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle('fullName')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Brand <span style={{ color: '#6B1F2A' }}>*</span></label>
                    <input
                      type="text" required placeholder="Brand name"
                      value={formData.brandName}
                      onChange={e => handleChange('brandName', e.target.value)}
                      onFocus={() => setFocusedField('brandName')}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle('brandName')}
                    />
                  </div>
                </div>

                {/* Stage */}
                <div>
                  <label style={labelStyle}>Stage</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={formData.stage}
                      onChange={e => handleChange('stage', e.target.value)}
                      onFocus={() => setFocusedField('stage')}
                      onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle('stage'), appearance: 'none', paddingRight: '40px', cursor: 'pointer', color: formData.stage ? '#1A1A1A' : '#AAAAAA' }}
                    >
                      <option value="" disabled>Select a stage</option>
                      {stageOptions.map(s => <option key={s} value={s} style={{ color: '#1A1A1A' }}>{s}</option>)}
                    </select>
                    <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4L6 8L10 4" stroke="#8C7B6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email <span style={{ color: '#6B1F2A' }}>*</span></label>
                  <input
                    type="email" required placeholder="you@brand.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('email')}
                  />
                </div>

                {/* Challenge */}
                <div>
                  <label style={labelStyle}>Current sourcing challenge</label>
                  <textarea
                    rows={3} placeholder="In one line"
                    value={formData.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                    onFocus={() => setFocusedField('notes')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle('notes'), resize: 'none', lineHeight: 1.6 }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '10px', padding: '16px', fontSize: '12px', letterSpacing: '2px',
                    textTransform: 'uppercase', fontWeight: 600, color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #6B1F2A 0%, #8B2A38 50%, #6B1F2A 100%)',
                    border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 20px rgba(107,31,42,0.35)',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                    fontFamily: 'inherit',
                    marginTop: '4px',
                  }}
                >
                  {loading ? (
                    <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /><span>Submitting…</span></>
                  ) : (
                    <><span>Book my call</span><ArrowUpRight size={16} /></>
                  )}
                </button>

                {/* Trust */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Lock size={12} color="#B0A090" />
                  <span style={{ fontSize: '12px', color: '#B0A090' }}>We respect your time. No spam, ever.</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
