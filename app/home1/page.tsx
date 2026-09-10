'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Linkedin, User, ShoppingBag, Globe, MessageSquare } from 'lucide-react';
import { DiscoveryModal } from '@/components/DiscoveryModal';
import { PartnerModal } from '@/components/PartnerModal';

const BRAND_LOGOS = [
  {
    name: 'Pepe Jeans London',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pepe-Jeans-Logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    height: 22,
  },
  {
    name: 'Myntra',
    logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/65c5da9f878952603e370d03_Myntra-Logo_1.svg/1280px-65c5da9f878952603e370d03_Myntra-Logo_1.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
    height: 24,
  },
  {
    name: 'Flipkart',
    logo: 'https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png',
    height: 24,
  },
  {
    name: 'Landmark Styli',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Landmark_Group_Logo.svg/1280px-Landmark_Group_Logo.svg.png',
    height: 20,
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    height: 20,
  },
  {
    name: 'Nordstrom',
    logo: 'https://1000logos.net/wp-content/uploads/2022/08/Nordstrom-logo.png',
    height: 20,
  },
  {
    name: 'Wildfang',
    logo: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/acd0a1e6-1c5e-4584-a3d3-dcadb2a3d9c0.png',
    height: 20,
  },
  {
    name: 'Gant',
    logo: 'https://download.logo.wine/logo/Gant_(retailer)/Gant_(retailer)-Logo.wine.png',
    height: 24,
  },
  {
    name: 'Bloomingwear',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUVvrpt0g2OqzElAeBzyDAIN5u7YuwtzkKtI7ag7XC48p7GlPKNMxZEiXw&s=10',
    height: 22,
  },
  {
    name: 'Iconic',
    logo: 'https://www.iconicindia.com/cdn/shop/files/iconic-logo.png?v=1698047257&width=200',
    height: 22,
  },
  {
    name: 'True Religion',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/True_Religion_logo.svg/1280px-True_Religion_logo.svg.png',
    height: 26,
  },
  {
    name: 'The Souled Store',
    logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/1d635d200302101.Y3JvcCwxMjQyLDk3MSwwLDEzNQ.jpg',
    height: 24,
  },
  {
    name: 'Wrogn',
    logo: 'https://wrogn.com/cdn/shop/files/logo_icon_1_bd4a99ba-1c20-43de-81ff-1f5fb0685b8e.svg?v=1736489168&width=100',
    height: 24,
  },
  {
    name: 'Kidbea',
    logo: 'https://cdn.shopify.com/s/files/1/0606/1785/1119/files/kidbea_logo-05_1.webp?v=1773731230&width=270',
    height: 24,
  },
];

