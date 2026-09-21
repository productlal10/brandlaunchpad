import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/adminAuth';
import { getInsights, saveInsightArticle } from '@/lib/storage';
import { InsightArticle } from '@/lib/types';
import { proxyToExternalApi } from '@/lib/externalApi';

export async function GET(req: NextRequest) {
  try {
    const proxiedResponse = await proxyToExternalApi(
      req,
      'EXTERNAL_INSIGHTS_URL',
      '/api/launchpad/insights',
      {
        fallbackOnNetworkError: true,
        fallbackOnStatuses: [401, 404, 500, 502, 503, 504],
        timeoutMs: 2500,
      }
    );
    if (proxiedResponse) {
      return proxiedResponse;
    }

    const includeDrafts = req.nextUrl.searchParams.get('includeDrafts') === '1';
    if (includeDrafts) {
      const auth = await requireAuthenticatedAdmin(req);
      if (auth.response) {
        return auth.response;
      }
    }

    const insights = await getInsights();
    const filtered = includeDrafts ? insights : insights.filter((item) => item.status === 'Published');
    const sorted = filtered.sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime());
    return NextResponse.json({ success: true, count: sorted.length, insights: sorted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to load insights.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const proxiedResponse = await proxyToExternalApi(
      req,
      'EXTERNAL_INSIGHTS_URL',
      '/api/launchpad/insights',
      {
        fallbackOnNetworkError: true,
        fallbackOnStatuses: [401, 404, 500, 502, 503, 504],
        timeoutMs: 2500,
      }
    );
    if (proxiedResponse) {
      return proxiedResponse;
    }

    const auth = await requireAuthenticatedAdmin(req);
    if (auth.response) {
      return auth.response;
    }

    const body = await req.json();

    if (!body.title || !body.subtitle || !body.author?.name) {
      return NextResponse.json({ success: false, error: 'Title, subtitle, and author name are required.' }, { status: 400 });
    }

    const sections = Array.isArray(body.sections) ? body.sections.filter((item: any) => item?.heading && item?.body) : [];
    if (sections.length === 0) {
      return NextResponse.json({ success: false, error: 'Add at least one story section.' }, { status: 400 });
    }

    const insightPayload: Omit<InsightArticle, 'id' | 'createdAt' | 'updatedAt'> & { id?: string } = {
      id: body.id,
      slug: String(body.slug || body.title),
      status: body.status === 'Draft' ? 'Draft' : 'Published',
      category: String(body.category || 'Brand Stories'),
      title: String(body.title).trim(),
      subtitle: String(body.subtitle).trim(),
      quote: String(body.quote || '').trim(),
      publishedOn: String(body.publishedOn || new Date().toISOString().split('T')[0]),
      readTime: String(body.readTime || '5 min read').trim(),
      heroImageUrl: String(body.heroImageUrl || '').trim(),
      heroImageAlt: String(body.heroImageAlt || body.title).trim(),
      sourceUrl: String(body.sourceUrl || '').trim(),
      author: {
        name: String(body.author.name).trim(),
        role: String(body.author.role || '').trim(),
        bio: String(body.author.bio || '').trim(),
        avatarUrl: String(body.author.avatarUrl || '').trim(),
        linkedinUrl: String(body.author.linkedinUrl || '').trim(),
      },
      sections,
      takeaways: Array.isArray(body.takeaways) ? body.takeaways.filter(Boolean).map((item: string) => item.trim()) : [],
      relatedArticles: Array.isArray(body.relatedArticles)
        ? body.relatedArticles
            .filter((item: any) => item?.title && item?.href)
            .map((item: any) => ({
              title: String(item.title).trim(),
              href: String(item.href).trim(),
              readTime: String(item.readTime || '').trim(),
              imageUrl: String(item.imageUrl || '').trim(),
            }))
        : [],
      ctaTitle: String(body.ctaTitle || '').trim(),
      ctaBody: String(body.ctaBody || '').trim(),
    };

    const insight = await saveInsightArticle(insightPayload);
    return NextResponse.json({ success: true, insight });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to save insight.' }, { status: 500 });
  }
}
