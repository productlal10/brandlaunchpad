'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ExternalLink, RefreshCw, Send } from 'lucide-react';
import { InsightArticle } from '@/lib/types';

type InsightFormState = {
  status: 'Published' | 'Draft';
  category: string;
  title: string;
  subtitle: string;
  slug: string;
  quote: string;
  publishedOn: string;
  readTime: string;
  heroImageUrl: string;
  heroImageAlt: string;
  sourceUrl: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  authorAvatarUrl: string;
  authorLinkedinUrl: string;
  sectionsText: string;
  takeawaysText: string;
  relatedArticlesText: string;
  ctaTitle: string;
  ctaBody: string;
};

const INITIAL_FORM: InsightFormState = {
  status: 'Published',
  category: 'Brand Stories',
  title: '',
  subtitle: '',
  slug: '',
  quote: '',
  publishedOn: new Date().toISOString().split('T')[0],
  readTime: '5 min read',
  heroImageUrl: '',
  heroImageAlt: '',
  sourceUrl: '',
  authorName: 'Sanchit Govil',
  authorRole: 'Co-Founder, LAL10',
  authorBio: 'Operator at the intersection of fashion, supply chains and brand building.',
  authorAvatarUrl: '',
  authorLinkedinUrl: 'https://www.linkedin.com/in/sanchitgovil/',
  sectionsText: '',
  takeawaysText: '',
  relatedArticlesText: '',
  ctaTitle: "Building a fashion brand? Let's talk.",
  ctaBody: "From sourcing to scale — we help fashion brands build what's next.",
};

function parseSections(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [heading, ...bodyParts] = line.split('::');
      return {
        heading: heading?.trim() || '',
        body: bodyParts.join('::').trim(),
      };
    })
    .filter((item) => item.heading && item.body);
}

function parseTakeaways(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseRelatedArticles(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, href, readTime, imageUrl] = line.split('::').map((item) => item.trim());
      return { title, href, readTime, imageUrl };
    })
    .filter((item) => item.title && item.href);
}

