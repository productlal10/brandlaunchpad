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
