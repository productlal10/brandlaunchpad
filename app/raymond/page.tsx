import { notFound } from 'next/navigation';
import InsightArticlePage from '@/components/InsightArticlePage';
import { getInsightBySlug } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function RaymondBlogPage() {
  const insight = await getInsightBySlug('sanchit-raymond-blog');

  if (!insight) {
    notFound();
  }

  return <InsightArticlePage insight={insight} />;
}
