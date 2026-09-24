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
} from 'lucide-react';
import { DiscoveryModal } from '@/components/DiscoveryModal';
import { InsightArticle } from '@/lib/types';

const TAKEAWAY_ICONS = [Layers, ShieldCheck, Compass, Clock];

function formatInsightDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function InsightArticlePage({ insight }: { insight: InsightArticle }) {
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
      navigator
        .share({
          title: `${insight.title} — ${insight.author.name}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = insight.relatedArticles || [];
  const takeaways = insight.takeaways || [];

  return (
    <div style={{ maxWidth: '100%', overflowX: 'clip', fontFamily: "'Manrope', sans-serif", color: '#171615', background: '#FBFAF7', minHeight: '100vh', position: 'relative' }}>
      <nav style={{ position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 1000, background: 'rgba(251,250,247,0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid #E4DED3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <img src="https://www.lal10.com/logo.png" alt="Lal10 Logo" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
            <div style={{ width: '1px', height: '32px', background: '#E4DED3' }} className="hidden sm:block" />
            <img src="https://thefashionos.com/assets/logo-Dl4_z_fN.png" alt="TheFashionOS Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} className="hidden sm:block" />
          </Link>

          <div className="hidden lg:flex" style={{ gap: '36px', alignItems: 'center' }}>
            <Link href="/#offerings" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Brands</Link>
            <Link href="/#offerings" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Services</Link>
            <Link href="/#process" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>Case Studies</Link>
            <span style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 700, color: '#171615', textTransform: 'uppercase', borderBottom: '2px solid #5B1F28', paddingBottom: '4px' }}>Insights</span>
            <Link href="/#team" style={{ fontSize: '12px', letterSpacing: '1.5px', fontWeight: 600, color: '#57524B', textTransform: 'uppercase' }}>About</Link>
          </div>

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

        {mobileMenuOpen && (
          <div style={{ background: '#FBFAF7', borderBottom: '1px solid #E4DED3', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link href="/#offerings" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Brands</Link>
            <Link href="/#offerings" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Services</Link>
            <Link href="/#process" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Case Studies</Link>
            <Link href="/raymond" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 700, color: '#5B1F28', textTransform: 'uppercase' }}>Insights</Link>
            <Link href="/#team" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>About</Link>
          </div>
        )}
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8A837A', marginBottom: '28px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#8A837A' }}>Home</Link>
          <span>›</span>
          <Link href="/#engagement" style={{ color: '#8A837A' }}>Insights</Link>
          <span>›</span>
          <span style={{ color: '#171615', fontWeight: 500 }}>{insight.title}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 700 }}>
            {insight.category}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8A837A' }}>
            <span>{formatInsightDate(insight.publishedOn)} · {insight.readTime}</span>
            <button onClick={handleShare} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#57524B', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              <Share2 size={14} />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '48px', alignItems: 'start', marginBottom: '40px' }} className="blog-title-grid">
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.5px', color: '#171615', marginBottom: '14px' }}>
              {insight.title}
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#57524B', lineHeight: 1.35, marginBottom: '28px' }}>
              {insight.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #EAE4D9' }}>
              {insight.author.avatarUrl ? (
                <img src={insight.author.avatarUrl} alt={insight.author.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #D8CDBF' }} />
              ) : (
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid #D8CDBF', background: '#F3EEE4' }} />
              )}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#171615' }}>{insight.author.name}</span>
                  {insight.author.linkedinUrl && (
                    <a href={insight.author.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Linkedin size={14} color="#0A66C2" />
                    </a>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#8A837A', fontWeight: 600, marginTop: '2px' }}>
                  {insight.author.role}
                </div>
                <div style={{ fontSize: '12px', color: '#6B655E', marginTop: '2px' }}>
                  {insight.author.bio}
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#FAF7F2', borderLeft: '2px solid #5B1F28', padding: '32px 28px', marginTop: '10px' }} className="blog-quote-box">
            <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', lineHeight: 1.35, color: '#171615', margin: '0 0 16px' }}>
              “{insight.quote}”
            </blockquote>
            <div style={{ width: '32px', height: '1px', background: '#D8CDBF', marginBottom: '14px' }} />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 700, letterSpacing: '4px', color: '#57524B' }}>
              L A L 1 0
            </div>
          </div>
        </div>

        {insight.heroImageUrl && (
          <div style={{ marginBottom: '48px', maxWidth: '540px' }}>
            <img src={insight.heroImageUrl} alt={insight.heroImageAlt || insight.title} style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #EAE4D9' }} />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '60px', alignItems: 'start' }} className="blog-content-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {insight.sections.map((section, index) => (
              <div key={`${section.heading}-${index}`} style={{ display: 'grid', gridTemplateColumns: '44px 20px 1fr', gap: '16px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '24px', color: '#8A837A', fontWeight: 500 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ color: '#D8CDBF' }}>—</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#171615', lineHeight: 1.3, marginBottom: '8px' }}>
                    {section.heading}
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#57524B', margin: 0 }}>
                    {section.body}
                  </p>
                  {index === insight.sections.length - 1 && <div style={{ width: '40px', height: '1.5px', background: '#5B1F28', marginTop: '24px' }} />}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'sticky', top: '100px' }}>
            {takeaways.length > 0 && (
              <div style={{ background: '#FAF7F2', border: '1px solid #EAE4D9', borderRadius: '12px', padding: '32px 28px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#171615', fontWeight: 700, marginBottom: '24px' }}>
                  KEY TAKEAWAYS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {takeaways.map((item, index) => {
                    const Icon = TAKEAWAY_ICONS[index % TAKEAWAY_ICONS.length];
                    return (
                      <div key={`${item}-${index}`} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#FFFFFF', border: '1px solid #EAE4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={16} color="#5B1F28" />
                        </div>
                        <span style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#3A362F' }}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ background: '#171615', color: '#F5F1EA', borderRadius: '12px', padding: '36px 30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#F5F1EA', marginBottom: '8px' }}>
                  {insight.ctaTitle || "Building a fashion brand? Let's talk."}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'rgba(245,241,234,0.7)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {insight.ctaBody || "From sourcing to scale — we help fashion brands build what's next."}
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

            {relatedArticles.length > 0 && (
              <div style={{ padding: '0 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8A837A', fontWeight: 700 }}>
                    RELATED ARTICLES
                  </span>
                  <Link href="/#engagement" style={{ fontSize: '11px', color: '#5B1F28', fontWeight: 700 }}>
                    View all →
                  </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {relatedArticles.map((article) => (
                    <Link key={article.title} href={article.href} style={{ display: 'flex', gap: '16px', alignItems: 'center', textDecoration: 'none' }} className="group">
                      <div style={{ width: '64px', height: '64px', borderRadius: '8px', background: '#EAE4D9', overflow: 'hidden', flexShrink: 0 }}>
                        {article.imageUrl && <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <div>
                        <h5 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 600, color: '#171615', lineHeight: 1.3, margin: '0 0 4px' }} className="group-hover:text-[#5B1F28] transition-colors">
                          {article.title}
                        </h5>
                        <span style={{ fontSize: '11.5px', color: '#8A837A' }}>{article.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

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
                <Link href="/#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Product</Link>
                <Link href="/#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Trend Intelligence</Link>
                <Link href="/#offerings" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Sourcing</Link>
                <Link href="/#engagement" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>Market Intelligence</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Company</h5>
                <Link href="/#team" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>Team</Link>
                <Link href="/#process" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px' }}>How It Works</Link>
                <Link href="/#engagement" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>Engagement</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(245,241,234,0.45)', fontWeight: 600, marginBottom: '16px' }}>Get in Touch</h5>
                <button onClick={openBooking} style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px', marginBottom: '10px', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>Book a Call</button>
                <a href="mailto:launchpad@lal10.com" style={{ display: 'block', color: 'rgba(245,241,234,0.75)', fontSize: '14px' }}>launchpad@lal10.com</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '28px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'rgba(245,241,234,0.5)' }}>
            <div>© {new Date().getFullYear()} Lal10 FashionOS. Part of Lal10.</div>
            <div>The playbook behind launching and scaling brands.</div>
          </div>
        </div>
      </footer>

      <DiscoveryModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultTrack="Launch Sprint" />

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
