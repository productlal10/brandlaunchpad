import { notFound } from 'next/navigation';
import InsightArticlePage from '@/components/InsightArticlePage';
import { getInsightBySlug } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const insight = await getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return <InsightArticlePage insight={insight} />;
}
