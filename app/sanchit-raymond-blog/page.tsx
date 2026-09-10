'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Linkedin, 
  Share2, 
  Layers, 
  ShieldCheck, 
  Compass, 
  Clock, 
  ArrowRight,
  PackageCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import { DiscoveryModal } from '@/components/DiscoveryModal';

export default function SanchitRaymondBlogPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openBooking = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsBookingOpen(true);
    setMobileMenuOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'A 100-year-old Indian brand, ₹7,000+ crore in revenue — Sanchit Govil',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'clip', fontFamily: "'Manrope', sans-serif", color: '#171615', background: '#FBFAF7', minHeight: '100vh', position: 'relative' }}>
      
      {/* ─────────────────────────────────────────────────────────────
          NAVBAR
      ───────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 1000, background: 'rgba(251,250,247,0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid #E4DED3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          
          {/* Brand Logo */}
          <Link href="/home1" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <img 
              src="https://www.lal10.com/logo.png" 
              alt="Lal10 Logo" 
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ width: '1px', height: '32px', background: '#E4DED3' }} className="hidden sm:block" />
            <img 
              src="https://thefashionos.com/assets/logo-Dl4_z_fN.png" 
              alt="TheFashionOS Logo" 
              style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
              className="hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex" style={{ gap: '36px', alignItems: 'center' }}>
            <Link href="/home1#offerings" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Brands</Link>
            <Link href="/home1#offerings" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Services</Link>
            <Link href="/home1#process" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Case Studies</Link>
            <span style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 700, color: '#171615', textTransform: 'uppercase', borderBottom: '2px solid #5B1F28', paddingBottom: '4px' }}>Insights</span>
            <Link href="/home1#team" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>About</Link>
          </div>

          {/* Nav CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={openBooking}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#171615', color: '#FBFAF7', padding: '12px 22px', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
              className="hover:bg-[#5B1F28] transition-colors"
            >
              Book a Call <span style={{ fontSize: '14px' }}>→</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              style={{ background: 'transparent', border: 'none', padding: '6px', color: '#171615', cursor: 'pointer' }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div style={{ background: '#FBFAF7', borderBottom: '1px solid #E4DED3', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link href="/home1#offerings" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Brands</Link>
            <Link href="/home1#offerings" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Services</Link>
            <Link href="/home1#process" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Case Studies</Link>
            <Link href="/sanchit-raymond-blog" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 700, color: '#5B1F28', textTransform: 'uppercase' }}>Insights</Link>
            <Link href="/home1#team" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>About</Link>
          </div>
        )}
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          ARTICLE CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 100px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8A837A', marginBottom: '28px', flexWrap: 'wrap' }}>
          <Link href="/home1" style={{ color: '#8A837A' }}>Home</Link>
          <span>›</span>
          <Link href="/home1#engagement" style={{ color: '#8A837A' }}>Insights</Link>
          <span>›</span>
          <span style={{ color: '#171615', fontWeight: 500 }}>A 100-year-old Indian brand, ₹7,000+ crore in revenue...</span>
        </div>

        {/* Category & Metadata Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 700 }}>
            BRAND STORIES
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8A837A' }}>
            <span>May 28, 2025 · 6 min read</span>
            <button 
              onClick={handleShare}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#57524B', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              <Share2 size={14} />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Title + Quote Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '48px', alignItems: 'start', marginBottom: '40px' }} className="blog-title-grid">
          
          {/* Left Title & Author */}
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.5px', color: '#171615', marginBottom: '14px' }}>
              A 100-year-old Indian brand, ₹7,000+ crore in revenue.
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#57524B', lineHeight: 1.35, marginBottom: '28px' }}>
              And this is how it became one of India’s most powerful fashion supply chains.
            </p>

            {/* Author Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #EAE4D9' }}>
              <img 
                src="https://media.licdn.com/dms/image/v2/D5603AQFbZ-R-fvvEMQ/profile-displayphoto-shrink_800_800/B56ZeciCF4GQAc-/0/1750677857171?e=1790812800&v=beta&t=bX8yY9ud5Q0q7xqYUaz8tailRY5Wrv_7t2YnSlrgPJw"
                alt="Sanchit Govil"
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #D8CDBF' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#171615' }}>Sanchit Govil</span>
                  <a href="https://www.linkedin.com/in/sanchitgovil/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Linkedin size={14} color="#0A66C2" />
                  </a>
                </div>
                <div style={{ fontSize: '12px', color: '#8A837A', fontWeight: 600, marginTop: '2px' }}>
                  Co-Founder, LAL10
                </div>
                <div style={{ fontSize: '12px', color: '#6B655E', marginTop: '2px' }}>
                  Operator at the intersection of fashion, supply chains and brand building.
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Quote Box */}
          <div style={{ background: '#FAF7F2', borderLeft: '2px solid #5B1F28', padding: '32px 28px', marginTop: '10px' }} className="blog-quote-box">
            <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', lineHeight: 1.35, color: '#171615', margin: '0 0 16px' }}>
              “Great brands aren&apos;t just built by products, but by the infrastructure behind them.”
            </blockquote>
            <div style={{ width: '32px', height: '1px', background: '#D8CDBF', marginBottom: '14px' }}></div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 700, letterSpacing: '4px', color: '#57524B' }}>
              L A L 1 0
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERO IMAGE (LEFT-ALIGNED, NO BACKGROUND CONTAINER)
        ───────────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: '48px', maxWidth: '540px' }}>
          <img 
            src="https://media.licdn.com/dms/image/v2/D4D22AQExPZG67R1yoQ/feedshare-shrink_1280/B4DaBrBD_9KcAM-/0/1788501836306?e=1790812800&v=beta&t=_YqyJ27vhHXXOyN0ytS21gbHiCG-IkTVOf4WfS7R-Mw"
            alt="How Raymond Went From a Small Woollen Mill to a 7000 Crore Brand"
            style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #EAE4D9' }}
          />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN STORY GRID (STORY CONTENT + SIDEBAR)
        ───────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '60px', alignItems: 'start' }} className="blog-content-grid">
          
          {/* Left Column: Numbered Narrative Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            
            {/* Item 01 */}
            <div style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>01</span>
              <span style={{ color: '#D8CDBF' }}>—</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                  In 1925, Raymond Lifestyle Limited started as a small woollen mill near Thane Creek,
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                  making coarse blankets and low-priced wool fabric. Nothing about it suggested what it would become.
                </p>
              </div>
            </div>

            {/* Item 02 */}
            <div style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>02</span>
              <span style={{ color: '#D8CDBF' }}>—</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                  The Singhania family took it over in 1944.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                  They didn&apos;t outsource their way to scale. They went the other direction, building their own fibre processing, their own fabric mills, their own garmenting units, &amp; their own retail stores.
                </p>
              </div>
            </div>

            {/* Item 03 */}
            <div style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>03</span>
              <span style={{ color: '#D8CDBF' }}>—</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                  Today, Raymond is one of the largest vertically and horizontally integrated manufacturers
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                  of worsted suiting fabric in the world, and a market leader in the domestic worsted suiting industry in India.
                </p>
              </div>
            </div>

            {/* Item 04 */}
            <div style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>04</span>
              <span style={{ color: '#D8CDBF' }}>—</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                  Here&apos;s what&apos;s worth noticing:
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                  Raymond didn&apos;t fail because it owned everything. Raymond succeeded despite owning everything, because from 1944 to 1990, that was the only way to guarantee quality and speed.
                </p>
              </div>
            </div>

            {/* Item 05 */}
            <div style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>05</span>
              <span style={{ color: '#D8CDBF' }}>—</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                  But owning is capital-intensive and rigid.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                  It made sense when supply was scarce, and you needed control. It&apos;s a liability when supply is abundant, and you need flexibility.
                </p>
              </div>
            </div>

            {/* Item 06 */}
            <div style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>06</span>
              <span style={{ color: '#D8CDBF' }}>—</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                  The brands winning today aren&apos;t winning because they rejected Raymond&apos;s logic.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', marginBottom: '16px' }}>
                  They&apos;re winning because the conditions that made Raymond&apos;s logic necessary have changed. And they&apos;re building different infrastructure for a different world.
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                  Raymond built a moat by owning the chain. But there is another moat where fashion brands are building one by orchestrating a chain nobody owns.
                </p>
                <div style={{ width: '40px', height: '1.5px', background: '#5B1F28', marginTop: '24px' }} />
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar with Takeaways & CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'sticky', top: '100px' }}>
            
            {/* Key Takeaways Card */}
            <div style={{ background: '#FAF7F2', border: '1px solid #EAE4D9', borderRadius: '12px', padding: '32px 28px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#171615', fontWeight: 700, marginBottom: '24px' }}>
                KEY TAKEAWAYS
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FFFFFF', border: '1px solid #EAE4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Layers size={16} color="#5B1F28" />
                  </div>
                  <span style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#3A362F' }}>
                    Vertical integration can create unmatched quality and scale.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FFFFFF', border: '1px solid #EAE4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={16} color="#5B1F28" />
                  </div>
                  <span style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#3A362F' }}>
                    The right strategy depends on supply chain conditions.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FFFFFF', border: '1px solid #EAE4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Compass size={16} color="#5B1F28" />
                  </div>
                  <span style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#3A362F' }}>
                    Modern brands are winning through orchestration, not ownership.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FFFFFF', border: '1px solid #EAE4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={16} color="#5B1F28" />
                  </div>
                  <span style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#3A362F' }}>
                    Infrastructure is a strategic advantage, not just an operational necessity.
                  </span>
                </div>
              </div>
            </div>

            {/* Dark CTA Box */}
            <div style={{ background: '#171615', color: '#F5F1EA', borderRadius: '12px', padding: '36px 30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#F5F1EA', marginBottom: '8px' }}>
                  Building a fashion brand?<br />Let&apos;s talk.
                </h4>
                <p style={{ fontSize: '13.5px', color: 'rgba(245,241,234,0.7)', lineHeight: 1.6, marginBottom: '24px' }}>
                  From sourcing to scale — we help fashion brands build what&apos;s next.
                </p>
                <button 
                  onClick={openBooking}
                  style={{ width: '100%', background: '#FFFFFF', color: '#171615', padding: '14px 20px', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  className="hover:bg-[#F3EEE4] transition-colors"
                >
                  Book a Discovery Call <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Related Articles Card */}
            <div style={{ padding: '0 8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 700 }}>
                  RELATED ARTICLES
                </span>
                <Link href="/home1#engagement" style={{ fontSize: '11px', color: '#5B1F28', fontWeight: 700 }}>
                  View all →
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Related 1 */}
                <Link href="/home1#offerings" style={{ display: 'flex', gap: '16px', alignItems: 'center', textDecoration: 'none' }} className="group">
                  <div style={{ width: '64px', height: '64px', borderRadius: '8px', background: '#EAE4D9', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=300&auto=format&fit=crop" 
                      alt="Why Supply Chain Thinking Is a Brand Advantage"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 600, color: '#171615', lineHeight: 1.3, margin: '0 0 4px' }} className="group-hover:text-[#5B1F28] transition-colors">
                      Why Supply Chain Thinking Is a Brand Advantage
                    </h5>
                    <span style={{ fontSize: '11.5px', color: '#8A837A' }}>5 min read</span>
                  </div>
                </Link>

                {/* Related 2 */}
                <Link href="/home1#engagement" style={{ display: 'flex', gap: '16px', alignItems: 'center', textDecoration: 'none' }} className="group">
                  <div style={{ width: '64px', height: '64px', borderRadius: '8px', background: '#EAE4D9', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=300&auto=format&fit=crop" 
                      alt="From India to the World"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 600, color: '#171615', lineHeight: 1.3, margin: '0 0 4px' }} className="group-hover:text-[#5B1F28] transition-colors">
                      From India to the World: The Next Chapter for D2C Fashion Brands
                    </h5>
                    <span style={{ fontSize: '11.5px', color: '#8A837A' }}>7 min read</span>
                  </div>
                </Link>

              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#171615', color: 'rgba(245,241,234,0.7)', padding: '70px 0 36px', borderTop: '1px solid rgba(245,241,234,0.12)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', paddingBottom: '44px', borderBottom: '1px solid rgba(245,241,234,0.12)' }}>
            <div style={{ maxWidth: '320px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '6px', color: '#F5F1EA', marginBottom: '10px' }}>LAL10</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', color: 'rgba(245,241,234,0.6)' }}>From moodboard to marketplace.</div>
            </div>
            <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Services</h5>
                <Link href="/home1#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Product</Link>
                <Link href="/home1#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Trend Intelligence</Link>
                <Link href="/home1#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Sourcing</Link>
                <Link href="/home1#engagement" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>Market Intelligence</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Company</h5>
                <Link href="/home1#team" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Team</Link>
                <Link href="/home1#process" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>How It Works</Link>
                <Link href="/home1#engagement" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>Engagement</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Get in Touch</h5>
                <button onClick={openBooking} style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>Book a Call</button>
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

      {/* Discovery Booking Modal */}
      <DiscoveryModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTrack="Launch Sprint"
      />

      <style jsx>{`
        @media (max-width: 1024px) {
          .blog-title-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .blog-content-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
