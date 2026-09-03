'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { DiscoveryModal } from '@/components/DiscoveryModal';
import { PartnerModal } from '@/components/PartnerModal';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTrack, setBookingTrack] = useState<string>('Launch Sprint');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [selectedPartnerService, setSelectedPartnerService] = useState<string>('Photography & Shoots');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openBooking = (track: string = 'General', e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setBookingTrack(track);
    setIsBookingOpen(true);
    setMobileMenuOpen(false);
  };

  const openPartnerModal = (serviceName: string) => {
    setSelectedPartnerService(serviceName);
    setIsPartnerModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden', fontFamily: "'Manrope', sans-serif", color: '#171615', background: '#FBFAF7' }}>
      
      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(251,250,247,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #E4DED3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '19px', fontWeight: 700, letterSpacing: '6px', color: '#171615' }}>LAL10</div>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#8A837A', fontWeight: 500, marginTop: '3px' }}>FASHIONOS · FASHION BRAND OPERATING SYSTEM</div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            <a href="#offerings" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>What We Do</a>
            <a href="#process" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Process</a>
            <a href="#engagement" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Engagement</a>
            <a href="#team" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Team</a>
            <button 
              onClick={(e) => openBooking('General', e)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#171615', color: '#FBFAF7', padding: '12px 22px', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
            >
              Book a Discovery Call <span style={{ fontSize: '14px' }}>→</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="mobile-menu-btn" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={(e) => openBooking('General', e)}
              style={{ background: '#171615', color: '#FBFAF7', padding: '8px 14px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, border: 'none', cursor: 'pointer' }}
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'transparent', border: 'none', padding: '8px', color: '#171615', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{ background: '#FBFAF7', borderBottom: '1px solid #E4DED3', padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="#offerings" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', letterSpacing: '1.5px', fontWeight: 600, color: '#171615', textTransform: 'uppercase', paddingBottom: '8px', borderBottom: '1px solid #E4DED3' }}>What We Do</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', letterSpacing: '1.5px', fontWeight: 600, color: '#171615', textTransform: 'uppercase', paddingBottom: '8px', borderBottom: '1px solid #E4DED3' }}>Process</a>
            <a href="#engagement" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', letterSpacing: '1.5px', fontWeight: 600, color: '#171615', textTransform: 'uppercase', paddingBottom: '8px', borderBottom: '1px solid #E4DED3' }}>Engagement</a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', letterSpacing: '1.5px', fontWeight: 600, color: '#171615', textTransform: 'uppercase', paddingBottom: '8px', borderBottom: '1px solid #E4DED3' }}>Team</a>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '12px', letterSpacing: '1.5px', color: '#8A837A', textTransform: 'uppercase' }}>Admin Dashboard →</Link>
            <button 
              onClick={(e) => openBooking('General', e)}
              style={{ background: '#171615', color: '#FBFAF7', padding: '14px 20px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              Book a Discovery Call <span>→</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header style={{ position: 'relative', background: '#171615', color: '#F5F1EA', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(23,22,21,0.94) 0%,rgba(23,22,21,0.82) 42%,rgba(23,22,21,0.5) 100%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '120px 40px 110px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C9A16B', fontWeight: 600, marginBottom: '34px' }}>
            Part of Lal10 · The playbook behind launching &amp; scaling brands
          </div>
          <h1 className="hero-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '76px', lineHeight: 1.02, letterSpacing: '-0.5px', maxWidth: '900px', marginBottom: '32px', color: '#F5F1EA' }}>
            Your fashion brand, built on <em style={{ fontStyle: 'italic', color: '#C9A16B' }}>supply-chain intelligence.</em>
          </h1>
          <p style={{ fontSize: '19px', lineHeight: 1.65, color: 'rgba(245,241,234,0.78)', maxWidth: '660px', marginBottom: '44px' }}>
            An operating system for founders entering fashion — from market intelligence, product strategy and assortment planning to sourcing advisory and marketplace readiness.
          </p>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <button 
              onClick={(e) => openBooking('Launch Sprint', e)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#F5F1EA', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, borderBottom: '1px solid rgba(245,241,234,0.4)', paddingBottom: '8px', background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}
            >
              Start a Conversation <span style={{ fontSize: '16px' }}>→</span>
            </button>
            <a href="#offerings" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(245,241,234,0.7)', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, borderBottom: '1px solid rgba(245,241,234,0.2)', paddingBottom: '8px' }}>
              See How It Works <span style={{ fontSize: '16px' }}>→</span>
            </a>
          </div>
        </div>
      </header>

      {/* BRANDS MARQUEE */}
      <div style={{ background: '#171615', borderTop: '1px solid rgba(245,241,234,0.1)', padding: '26px 0', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '20px' }}>Designed, produced &amp; shipped for</div>
        <div className="brandscroll-anim">
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '27px', color: 'rgba(245,241,234,0.72)', whiteSpace: 'nowrap' }}>
            <span style={{ padding: '0 30px' }}>Pepe Jeans London</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Myntra</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Landmark Styli</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Amazon</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Nordstrom</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Wildfang</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Bloomingwear</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Iconic</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>True Religion</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>The Souled Store</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Wrogn</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Kidbea</span><span style={{ color: '#5B1F28' }}>•</span>
          </div>
          <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '27px', color: 'rgba(245,241,234,0.72)', whiteSpace: 'nowrap' }}>
            <span style={{ padding: '0 30px' }}>Pepe Jeans London</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Myntra</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Landmark Styli</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Amazon</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Nordstrom</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Wildfang</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Bloomingwear</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Iconic</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>True Religion</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>The Souled Store</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Wrogn</span><span style={{ color: '#5B1F28' }}>•</span>
            <span style={{ padding: '0 30px' }}>Kidbea</span><span style={{ color: '#5B1F28' }}>•</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px', borderBottom: '1px solid #E4DED3' }}>
        <div className="stats-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          <div style={{ borderLeft: '1px solid #E4DED3', paddingLeft: '24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '60px', fontWeight: 400, color: '#5B1F28', lineHeight: 1, marginBottom: '14px' }}>10+</div>
            <div style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: 1.5, color: '#57524B', textTransform: 'uppercase', fontWeight: 500 }}>Brands launched across womenswear, menswear &amp; kidswear</div>
          </div>
          <div style={{ borderLeft: '1px solid #E4DED3', paddingLeft: '24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '60px', fontWeight: 400, color: '#5B1F28', lineHeight: 1, marginBottom: '14px' }}>50</div>
            <div style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: 1.5, color: '#57524B', textTransform: 'uppercase', fontWeight: 500 }}>Certified factories in one connected system</div>
          </div>
          <div style={{ borderLeft: '1px solid #E4DED3', paddingLeft: '24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '60px', fontWeight: 400, color: '#5B1F28', lineHeight: 1, marginBottom: '14px' }}>35</div>
            <div style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: 1.5, color: '#57524B', textTransform: 'uppercase', fontWeight: 500 }}>Day design-to-delivery benchmark</div>
          </div>
          <div style={{ borderLeft: '1px solid #E4DED3', paddingLeft: '24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '60px', fontWeight: 400, color: '#5B1F28', lineHeight: 1, marginBottom: '14px' }}>E2E</div>
            <div style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: 1.5, color: '#57524B', textTransform: 'uppercase', fontWeight: 500 }}>Design → Sample → Production → Listing</div>
          </div>
        </div>
      </section>

      {/* CONVICTION */}
      <div style={{ background: '#5B1F28', color: '#F5F1EA', padding: '88px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.55)', fontWeight: 600, marginBottom: '24px' }}>Operators, not advisers</div>
          <p className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '40px', lineHeight: 1.35, maxWidth: '940px', color: '#F5F1EA' }}>
            We don&apos;t just read about fashion. We have <em style={{ fontStyle: 'italic', color: '#E4B889' }}>designed, sampled, produced and shipped</em> it — across womenswear, menswear and kidswear.
          </p>
        </div>
      </div>

      {/* OFFERINGS */}
      <section id="offerings" style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 40px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600, marginBottom: '18px' }}>What We Bring to the Table</div>
        <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.08, letterSpacing: '-0.5px', maxWidth: '760px', marginBottom: '22px' }}>Three capabilities, one operating system.</h2>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#6B655E', maxWidth: '660px', marginBottom: '64px' }}>Everything a founder needs to go from concept to a live, competitive listing — grounded in real supply-chain experience, not theory.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
          {/* 01 Product */}
          <div className="offering-row-responsive" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '40px', padding: '44px 0', borderTop: '1px solid #E4DED3' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: '#C9A16B', fontWeight: 400 }}>01</div>
            <div style={{ maxWidth: '760px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 500, marginBottom: '12px' }}>Product</h3>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#57524B' }}>Design direction, moodboard review, range finalisation, sample development and quality approvals. Assortment planning powered by Lal10 Market Intelligence.</p>
            </div>
          </div>

          {/* 02 Trend Intelligence */}
          <div className="offering-row-responsive" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '40px', padding: '44px 0', borderTop: '1px solid #E4DED3' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: '#C9A16B', fontWeight: 400 }}>02</div>
            <div style={{ maxWidth: '760px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 500 }}>Trend Intelligence</h3>
                <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, color: '#5B1F28', border: '1px solid #D8C4B0', padding: '4px 12px', background: '#F3EEE4' }}>Powered by FashionOS</span>
              </div>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#57524B' }}>Competitor brands analysis on SKU level — pricing, inventory and revenue across all digital distribution channels. Data-driven insight to inform your positioning and go-to-market strategy.</p>
            </div>
          </div>

          {/* 03 Sourcing */}
          <div className="offering-row-responsive" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '40px', padding: '44px 0', borderTop: '1px solid #E4DED3', borderBottom: '1px solid #E4DED3' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: '#C9A16B', fontWeight: 400 }}>03</div>
            <div style={{ maxWidth: '760px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 500, marginBottom: '12px' }}>Sourcing</h3>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#57524B' }}>Vendor introductions from our network, fabric library access, supplier shortlisting guidance and production-readiness assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section id="engagement" style={{ background: '#F3EEE4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 40px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600, marginBottom: '18px' }}>Engagement Options</div>
          <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.08, letterSpacing: '-0.5px', maxWidth: '760px', marginBottom: '22px' }}>Ways to work with us.</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#6B655E', maxWidth: '680px', marginBottom: '60px' }}>Three engagement tracks — from launching your first collection to ongoing growth support and standalone market intelligence.</p>
          <div className="engagement-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div style={{ background: '#FBFAF7', border: '1px solid #E4DED3', borderTop: '3px solid #5B1F28', padding: '44px 40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600 }}>01</div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 500, marginBottom: '8px' }}>Launch Sprint</h3>
              <div style={{ fontSize: '14px', color: '#6B655E', marginBottom: '6px' }}>For founders launching their first collection</div>
              <div style={{ fontSize: '13px', color: '#8A837A', paddingBottom: '22px', marginBottom: '22px', borderBottom: '1px solid #E4DED3' }}>6–10 week engagement</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #5B1F28', borderRadius: '50%' }}></span>Product strategy — moodboard, range finalisation, design direction</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #5B1F28', borderRadius: '50%' }}></span>Assortment planning powered by Market Intelligence</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #5B1F28', borderRadius: '50%' }}></span>Fabric mapping and material selection advisory</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #5B1F28', borderRadius: '50%' }}></span>Vendor introduction and supplier shortlisting</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #5B1F28', borderRadius: '50%' }}></span>Product-market fit validation against live data</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #5B1F28', borderRadius: '50%' }}></span>Pricing strategy — MRP, discount corridor, margins</li>
              </ul>
            </div>
            <div style={{ background: '#FBFAF7', border: '1px solid #E4DED3', borderTop: '3px solid #C9A16B', padding: '44px 40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600 }}>02</div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 500, marginBottom: '8px' }}>Growth Advisory</h3>
              <div style={{ fontSize: '14px', color: '#6B655E', marginBottom: '6px' }}>For brands that want continued strategic guidance</div>
              <div style={{ fontSize: '13px', color: '#8A837A', paddingBottom: '22px', marginBottom: '22px', borderBottom: '1px solid #E4DED3' }}>Continued strategic guidance</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Monthly performance review — sell-through, returns, health</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Next-collection planning and seasonal calendar</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>New category expansion strategy</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Sale-event strategy (EORS, BFF, BBD)</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Ongoing vendor pipeline and sourcing advisory</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: '#3A362F', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Priority access to Lal10&apos;s vendor &amp; fabric network</li>
              </ul>
            </div>
            <div style={{ gridColumn: '1 / -1', background: '#171615', color: '#F5F1EA', borderTop: '3px solid #C9A16B', padding: '48px 44px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#C9A16B', fontWeight: 600 }}>03</div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '34px', fontWeight: 500, marginBottom: '8px', color: '#F5F1EA' }}>Market Intelligence</h3>
              <div style={{ fontSize: '15px', color: 'rgba(245,241,234,0.72)', maxWidth: '640px', paddingBottom: '24px', marginBottom: '28px', borderBottom: '1px solid rgba(245,241,234,0.14)' }}>Powered by Lal10&apos;s FashionOS arm. Competitor brands analysis on SKU level across all digital distribution channels.</div>
              <ul className="market-intel-grid-responsive" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 44px' }}>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(245,241,234,0.85)', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>SKU-level analysis across all digital channels</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(245,241,234,0.85)', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Price-band mapping and discount-pattern tracking</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(245,241,234,0.85)', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Inventory depth and availability monitoring</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(245,241,234,0.85)', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Revenue estimation across digital channels</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(245,241,234,0.85)', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Bestseller identification and rating-trend analysis</li>
                <li style={{ fontSize: '15px', lineHeight: 1.5, color: 'rgba(245,241,234,0.85)', paddingLeft: '22px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', border: '1.5px solid #C9A16B', borderRadius: '50%' }}></span>Actionable report for assortment &amp; positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 40px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600, marginBottom: '18px' }}>How It Works</div>
        <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.08, letterSpacing: '-0.5px', maxWidth: '760px', marginBottom: '22px' }}>From first call to first order.</h2>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#6B655E', maxWidth: '660px', marginBottom: '64px' }}>A structured engagement that takes you from vision to a production-ready collection in 6–10 weeks.</p>
        
        <div className="process-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderTop: '1px solid #E4DED3' }}>
          <div style={{ padding: '36px 24px 0 0', borderRight: '1px solid #E4DED3' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '18px' }}>01 · 30 Min</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '23px', fontWeight: 500, marginBottom: '10px' }}>Discovery Call</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E' }}>Your vision, budget and category — and whether it&apos;s the right fit.</p>
          </div>
          <div style={{ padding: '36px 24px 0 24px', borderRight: '1px solid #E4DED3' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '18px' }}>02 · Week 1–2</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '23px', fontWeight: 500, marginBottom: '10px' }}>Diagnostic</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E' }}>Budget mapping, market scan and feasibility check against the network.</p>
          </div>
          <div style={{ padding: '36px 24px 0 24px', borderRight: '1px solid #E4DED3' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '18px' }}>03 · Week 2–10</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '23px', fontWeight: 500, marginBottom: '10px' }}>Launch Sprint</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E' }}>Product and assortment advisory, factory shortlist, locked collection plan.</p>
          </div>
          <div style={{ padding: '36px 24px 0 24px', borderRight: '1px solid #E4DED3' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '18px' }}>04 · Week 4–8</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '23px', fontWeight: 500, marginBottom: '10px' }}>Sample &amp; Production</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E' }}>Development at actuals — a contained first run before you scale.</p>
          </div>
          <div style={{ padding: '36px 0 0 24px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '18px' }}>05 · Ongoing</div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '23px', fontWeight: 500, marginBottom: '10px' }}>Growth Advisory</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E' }}>Sell-through review, next-collection planning, category expansion.</p>
          </div>
        </div>
      </section>

      {/* EXECUTION NETWORK */}
      <section style={{ background: '#F3EEE4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 40px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600, marginBottom: '18px' }}>Execution Network</div>
          <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.08, letterSpacing: '-0.5px', maxWidth: '760px', marginBottom: '22px' }}>We advise. Vetted partners execute.</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#6B655E', maxWidth: '680px', marginBottom: '60px' }}>
            We&apos;re consultants, not an agency. Through Lal10&apos;s curated network of affiliate partners, we connect you with verified specialists for everything beyond strategy. Partners bill you directly.
          </p>
          
          <div className="network-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#E4DED3', border: '1px solid #E4DED3' }}>
            {[
              { num: '01', title: 'Photography & Shoots', desc: 'E-commerce, model, flat-lay and lifestyle imagery, shot to marketplace spec.' },
              { num: '02', title: 'Marketplace Onboarding', desc: 'Myntra and Amazon account setup, catalog upload, listing and returns handling.' },
              { num: '03', title: 'Identity & Packaging', desc: 'Logo, brand guidelines, packaging, label and tag artwork.' },
              { num: '04', title: 'Performance Marketing', desc: 'Marketplace ads, social, influencer outreach and D2C website setup.' },
              { num: '05', title: 'Legal & Compliance', desc: 'Trademark registration, BIS compliance and brand protection.' },
              { num: '06', title: 'Logistics & Warehousing', desc: '3PL setup, warehousing and last-mile delivery optimisation.' },
            ].map((p, idx) => (
              <div 
                key={idx} 
                onClick={() => openPartnerModal(p.title)}
                style={{ background: '#FBFAF7', padding: '38px 32px', cursor: 'pointer' }}
                className="hover:bg-white transition-colors"
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: '#C9A16B', marginBottom: '16px' }}>{p.num}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ background: '#171615', color: '#F5F1EA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 40px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C9A16B', fontWeight: 600, marginBottom: '18px' }}>Who&apos;s Behind It</div>
          <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.08, letterSpacing: '-0.5px', maxWidth: '760px', marginBottom: '22px', color: '#F5F1EA' }}>
            Operators who&apos;ve built the machine.
          </h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(245,241,234,0.7)', maxWidth: '700px', marginBottom: '60px' }}>
            A founding team spanning marketplace strategy, production discipline, and the technology that ties 50 factories into one system.
          </p>
          
          <div className="team-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            <div style={{ border: '1px solid rgba(245,241,234,0.14)', padding: '38px 32px' }}>
              <div style={{ width: '60px', height: '60px', border: '1px solid #C9A16B', color: '#C9A16B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', marginBottom: '22px' }}>MG</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#F5F1EA', marginBottom: '4px' }}>Maneet Gohil</h3>
              <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#C9A16B', fontWeight: 600, marginBottom: '18px' }}>Co-founder, Lal10 &amp; TheFashionOS</div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'rgba(245,241,234,0.75)' }}>
                Co-founder of Lal10 and TheFashionOS, and a TEDx speaker. Over the past decade he&apos;s turned raw ideas into operating companies, with deep expertise in exports and go-to-market. At Lal10 he&apos;s built a full-stack fashion ecosystem connecting global D2C and B2B brands with certified MSME factories. Forbes 30 Under 30 and Entrepreneur 35 Under 35.
              </p>
            </div>
            <div style={{ border: '1px solid rgba(245,241,234,0.14)', padding: '38px 32px' }}>
              <div style={{ width: '60px', height: '60px', border: '1px solid #C9A16B', color: '#C9A16B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', marginBottom: '22px' }}>SG</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#F5F1EA', marginBottom: '4px' }}>Sanchit Govil</h3>
              <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#C9A16B', fontWeight: 600, marginBottom: '18px' }}>Co-founder, Lal10</div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'rgba(245,241,234,0.75)' }}>
                Co-founder of Lal10, where he&apos;s built partnerships with Indian and global brands. A Forbes India 30 Under 30 honoree, he believes business is built on the relationships and financial systems most founders overlook — a philosophy that shapes how Lal10 operates behind the scenes.
              </p>
            </div>
            <div style={{ border: '1px solid rgba(245,241,234,0.14)', padding: '38px 32px' }}>
              <div style={{ width: '60px', height: '60px', border: '1px solid #C9A16B', color: '#C9A16B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', marginBottom: '22px' }}>AJ</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#F5F1EA', marginBottom: '4px' }}>Albin Jose</h3>
              <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#C9A16B', fontWeight: 600, marginBottom: '18px' }}>Co-founder &amp; CPO / AI</div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'rgba(245,241,234,0.75)' }}>
                Owns product and the technology layer — the tooling that keeps 50 factories, their capacity and their quality data in one connected system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ maxWidth: '1200px', margin: '0 auto', padding: '130px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 600, marginBottom: '22px' }}>Next Step</div>
        <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '60px', lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: '24px' }}>Let&apos;s start with a conversation.</h2>
        <p style={{ fontSize: '19px', lineHeight: 1.6, color: '#6B655E', maxWidth: '600px', margin: '0 auto 44px' }}>
          A 30-minute discovery call to understand your vision, budget and category — and to figure out if this is the right fit for both of us. No commitment, no pitch.
        </p>
        <button 
          onClick={(e) => openBooking('General', e)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#171615', color: '#FBFAF7', padding: '18px 38px', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          Book a Discovery Call <span style={{ fontSize: '16px' }}>→</span>
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#171615', color: 'rgba(245,241,234,0.7)', padding: '70px 0 36px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', paddingBottom: '44px', borderBottom: '1px solid rgba(245,241,234,0.12)' }}>
            <div style={{ maxWidth: '320px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '6px', color: '#F5F1EA', marginBottom: '10px' }}>LAL10</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', color: 'rgba(245,241,234,0.6)' }}>From moodboard to marketplace.</div>
            </div>
            <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Services</h5>
                <a href="#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Product</a>
                <a href="#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Trend Intelligence</a>
                <a href="#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Sourcing</a>
                <a href="#engagement" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>Market Intelligence</a>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Company</h5>
                <a href="#team" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Team</a>
                <a href="#process" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>How It Works</a>
                <a href="#engagement" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>Engagement</a>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Get in Touch</h5>
                <button onClick={(e) => openBooking('General', e)} style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>Book a Call</button>
                <a href="mailto:hello@lal10.com" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>hello@lal10.com</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '28px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'rgba(245,241,234,0.5)' }}>
            <div>© {new Date().getFullYear()} Lal10 FashionOS. Part of Lal10.</div>
            <div>The playbook behind launching and scaling brands.</div>
          </div>
        </div>
      </footer>

      {/* DISCOVERY BOOKING MODAL */}
      <DiscoveryModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTrack={bookingTrack}
      />

      {/* PARTNER REFERRAL MODAL */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        serviceName={selectedPartnerService}
      />
    </div>
  );
}