export default function InsightsManager() {
  const [insights, setInsights] = useState<InsightArticle[]>([]);
  const [form, setForm] = useState<InsightFormState>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/insights?includeDrafts=1', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to load insights.');
      }
      setInsights(Array.isArray(data.insights) ? data.insights : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load insights.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const publishedCount = useMemo(() => insights.filter((item) => item.status === 'Published').length, [insights]);

  const handleChange = (field: keyof InsightFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    setError(null);

    try {
      const payload = {
        status: form.status,
        category: form.category,
        title: form.title,
        subtitle: form.subtitle,
        slug: form.slug,
        quote: form.quote,
        publishedOn: form.publishedOn,
        readTime: form.readTime,
        heroImageUrl: form.heroImageUrl,
        heroImageAlt: form.heroImageAlt,
        sourceUrl: form.sourceUrl,
        author: {
          name: form.authorName,
          role: form.authorRole,
          bio: form.authorBio,
          avatarUrl: form.authorAvatarUrl,
          linkedinUrl: form.authorLinkedinUrl,
        },
        sections: parseSections(form.sectionsText),
        takeaways: parseTakeaways(form.takeawaysText),
        relatedArticles: parseRelatedArticles(form.relatedArticlesText),
        ctaTitle: form.ctaTitle,
        ctaBody: form.ctaBody,
      };

      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save insight.');
      }

      setMessage(`Saved "${data.insight.title}" successfully.`);
      setForm({
        ...INITIAL_FORM,
        authorAvatarUrl: form.authorAvatarUrl,
      });
      await fetchInsights();
    } catch (err: any) {
      setError(err.message || 'Failed to save insight.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #EFEAE3', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#8A7D71', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '10px' }}>Published insights</div>
          <div style={{ fontSize: '34px', fontWeight: 800, color: '#1A1817' }}>{publishedCount}</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #EFEAE3', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#8A7D71', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '10px' }}>Draft insights</div>
          <div style={{ fontSize: '34px', fontWeight: 800, color: '#1A1817' }}>{insights.length - publishedCount}</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #EFEAE3', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#8A7D71', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '10px' }}>Workflow</div>
          <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#57524B' }}>Paste the LinkedIn post into the form, publish, and the site generates the blog route automatically.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }} className="insights-manager-grid">
        <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', border: '1px solid #EFEAE3', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#8A7D71', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '6px' }}>Manual LinkedIn import</div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#1A1817' }}>Add a new insight</h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={fetchInsights} style={{ background: '#FAF6F0', border: '1px solid #E4DDD4', color: '#5B1F28', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '12px' }}>
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button type="submit" disabled={isSaving} style={{ background: '#5B1F28', border: 'none', color: '#FFFFFF', borderRadius: '8px', padding: '10px 16px', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '12px' }}>
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                {isSaving ? 'Saving...' : 'Publish insight'}
              </button>
            </div>
          </div>

          {message && <div style={{ marginBottom: '14px', padding: '12px 14px', borderRadius: '10px', background: '#ECFDF3', color: '#166534', border: '1px solid #BBF7D0', fontSize: '13px' }}>{message}</div>}
          {error && <div style={{ marginBottom: '14px', padding: '12px 14px', borderRadius: '10px', background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', fontSize: '13px' }}>{error}</div>}

          <div style={{ display: 'grid', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Title
                <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Subtitle
                <input value={form.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} required style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Status
                <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px', background: '#FFFFFF' }}>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 180px', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Slug
                <input value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} placeholder="leave blank to auto-generate" style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Category
                <input value={form.category} onChange={(e) => handleChange('category', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Read time
                <input value={form.readTime} onChange={(e) => handleChange('readTime', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Publish date
                <input type="date" value={form.publishedOn} onChange={(e) => handleChange('publishedOn', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Source link
                <input value={form.sourceUrl} onChange={(e) => handleChange('sourceUrl', e.target.value)} placeholder="LinkedIn post URL" style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Hero image URL
                <input value={form.heroImageUrl} onChange={(e) => handleChange('heroImageUrl', e.target.value)} placeholder="LinkedIn image URL" style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
            </div>

            <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
              Quote
              <input value={form.quote} onChange={(e) => handleChange('quote', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Author name
                <input value={form.authorName} onChange={(e) => handleChange('authorName', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Author role
                <input value={form.authorRole} onChange={(e) => handleChange('authorRole', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Author LinkedIn
                <input value={form.authorLinkedinUrl} onChange={(e) => handleChange('authorLinkedinUrl', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Author bio
                <input value={form.authorBio} onChange={(e) => handleChange('authorBio', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Author avatar URL
                <input value={form.authorAvatarUrl} onChange={(e) => handleChange('authorAvatarUrl', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
            </div>

            <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
              Story sections
              <textarea value={form.sectionsText} onChange={(e) => handleChange('sectionsText', e.target.value)} rows={8} placeholder="One section per line: Heading :: Body text" style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px', resize: 'vertical' }} />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Takeaways
                <textarea value={form.takeawaysText} onChange={(e) => handleChange('takeawaysText', e.target.value)} rows={5} placeholder="One takeaway per line" style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px', resize: 'vertical' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                Related articles
                <textarea value={form.relatedArticlesText} onChange={(e) => handleChange('relatedArticlesText', e.target.value)} rows={5} placeholder="One per line: Title :: URL :: Read time :: Image URL" style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px', resize: 'vertical' }} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                CTA title
                <input value={form.ctaTitle} onChange={(e) => handleChange('ctaTitle', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
              <label style={{ display: 'grid', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#4A453E' }}>
                CTA body
                <input value={form.ctaBody} onChange={(e) => handleChange('ctaBody', e.target.value)} style={{ padding: '11px 12px', borderRadius: '8px', border: '1px solid #DCD6CC', fontSize: '13px' }} />
              </label>
            </div>
          </div>
        </form>

        <div style={{ background: '#FFFFFF', border: '1px solid #EFEAE3', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#8A7D71', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '6px' }}>Published routes</div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#1A1817' }}>Insights library</h3>
            </div>
            <BookOpen size={20} color="#5B1F28" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {isLoading && (
              <div style={{ padding: '18px', borderRadius: '10px', background: '#FAF6F0', border: '1px solid #EFEAE3', color: '#7E766D', fontSize: '13px' }}>
                Loading insights...
              </div>
            )}

            {!isLoading && insights.length === 0 && (
              <div style={{ padding: '18px', borderRadius: '10px', background: '#FAF6F0', border: '1px solid #EFEAE3', color: '#7E766D', fontSize: '13px' }}>
                No insights saved yet.
              </div>
            )}

            {insights.map((insight) => (
              <div key={insight.id} style={{ border: '1px solid #EFEAE3', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'inline-flex', padding: '4px 8px', borderRadius: '999px', background: insight.status === 'Published' ? '#ECFDF3' : '#FEF3C7', color: insight.status === 'Published' ? '#166534' : '#92400E', fontSize: '11px', fontWeight: 700, marginBottom: '10px' }}>
                      {insight.status}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1817', lineHeight: 1.4 }}>{insight.title}</div>
                    <div style={{ fontSize: '12px', color: '#7E766D', marginTop: '6px' }}>
                      /insights/{insight.slug}
                    </div>
                  </div>
                  <Link href={`/insights/${insight.slug}`} target="_blank" style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #E4DDD4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#5B1F28' }}>
                    <ExternalLink size={15} />
                  </Link>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px', fontSize: '12px', color: '#57524B' }}>
                  <span>{insight.category}</span>
                  <span>{insight.readTime}</span>
                  <span>{insight.publishedOn}</span>
                  <span>{insight.author.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '18px', padding: '14px', borderRadius: '10px', background: '#FAF6F0', border: '1px solid #EFEAE3', fontSize: '12px', color: '#57524B', lineHeight: 1.6 }}>
            <div>Sections: <code>Heading :: Body text</code></div>
            <div>Related: <code>Title :: URL :: Read time :: Image URL</code></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1180px) {
          .insights-manager-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
