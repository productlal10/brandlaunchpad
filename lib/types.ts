export type ApparelCategory = 
  | 'Womenswear' 
  | 'Menswear' 
  | 'Kidswear' 
  | 'Footwear & Accessories' 
  | 'Multi-category';

export type BrandStage = 
  | 'Concept & Moodboard' 
  | 'Sampling & Development' 
  | 'Production Ready' 
  | 'Scaling Existing Label';

export type BudgetTier = 
  | '₹5L – ₹15L ($6k – $18k)' 
  | '₹15L – ₹35L ($18k – $42k)' 
  | '₹35L – ₹75L ($42k – $90k)' 
  | '₹75L+ ($90k+)';

export interface DiscoveryCallLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  brandName: string;
  category: ApparelCategory | string;
  stage: BrandStage | string;
  budget: BudgetTier | string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  notes?: string;
  trackInterest?: 'Launch Sprint' | 'Growth Advisory' | 'Market Intelligence' | 'General';
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  createdAt: string;
}

export interface PartnerInquiry {
  id: string;
  partnerService: string;
  fullName: string;
  email: string;
  phone?: string;
  brandName: string;
  projectBrief: string;
  createdAt: string;
}

export interface CategoryTrendData {
  id: string;
  categoryName: string;
  avgSellingPrice: string;
  discountCorridor: string;
  grossMarginBenchmark: string;
  topPerformingSubCategories: string[];
  recommendedInitialSKUs: number;
  marketDemandGrowthYoY: string;
  avgDaysToSellThrough: number;
  returnRateBenchmark: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  password?: string;
  role: 'Super Administrator' | 'CEO' | 'COO' | 'CPO' | 'EIR' | 'Admin' | 'Manager' | 'Editor' | string;
  status: 'Active' | 'Inactive';
  avatarInitials: string;
  avatarColor: string;
  joinedOn: string;
  lastActive: string;
}

export interface InsightAuthor {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl: string;
}

export interface InsightSection {
  heading: string;
  body: string;
}

export interface InsightRelatedArticle {
  title: string;
  href: string;
  readTime: string;
  imageUrl: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  status: 'Published' | 'Draft';
  category: string;
  title: string;
  subtitle: string;
  quote: string;
  publishedOn: string;
  readTime: string;
  heroImageUrl: string;
  heroImageAlt?: string;
  sourceUrl?: string;
  author: InsightAuthor;
  sections: InsightSection[];
  takeaways: string[];
  relatedArticles: InsightRelatedArticle[];
  ctaTitle?: string;
  ctaBody?: string;
  createdAt: string;
  updatedAt: string;
}