export default function Home1Page() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTrack, setBookingTrack] = useState<string>('Launch Sprint');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [selectedPartnerService, setSelectedPartnerService] = useState<string>('Photography & Shoots');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Assortment Math Interactive State
  const [budget, setBudget] = useState<number>(12); // ₹ Lakhs (1 - 50)
  const [landedCost, setLandedCost] = useState<number>(600); // ₹ (100 - 2000)
  const [depth, setDepth] = useState<number>(110); // units per option (10 - 500)

  const optionsCount = Math.max(1, Math.floor((budget * 100000) / (landedCost * depth)));
  const totalUnits = optionsCount * depth;
  const indicativeMrp = Math.round(landedCost * 3.4);

  const sizeS = Math.round(depth * 0.15);
  const sizeM = Math.round(depth * 0.30);
  const sizeL = Math.round(depth * 0.35);
  const sizeXL = Math.max(0, depth - (sizeS + sizeM + sizeL));

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
    <div style={{ maxWidth: '100%', overflowX: 'clip', fontFamily: "'Manrope', sans-serif", color: '#171615', background: '#FBFAF7', position: 'relative' }}>
      
      {/* NAV (Fixed on scroll) */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1000, background: 'rgba(251,250,247,0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid #E4DED3', transition: 'all 0.3s ease' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <img 
              src="https://www.lal10.com/logo.png" 
              alt="Lal10 Logo" 
              className="desktop-logo-img"
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
            <div className="desktop-logo-divider" style={{ width: '1px', height: '32px', background: '#E4DED3' }} />
            <img 
              src="https://thefashionos.com/assets/logo-Dl4_z_fN.png" 
              alt="TheFashionOS Logo" 
              className="desktop-second-logo-img"
              style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
            />
            <div className="mobile-text-logo" style={{ display: 'none', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, letterSpacing: '2px', color: '#171615', lineHeight: 1 }}>LAL10</div>
              <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#8A837A', fontWeight: 600, marginTop: '2px' }}>FASHIONOS</div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            <a href="#offerings" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>What We Do</a>
            <a href="#process" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Process</a>
            <a href="#engagement" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Engagement</a>
            <a href="#team" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>About</a>
            <button 
              onClick={(e) => openBooking('General', e)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#5B1F28', color: '#FBFAF7', padding: '12px 22px', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
            >
              Book a Discovery Call <span style={{ fontSize: '14px' }}>↗</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button & Header CTA */}
          <div className="mobile-menu-btn" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={(e) => openBooking('General', e)}
              style={{ background: '#5B1F28', color: '#FBFAF7', padding: '9px 14px', fontSize: '10.5px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              BOOK A CALL
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'transparent', border: 'none', padding: '6px', color: '#171615', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
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
            <a href="#team" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', letterSpacing: '1.5px', fontWeight: 600, color: '#171615', textTransform: 'uppercase', paddingBottom: '8px', borderBottom: '1px solid #E4DED3' }}>About</a>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '12px', letterSpacing: '1.5px', color: '#8A837A', textTransform: 'uppercase' }}>Admin Dashboard →</Link>
            <button 
              onClick={(e) => openBooking('General', e)}
              style={{ background: '#5B1F28', color: '#FBFAF7', padding: '14px 20px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              Book a Discovery Call <span>↗</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION — FULL WIDTH BACKGROUND */}
      <header className="hero-container-mobile" style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        overflow: 'hidden',
        paddingTop: '75px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#171615',
        borderBottom: '1px solid #EAE4D9'
      }}>

        {/* Full-bleed background image */}
        <div className="hero-fullwidth-bg" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/hero-fullwidth.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }} />

        {/* Left-side gradient overlay so text is legible on the light bg */}
        <div className="hero-gradient-overlay" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.92) 35%, rgba(250,248,245,0.60) 60%, rgba(250,248,245,0) 80%)',
          zIndex: 1
        }} />

        {/* Fashion tag — bottom right over image */}
        <div
          className="hero-tag-responsive"
          style={{
            position: 'absolute',
            bottom: '36px',
            right: '48px',
            fontSize: '11px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(23,22,21,0.55)',
            fontWeight: 600,
            zIndex: 2
          }}
        >
          STRATEGY · BRAND · GROWTH
        </div>

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '70px 40px 60px', width: '100%' }}>
          <div style={{ maxWidth: '640px' }}>

            {/* Eyebrow */}
            <div className="hero-eyebrow-container">
              <span className="hero-eyebrow-text">
                FASHION BRAND ADVISORY &amp;<br className="mobile-only-break" /> OPERATING SYSTEM
              </span>
              <div className="hero-eyebrow-line"></div>
            </div>

            {/* Headline */}
            <h1 className="hero-headline-responsive" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: '70px',
              lineHeight: 1.05,
              letterSpacing: '-0.5px',
              marginBottom: '26px',
              color: '#171615'
            }}>
              Your fashion brand,<br className="mobile-only-break" /> <em style={{ fontStyle: 'italic', color: '#171615' }}>built on supply-chain intelligence.</em>
            </h1>

            {/* Subtitle */}
            <p className="hero-body-responsive" style={{
              fontSize: '17px',
              lineHeight: 1.65,
              color: '#57524B',
              maxWidth: '520px',
              marginBottom: '38px'
            }}>
              From <strong>market intelligence</strong> to <strong>brand launch</strong> and scale, we partner with founders to build iconic fashion brands that win in the real world.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group">
              <button
                className="hero-cta-btn-mobile"
                onClick={(e) => openBooking('Launch Sprint', e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#5B1F28',
                  color: '#FBFAF7',
                  padding: '16px 28px',
                  fontSize: '11.5px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(91,31,40,0.25)'
                }}
              >
                BOOK A DISCOVERY CALL <span style={{ fontSize: '14px' }}>↗</span>
              </button>

              <a
                href="#offerings"
                className="hero-sec-link-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#171615',
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderBottom: '1px solid #171615',
                  paddingBottom: '4px'
                }}
              >
                SEE HOW WE WORK <span>→</span>
              </a>
            </div>

            {/* Desktop Horizontal Stats Row (Hidden on mobile) */}
            <div className="desktop-stats-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', paddingTop: '28px', borderTop: '1px solid #EAE4D9' }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>10+</div>
                <div style={{ fontSize: '11.5px', color: '#6B655E', fontWeight: 500, lineHeight: 1.4 }}>Years of Experience</div>
              </div>
              <div style={{ width: '1px', background: '#EAE4D9' }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>50+</div>
                <div style={{ fontSize: '11.5px', color: '#6B655E', fontWeight: 500, lineHeight: 1.4 }}>Brands Launched &amp; Scaled</div>
              </div>
              <div style={{ width: '1px', background: '#EAE4D9' }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>25+</div>
                <div style={{ fontSize: '11.5px', color: '#6B655E', fontWeight: 500, lineHeight: 1.4 }}>Markets Worldwide</div>
              </div>
            </div>

            {/* Mobile 3-item Floating Stats Card (Hidden on desktop) */}
            <div className="mobile-stats-card stats-card-container">
              <div className="stats-grid-responsive">
                <div className="stats-item stats-item-0">
                  <User size={24} style={{ color: '#57524B', strokeWidth: 1.4, margin: '0 auto 8px', display: 'block' }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>10+</div>
                  <div style={{ fontSize: '11px', color: '#6B655E', fontWeight: 500, lineHeight: 1.35 }}>Years of Experience</div>
                </div>

                <div className="stats-item stats-item-1">
                  <ShoppingBag size={24} style={{ color: '#57524B', strokeWidth: 1.4, margin: '0 auto 8px', display: 'block' }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>50+</div>
                  <div style={{ fontSize: '11px', color: '#6B655E', fontWeight: 500, lineHeight: 1.35 }}>Brands Launched &amp; Scaled</div>
                </div>

                <div className="stats-item stats-item-2">
                  <Globe size={24} style={{ color: '#57524B', strokeWidth: 1.4, margin: '0 auto 8px', display: 'block' }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>25+</div>
                  <div style={{ fontSize: '11px', color: '#6B655E', fontWeight: 500, lineHeight: 1.35 }}>Markets Worldwide</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* TRUSTED BY AMBITIOUS BRANDS (LIGHT STRIP WITH CONTINUOUS LOGO MARQUEE) */}
      <section style={{ background: '#FAF8F5', borderBottom: '1px solid #EAE4D9', padding: '32px 0 36px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ textAlign: 'center', fontSize: '10.5px', letterSpacing: '3px', textTransform: 'uppercase', color: '#7A7369', fontWeight: 600, marginBottom: '22px' }}>
          DESIGNED, PRODUCED &amp; SHIPPED FOR
        </div>
        
        {/* Infinite Scrolling Marquee Track */}
        <div className="brandscroll-anim" style={{ display: 'flex', width: 'max-content', alignItems: 'center' }}>
          {/* First loop of 12 logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px', paddingRight: '64px' }}>
            {BRAND_LOGOS.map((brand, idx) => (
              <div key={`logo-1-${idx}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '110px' }}>
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  style={{ 
                    height: `${brand.height}px`, 
                    maxWidth: '130px', 
                    objectFit: 'contain', 
                    filter: 'grayscale(100%) contrast(140%) brightness(0.2)', 
                    opacity: 0.85,
                    transition: 'opacity 0.2s ease, transform 0.2s ease'
                  }}
                  className="hover:opacity-100 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Duplicate loop for seamless infinite animation */}
          <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: '64px', paddingRight: '64px' }}>
            {BRAND_LOGOS.map((brand, idx) => (
              <div key={`logo-2-${idx}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '110px' }}>
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  style={{ 
                    height: `${brand.height}px`, 
                    maxWidth: '130px', 
                    objectFit: 'contain', 
                    filter: 'grayscale(100%) contrast(140%) brightness(0.2)', 
                    opacity: 0.85,
                    transition: 'opacity 0.2s ease, transform 0.2s ease'
                  }}
                  className="hover:opacity-100 hover:scale-105"
                />
              </div>
            ))}
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

      {/* ASSORTMENT MATH — LIVE CALCULATOR SECTION */}
      <section style={{ background: '#FAF8F5', borderTop: '1px solid #EAE4D9', borderBottom: '1px solid #EAE4D9', padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          
          {/* Section Eyebrow */}
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 700, marginBottom: '18px' }}>
            — ASSORTMENT MATH — LIVE
          </div>

          {/* Section Header Row */}
          <div className="assortment-header-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '48px', alignItems: 'start', paddingBottom: '36px', borderBottom: '1px solid #EAE4D9', marginBottom: '50px' }}>
            <div>
              <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.05, letterSpacing: '-0.5px', color: '#171615', margin: '0 0 16px' }}>
                Move the sliders.<br />
                <em style={{ fontStyle: 'italic', color: '#171615' }}>Watch your collection appear.</em>
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#57524B', maxWidth: '580px', margin: 0 }}>
                This is the first model we build in every engagement: a budget, a landed cost, a depth per option — and the collection that math allows. Real plans add category mix, size curves and sell-through assumptions.
              </p>
            </div>

            <div className="assortment-header-right" style={{ borderLeft: '1px solid #EAE4D9', paddingLeft: '36px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '8px' }}>
                FROM IDEAS TO ICONIC BRANDS
              </div>
              <div style={{ width: '24px', height: '1px', background: '#D8CDBF', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6B655E', margin: 0 }}>
                Smarter assortment planning for a stronger tomorrow.
              </p>
            </div>
          </div>

          {/* 2-Column Calculator Body */}
          <div className="assortment-calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            
            {/* Left Controls Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              
              {/* Slider 1: Budget */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#171615', fontWeight: 700 }}>
                    COLLECTION BUDGET
                  </span>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: '#171615', letterSpacing: '-0.5px' }}>
                    ₹{budget}L
                  </span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="assortment-slider"
                  style={{
                    background: `linear-gradient(to right, #5B1F28 0%, #5B1F28 ${((budget - 1) / (50 - 1)) * 100}%, #EAE4D9 ${((budget - 1) / (50 - 1)) * 100}%, #EAE4D9 100%)`
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8A837A', marginTop: '8px', fontWeight: 500 }}>
                  <span>₹1L</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* Slider 2: Landed Cost */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#171615', fontWeight: 700 }}>
                    LANDED COST PER UNIT
                  </span>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: '#171615', letterSpacing: '-0.5px' }}>
                    ₹{landedCost.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={landedCost}
                  onChange={(e) => setLandedCost(Number(e.target.value))}
                  className="assortment-slider"
                  style={{
                    background: `linear-gradient(to right, #5B1F28 0%, #5B1F28 ${((landedCost - 100) / (2000 - 100)) * 100}%, #EAE4D9 ${((landedCost - 100) / (2000 - 100)) * 100}%, #EAE4D9 100%)`
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8A837A', marginTop: '8px', fontWeight: 500 }}>
                  <span>₹100</span>
                  <span>₹2,000</span>
                </div>
              </div>

              {/* Slider 3: Depth per Option */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#171615', fontWeight: 700 }}>
                    DEPTH PER OPTION
                  </span>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: '#171615', letterSpacing: '-0.5px' }}>
                    {depth} units
                  </span>
                </div>
                <input 
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="assortment-slider"
                  style={{
                    background: `linear-gradient(to right, #5B1F28 0%, #5B1F28 ${((depth - 10) / (500 - 10)) * 100}%, #EAE4D9 ${((depth - 10) / (500 - 10)) * 100}%, #EAE4D9 100%)`
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8A837A', marginTop: '8px', fontWeight: 500 }}>
                  <span>10</span>
                  <span>500</span>
                </div>
              </div>

              {/* Read on it box */}
              <div 
                onClick={(e) => openBooking('Launch Sprint', e)}
                style={{ 
                  background: '#F3EEE4', 
                  border: '1px solid #E4DED3', 
                  padding: '24px 26px', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.2s ease'
                }}
                className="hover:border-[#5B1F28] transition-all"
              >
                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 700, marginBottom: '6px' }}>
                    READ ON IT
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#57524B', margin: 0 }}>
                    A balanced first buy: enough width to test the range, enough depth to survive a bestseller. This is the shape we aim for in a launch sprint.
                  </p>
                </div>
                <span style={{ fontSize: '18px', color: '#171615', fontWeight: 600 }}>→</span>
              </div>

            </div>

            {/* Right Results Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* 3 Metric Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', borderBottom: '1px solid #EAE4D9', paddingBottom: '28px' }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '46px', fontWeight: 500, color: '#5B1F28', lineHeight: 1, marginBottom: '6px' }}>
                    {optionsCount}
                  </div>
                  <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600 }}>
                    OPTIONS
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid #EAE4D9', paddingLeft: '18px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '46px', fontWeight: 400, color: '#171615', lineHeight: 1, marginBottom: '6px' }}>
                    {totalUnits.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600 }}>
                    UNITS
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid #EAE4D9', paddingLeft: '18px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '46px', fontWeight: 400, color: '#5B1F28', lineHeight: 1, marginBottom: '6px' }}>
                    ₹{indicativeMrp.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600 }}>
                    INDICATIVE MRP
                  </div>
                </div>
              </div>

              {/* The Buy: Visual Squares Matrix */}
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#57524B', fontWeight: 700, marginBottom: '14px' }}>
                  THE BUY, ONE SQUARE PER OPTION
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div 
                      key={i}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '2px',
                        background: i < optionsCount ? '#5B1F28' : '#EAE4D9',
                        transition: 'background-color 0.2s ease'
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '12px', color: '#8A837A', fontWeight: 500 }}>
                  {optionsCount} options at {depth} units each
                </div>
              </div>

              {/* Size Curve Distribution */}
              <div style={{ borderTop: '1px solid #EAE4D9', paddingTop: '24px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#57524B', fontWeight: 700, marginBottom: '16px' }}>
                  SIZE CURVE, UNITS PER OPTION
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'S', count: sizeS, pct: 15 },
                    { label: 'M', count: sizeM, pct: 30 },
                    { label: 'L', count: sizeL, pct: 35 },
                    { label: 'XL', count: sizeXL, pct: 20 },
                  ].map((sizeItem) => (
                    <div key={sizeItem.label} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 32px', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#171615' }}>{sizeItem.label}</span>
                      <div style={{ width: '100%', height: '10px', background: '#EAE4D9', borderRadius: '1px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            width: `${sizeItem.pct * 2.5}%`, 
                            height: '100%', 
                            background: '#5B1F28', 
                            borderRadius: '1px',
                            transition: 'width 0.25s ease'
                          }} 
                        />
                      </div>
                      <span style={{ fontSize: '12px', color: '#57524B', fontWeight: 600, textAlign: 'right' }}>{sizeItem.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Branding Tagline */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAE4D9', paddingTop: '24px', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600 }}>
                  DATA-DRIVEN ASSORTMENTS.<br />REAL BUSINESS OUTCOMES.
                </div>
                <div style={{ width: '1px', height: '28px', background: '#EAE4D9' }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 700, letterSpacing: '4px', color: '#171615', lineHeight: 1 }}>
                    L A L 1 0
                  </div>
                  <div style={{ fontSize: '8.5px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginTop: '3px' }}>
                    BUILD · SCALE · REPEAT
                  </div>
                </div>
              </div>

            </div>

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
      <section id="team" style={{ background: '#FAF7F2', color: '#171615', padding: '110px 0', borderTop: '1px solid #EAE4D9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          
          {/* Section Eyebrow with trailing line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 700 }}>
              WHO&apos;S BEHIND IT
            </span>
            <div style={{ width: '45px', height: '1px', background: '#D8C4B0' }}></div>
          </div>

          {/* Section Header: Title + Subtitle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '60px' }}>
            <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '56px', lineHeight: 1.05, letterSpacing: '-0.5px', maxWidth: '580px', color: '#171615', margin: 0 }}>
              Operators who&apos;ve built the <em style={{ fontStyle: 'italic', color: '#5B1F28' }}>machine.</em>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#57524B', maxWidth: '480px', margin: 0 }}>
              A founding team spanning marketplace strategy, production discipline, and the technology that ties 50 factories into one system.
            </p>
          </div>
          
          {/* Team Cards Grid */}
          <div className="team-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              {
                name: 'Maneet Gohil',
                role: 'CO-FOUNDER, LAL10 & THEFASHIONOS',
                bio: "Co-founder of Lal10 and TheFashionOS, and a TEDx speaker. Over the past decade he's turned raw ideas into operating companies, with deep expertise in exports and go-to-market. At Lal10 he's built a full-stack fashion ecosystem connecting global D2C and B2B brands with certified MSME factories. Forbes 30 Under 30 and Entrepreneur 35 Under 35.",
                linkedin: 'https://www.linkedin.com/in/maneetgohil/',
                image: '/images/team/Maneet.png'
              },
              {
                name: 'Sanchit Govil',
                role: 'CO-FOUNDER, LAL10',
                bio: "Co-founder of Lal10, where he's built partnerships with Indian and global brands. A Forbes India 30 Under 30 honoree, he believes business is built on the relationships and financial systems most founders overlook — a philosophy that shapes how Lal10 operates behind the scenes.",
                linkedin: 'https://www.linkedin.com/in/sanchitgovil/',
                image: '/images/team/Sanchit.png'
              },
              {
                name: 'Albin Jose',
                role: 'CO-FOUNDER & CPO / AI',
                bio: "Owns product and the technology layer — the tooling that keeps 50 factories, their capacity and their quality data in one connected system.",
                linkedin: 'https://www.linkedin.com/in/albin-anto-jose-26670532/',
                image: '/images/team/Albin.png'
              }
            ].map((member, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '14px', 
                  border: '1px solid #EAE4D9', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                {/* Member Image Container */}
                <div style={{ position: 'relative', width: '100%', height: '320px', background: '#EAE4D9', overflow: 'hidden' }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '28px 26px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 500, color: '#171615', margin: '0 0 6px' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 700, marginBottom: '16px' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#57524B', margin: 0, flex: 1 }}>
                    {member.bio}
                  </p>
                </div>

                {/* Card Footer with Centered LinkedIn Only */}
                <div style={{ borderTop: '1px solid #EAE4D9', padding: '16px 26px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`${member.name} LinkedIn`}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '6px', 
                      border: '1px solid #D8D2C6', 
                      color: '#57524B',
                      background: '#FAFAF8',
                      textDecoration: 'none'
                    }}
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            ))}
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

      {/* INSTITUTIONAL CAPITAL / INVESTORS SECTION */}
      <section style={{ background: '#FAF8F5', borderTop: '1px solid #EAE4D9', borderBottom: '1px solid #EAE4D9', padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          
          {/* Header Row */}
          <div className="investors-header-responsive" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '52px', lineHeight: 1.08, letterSpacing: '-0.5px', color: '#171615', margin: '0 0 18px' }}>
                Institutional capital<br />behind the platform.
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#57524B', maxWidth: '540px', margin: 0 }}>
                Lal10 has raised across seven rounds from a mix of funds and operators — the pre-Series A was led by Yuj Ventures (Xander Group) and Beyond Capital Ventures.
              </p>
            </div>

            <div className="investors-header-right" style={{ borderLeft: '1px solid #EAE4D9', paddingLeft: '40px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 700, marginBottom: '16px' }}>
                BACKED BY BELIEVERS
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#6B655E', margin: 0 }}>
                A community of institutional investors and industry operators who believe in a more efficient, transparent and modern fashion ecosystem.
              </p>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="investors-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px' }}>
            
            {/* 01 Institutional Investors */}
            <div>
              <div style={{ borderTop: '1px solid #171615', paddingTop: '20px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '6px' }}>01</div>
                <h3 style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, color: '#171615', margin: '0 0 6px' }}>
                  INSTITUTIONAL INVESTORS
                </h3>
                <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 500 }}>
                  LONG-TERM PARTNERS BACKING A LARGER VISION.
                </div>
              </div>

              <div>
                {[
                  { id: '01', name: 'Yuj Ventures (Xander Group)' },
                  { id: '02', name: 'Beyond Capital Ventures' },
                  { id: '03', name: 'Spiral Ventures' },
                  { id: '04', name: 'Singularity Ventures' },
                  { id: '05', name: 'Asymmetry Ventures' },
                  { id: '06', name: 'BlackSoil' },
                  { id: '07', name: 'Panthera Peak' },
                  { id: '08', name: 'Pegasus FinInvest' },
                  { id: '09', name: 'Suprajit Group' },
                ].map((inv, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #EAE4D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span style={{ fontSize: '12px', color: '#8A837A', fontWeight: 500, width: '20px' }}>{inv.id}</span>
                      <span style={{ fontSize: '15px', color: '#171615', fontWeight: 500 }}>{inv.name}</span>
                    </div>
                    <span style={{ fontSize: '15px', color: '#8A837A' }}>→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 02 Operator Angels */}
            <div>
              <div style={{ borderTop: '1px solid #171615', paddingTop: '20px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600, marginBottom: '6px' }}>02</div>
                <h3 style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, color: '#171615', margin: '0 0 6px' }}>
                  OPERATOR ANGELS
                </h3>
                <div style={{ fontSize: '10.5px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 500 }}>
                  BUILDERS WHO HAVE BEEN THERE.
                </div>
              </div>

              <div>
                {[
                  { name: 'Nitish Mittersain', company: 'NAZARA TECHNOLOGIES' },
                  { name: 'Bikky Khosla', company: 'TRADEINDIA' },
                  { name: 'Ashok Gudibandla', company: 'NOTION' },
                  { name: 'Kishore Ganji', company: 'ASTIR VENTURES' },
                  { name: 'Partners at McKinsey', company: '' },
                  { name: 'Insaan Group', company: 'REASONED VENTURES' },
                ].map((ang, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #EAE4D9' }}>
                    <span style={{ fontSize: '15px', color: '#171615', fontWeight: 500 }}>{ang.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      {ang.company && (
                        <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 600 }}>{ang.company}</span>
                      )}
                      <span style={{ fontSize: '15px', color: '#8A837A' }}>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRESS & MEDIA MENTIONS SECTION */}
      <section style={{ background: '#FAF7F2', borderTop: '1px solid #EAE4D9', padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          
          {/* Eyebrow & Title */}
          <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#5B1F28', fontWeight: 700, marginBottom: '14px' }}>
              IN THE NEWS
            </div>
            <h2 className="section-headline-responsive" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '50px', lineHeight: 1.1, letterSpacing: '-0.5px', color: '#171615', margin: 0 }}>
              Everybody has got something to say about us
            </h2>
          </div>

          {/* 4 Press Cards */}
          <div className="press-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              {
                source: 'THE ECONOMIC TIMES',
                title: 'MSME focussed startup Lal10 raises $5.5M in funding',
                url: 'https://economictimes.indiatimes.com/tech/funding/exclusive-msme-focussed-startup-lal10-raises-5-5-million-in-funding-led-by-yuj-ventures-others/articleshow/92959055.cms',
                image: 'https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/three-standing-founders.webp'
              },
              {
                source: 'INC42',
                title: 'Lal10 Bags $5.5 Mn To Help Rural SMBs Sell Globally',
                url: 'https://inc42.com/buzz/b2b-marketplace-lal10-bags-5-5-mn-to-help-rural-smbs-sell-globally/?itm_source=inc42-popular-read&itm_medium=website&itm_campaign=popular-read-widget',
                image: 'https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/Aunty.webp'
              },
              {
                source: 'FINANCIAL EXPRESS',
                title: 'Lal10 is building the Alibaba of Indian crafts industry',
                url: 'https://www.financialexpress.com/industry/sme/lal10-this-startup-is-building-the-alibaba-of-indian-crafts-industry/2401283/',
                image: 'https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/three-sitting-founders.webp'
              },
              {
                source: 'THE HINDU BUSINESSLINE',
                title: 'Cross-border trading platform expands operations to Japan',
                url: 'https://www.thehindubusinessline.com/info-tech/cross-border-trading-platform-lal10-expands-operations-to-japan/article65783052.ece',
                image: 'https://d2fgyp2oqmihhv.cloudfront.net/images/NewsSectionImages/Desktop/two-founders.webp'
              }
            ].map((article, idx) => (
              <a
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #EAE4D9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s ease'
                }}
                className="hover:translate-y-[-4px] hover:shadow-lg transition-all group"
              >
                <div>
                  <div style={{ position: 'relative', width: '100%', height: '175px', background: '#EAE4D9', overflow: 'hidden' }}>
                    <img 
                      src={article.image} 
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease' }}
                    />
                  </div>
                  
                  <div style={{ padding: '22px 22px 10px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 700, marginBottom: '10px' }}>
                      {article.source}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: '#171615', lineHeight: 1.35, margin: '0 0 14px' }}>
                      {article.title}
                    </h3>
                  </div>
                </div>

                <div style={{ padding: '0 22px 20px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, color: '#5B1F28', borderTop: '1px solid #F0EBE4', paddingTop: '14px', width: '100%' }}>
                    Read more <span style={{ fontSize: '14px' }}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
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
      {/* Floating Action Button */}
      <button
        className="floating-chat-btn-mobile"
        onClick={(e) => openBooking('Floating Call', e)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#3D1219',
          color: '#FAF8F5',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999
        }}
        aria-label="Book a call"
      >
        <MessageSquare size={22} color="#FAF8F5" />
      </button>
    </div>
  );
}
