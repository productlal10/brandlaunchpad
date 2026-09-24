export interface Factory {
  factoryId: string;
  displayName: string;
  location: string;
  monthlyCapacity: number;
  availableCapacity: number;
  minimumOrderValue: number;
  maximumOrderValue: number;
  minimumOrderQuantity: number;
  leadTimeMin: number;
  leadTimeMax: number;
  priceMin: number;
  priceMax: number;
  categories: string[];
  fabricCapabilities: string[];
  processCapabilities: string[];
}

export interface AssortmentInput {
  collectionBudget: number; // in INR
  landedCostPerUnit: number;
  depthPerOption: number;
  optionCount: number;
  category?: string;
  fabricRequirements?: { name: string; options: number }[];
  printRequirements?: { name: string; options: number }[];
  finishRequirements?: { name: string; options: number }[];
  productionWindowDays?: number;
}

export interface FactoryScoreDetail {
  factory: Factory;
  overallScore: number;
  capabilityScore: number;
  capacityScore: number;
  costScore: number;
  leadTimeScore: number;
  moqScore: number;
  categoryScore: number;
}

export interface CapabilityCoverageItem {
  requirement: string;
  collectionNeed: string;
  matchedFactories: number;
  coveragePercentage: number;
  leadTimeRange: string;
}

export interface DataInsights {
  optionsWithinPlannedDepth: number;
  factoriesMeetingProductionWindow: number;
  factoriesSupportingRequiredPrint: number;
  factoriesWithAvailableCapacity: number;
}

export interface FactoryFitResult {
  totalUnits: number;
  productionValue: number;
  productionReadiness: number;
  fitLabel: 'HIGH FIT' | 'GOOD FIT' | 'MODERATE FIT' | 'LIMITED FIT';
  metrics: {
    capacityFit: number;
    leadTime: number;
    fabricCapability: number;
    printFinish: number;
    moqFit: number;
  };
  totalVettedCount: number;
  eligibleCount: number;
  displayedFactories: FactoryScoreDetail[];
  capabilityCoverage: CapabilityCoverageItem[];
  dataInsights: DataInsights;
}

// ─── 24 VETTED PRODUCTION FACTORIES DATABASE ─────────────────────────────────
export const VETTED_FACTORIES: Factory[] = [
  {
    factoryId: 'factory-01',
    displayName: 'Factory 01',
    location: 'Okhla, Delhi NCR',
    monthlyCapacity: 300000,
    availableCapacity: 65000,
    minimumOrderValue: 200000,
    maximumOrderValue: 8000000,
    minimumOrderQuantity: 500,
    leadTimeMin: 30,
    leadTimeMax: 45,
    priceMin: 380,
    priceMax: 950,
    categories: ['Menswear', 'Womenswear', 'Streetwear', 'T-Shirts & Polos', 'Loungewear'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'French Terry', 'Linen Blend'],
    processCapabilities: ['Knit', 'Digital Print', 'Screen Print', 'Wash / Finish', 'Garment Dye']
  },
  {
    factoryId: 'factory-02',
    displayName: 'Factory 02',
    location: 'Okhla, Delhi NCR',
    monthlyCapacity: 280000,
    availableCapacity: 50000,
    minimumOrderValue: 150000,
    maximumOrderValue: 6000000,
    minimumOrderQuantity: 400,
    leadTimeMin: 28,
    leadTimeMax: 42,
    priceMin: 350,
    priceMax: 880,
    categories: ['Menswear', 'Womenswear', 'Kidswear', 'Athleisure'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'Interlock', 'Modal Blend'],
    processCapabilities: ['Knit', 'Screen Print', 'Embroidery', 'Wash / Finish']
  },
  {
    factoryId: 'factory-03',
    displayName: 'Factory 03',
    location: 'Udyog Vihar, Gurugram (NCR)',
    monthlyCapacity: 220000,
    availableCapacity: 38000,
    minimumOrderValue: 250000,
    maximumOrderValue: 7500000,
    minimumOrderQuantity: 500,
    leadTimeMin: 32,
    leadTimeMax: 45,
    priceMin: 420,
    priceMax: 1100,
    categories: ['Menswear', 'Womenswear', 'Loungewear'],
    fabricCapabilities: ['Cotton Jersey', 'French Terry', 'Organic Cotton', 'Pique Knit'],
    processCapabilities: ['Knit', 'Digital Print', 'Wash / Finish', 'Silicon Wash']
  },
  {
    factoryId: 'factory-04',
    displayName: 'Factory 04',
    location: 'Gurugram, Delhi NCR',
    monthlyCapacity: 320000,
    availableCapacity: 70000,
    minimumOrderValue: 300000,
    maximumOrderValue: 9000000,
    minimumOrderQuantity: 350,
    leadTimeMin: 35,
    leadTimeMax: 48,
    priceMin: 450,
    priceMax: 1300,
    categories: ['Menswear', 'Womenswear', 'Winterwear', 'Streetwear'],
    fabricCapabilities: ['Heavyweight Knit', 'French Terry', 'Fleece', 'Rib Knit'],
    processCapabilities: ['Knit', 'Screen Print', 'Embroidery', 'Garment Dye / Wash']
  },
  {
    factoryId: 'factory-05',
    displayName: 'Factory 05',
    location: 'Gurugram, Delhi NCR',
    monthlyCapacity: 210000,
    availableCapacity: 42000,
    minimumOrderValue: 180000,
    maximumOrderValue: 5000000,
    minimumOrderQuantity: 300,
    leadTimeMin: 30,
    leadTimeMax: 45,
    priceMin: 390,
    priceMax: 1050,
    categories: ['Menswear', 'Kidswear', 'Casualwear'],
    fabricCapabilities: ['Cotton Jersey', 'French Terry', 'Cotton Spandex'],
    processCapabilities: ['Knit', 'Embroidery', 'Digital Print', 'Wash / Finish']
  },
  {
    factoryId: 'factory-06',
    displayName: 'Factory 06',
    location: 'Delhi NCR',
    monthlyCapacity: 190000,
    availableCapacity: 35000,
    minimumOrderValue: 200000,
    maximumOrderValue: 7000000,
    minimumOrderQuantity: 250,
    leadTimeMin: 30,
    leadTimeMax: 42,
    priceMin: 500,
    priceMax: 1600,
    categories: ['Womenswear', 'Contemporary', 'Streetwear'],
    fabricCapabilities: ['Cotton Jersey', 'Rayon Twill', 'Linen', 'Poplin'],
    processCapabilities: ['Knit', 'Digital Print', 'Embroidery', 'Screen Print']
  },
  {
    factoryId: 'factory-07',
    displayName: 'Factory 07',
    location: 'Gurugram, Delhi NCR',
    monthlyCapacity: 250000,
    availableCapacity: 55000,
    minimumOrderValue: 150000,
    maximumOrderValue: 6500000,
    minimumOrderQuantity: 300,
    leadTimeMin: 35,
    leadTimeMax: 45,
    priceMin: 400,
    priceMax: 1150,
    categories: ['Menswear', 'Womenswear', 'Streetwear', 'Athleisure'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'French Terry'],
    processCapabilities: ['Knit', 'Embroidery', 'Screen Print', 'Wash / Finish']
  },
  {
    factoryId: 'factory-08',
    displayName: 'Factory 08',
    location: 'Noida, Delhi NCR',
    monthlyCapacity: 175000,
    availableCapacity: 30000,
    minimumOrderValue: 250000,
    maximumOrderValue: 6000000,
    minimumOrderQuantity: 300,
    leadTimeMin: 28,
    leadTimeMax: 40,
    priceMin: 480,
    priceMax: 1400,
    categories: ['Womenswear', 'Menswear', 'Shirts & Tops'],
    fabricCapabilities: ['Cotton Poplin', 'Rayon', 'Linen Blend', 'Cotton Jersey'],
    processCapabilities: ['Knit', 'Digital Print', 'Wash / Finish', 'Soft Wash']
  },
  {
    factoryId: 'factory-09',
    displayName: 'Factory 09',
    location: 'Udyog Vihar, Gurugram (NCR)',
    monthlyCapacity: 160000,
    availableCapacity: 28000,
    minimumOrderValue: 200000,
    maximumOrderValue: 5500000,
    minimumOrderQuantity: 200,
    leadTimeMin: 25,
    leadTimeMax: 38,
    priceMin: 550,
    priceMax: 1800,
    categories: ['Menswear', 'Womenswear', 'Designer Streetwear'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'French Terry', 'Linen'],
    processCapabilities: ['Knit', 'Screen Print', 'Digital Print', 'Embroidery', 'Garment Dye / Wash']
  },
  {
    factoryId: 'factory-10',
    displayName: 'Factory 10',
    location: 'Sector 58, Faridabad (NCR)',
    monthlyCapacity: 140000,
    availableCapacity: 25000,
    minimumOrderValue: 120000,
    maximumOrderValue: 4000000,
    minimumOrderQuantity: 200,
    leadTimeMin: 32,
    leadTimeMax: 45,
    priceMin: 380,
    priceMax: 1200,
    categories: ['Womenswear', 'Boho & Resortwear', 'Kids'],
    fabricCapabilities: ['Cotton Cambric', 'Cotton Jersey', 'Rayon', 'Linen'],
    processCapabilities: ['Knit', 'Screen Print', 'Block Print', 'Embroidery', 'Wash / Finish']
  },
  {
    factoryId: 'factory-11',
    displayName: 'Factory 11',
    location: 'NSEZ Noida, Delhi NCR',
    monthlyCapacity: 350000,
    availableCapacity: 80000,
    minimumOrderValue: 300000,
    maximumOrderValue: 12000000,
    minimumOrderQuantity: 600,
    leadTimeMin: 25,
    leadTimeMax: 38,
    priceMin: 320,
    priceMax: 850,
    categories: ['Menswear', 'Womenswear', 'Athleisure', 'Activewear'],
    fabricCapabilities: ['Polyester Knit', 'Cotton Jersey', 'Poly Spandex', 'Rayon'],
    processCapabilities: ['Knit', 'Digital Print', 'Screen Print', 'Wash / Finish']
  },
  {
    factoryId: 'factory-12',
    displayName: 'Factory 12',
    location: 'Delhi NCR',
    monthlyCapacity: 180000,
    availableCapacity: 40000,
    minimumOrderValue: 200000,
    maximumOrderValue: 7000000,
    minimumOrderQuantity: 500,
    leadTimeMin: 30,
    leadTimeMax: 40,
    priceMin: 420,
    priceMax: 1250,
    categories: ['Menswear', 'Womenswear', 'Streetwear', 'T-Shirts & Polos'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'French Terry', 'Pique Knit'],
    processCapabilities: ['Knit', 'Digital Print', 'Embroidery', 'Wash / Finish']
  },
  {
    factoryId: 'factory-13',
    displayName: 'Factory 13',
    location: 'Manesar, Delhi NCR',
    monthlyCapacity: 260000,
    availableCapacity: 52000,
    minimumOrderValue: 250000,
    maximumOrderValue: 8500000,
    minimumOrderQuantity: 400,
    leadTimeMin: 32,
    leadTimeMax: 45,
    priceMin: 460,
    priceMax: 1350,
    categories: ['Menswear', 'Womenswear', 'Workwear', 'Denim & Casuals'],
    fabricCapabilities: ['Cotton Jersey', 'Twill', 'Chambray', 'Denim', 'Poplin'],
    processCapabilities: ['Knit', 'Screen Print', 'Embroidery', 'Wash / Finish', 'Garment Dye / Wash']
  },
  {
    factoryId: 'factory-14',
    displayName: 'Factory 14',
    location: 'Manesar, Delhi NCR',
    monthlyCapacity: 200000,
    availableCapacity: 36000,
    minimumOrderValue: 220000,
    maximumOrderValue: 7200000,
    minimumOrderQuantity: 350,
    leadTimeMin: 30,
    leadTimeMax: 44,
    priceMin: 440,
    priceMax: 1280,
    categories: ['Womenswear', 'Menswear', 'Activewear'],
    fabricCapabilities: ['Cotton Jersey', 'Nylon Spandex', 'French Terry'],
    processCapabilities: ['Knit', 'Digital Print', 'Embroidery', 'Flatlock Stitch']
  },
  {
    factoryId: 'factory-15',
    displayName: 'Factory 15',
    location: 'Manesar Sector 8, Delhi NCR',
    monthlyCapacity: 310000,
    availableCapacity: 68000,
    minimumOrderValue: 280000,
    maximumOrderValue: 9500000,
    minimumOrderQuantity: 500,
    leadTimeMin: 30,
    leadTimeMax: 44,
    priceMin: 360,
    priceMax: 920,
    categories: ['Menswear', 'Womenswear', 'Casualwear'],
    fabricCapabilities: ['Cotton Jersey', 'Denim', 'Poplin', 'Khadi Blend'],
    processCapabilities: ['Knit', 'Screen Print', 'Garment Dye / Wash', 'Wash / Finish']
  },
  {
    factoryId: 'factory-16',
    displayName: 'Factory 16',
    location: 'Mayapuri, Delhi NCR',
    monthlyCapacity: 150000,
    availableCapacity: 26000,
    minimumOrderValue: 180000,
    maximumOrderValue: 5000000,
    minimumOrderQuantity: 250,
    leadTimeMin: 25,
    leadTimeMax: 38,
    priceMin: 520,
    priceMax: 1750,
    categories: ['Womenswear', 'Menswear', 'High-Street Fashion'],
    fabricCapabilities: ['Cotton Jersey', 'Viscose', 'Modal', 'Linen'],
    processCapabilities: ['Knit', 'Digital Print', 'Embroidery', 'Screen Print']
  },
  {
    factoryId: 'factory-17',
    displayName: 'Factory 17',
    location: 'Okhla, Delhi NCR',
    monthlyCapacity: 340000,
    availableCapacity: 75000,
    minimumOrderValue: 350000,
    maximumOrderValue: 11000000,
    minimumOrderQuantity: 600,
    leadTimeMin: 30,
    leadTimeMax: 45,
    priceMin: 340,
    priceMax: 890,
    categories: ['Menswear', 'Kidswear', 'Basic Knits'],
    fabricCapabilities: ['Cotton Jersey', 'Rib Knit', 'Interlock'],
    processCapabilities: ['Knit', 'Screen Print', 'Rotary Print', 'Wash / Finish']
  },
  {
    factoryId: 'factory-18',
    displayName: 'Factory 18',
    location: 'Faridabad, Delhi NCR',
    monthlyCapacity: 170000,
    availableCapacity: 31000,
    minimumOrderValue: 160000,
    maximumOrderValue: 4800000,
    minimumOrderQuantity: 300,
    leadTimeMin: 28,
    leadTimeMax: 42,
    priceMin: 410,
    priceMax: 1100,
    categories: ['Menswear', 'Womenswear', 'Loungewear'],
    fabricCapabilities: ['Cotton Jersey', 'French Terry', 'Waffle Knit'],
    processCapabilities: ['Knit', 'Screen Print', 'Garment Dye / Wash', 'Wash / Finish']
  },
  {
    factoryId: 'factory-19',
    displayName: 'Factory 19',
    location: 'Sector 58, Faridabad (NCR)',
    monthlyCapacity: 130000,
    availableCapacity: 22000,
    minimumOrderValue: 100000,
    maximumOrderValue: 3500000,
    minimumOrderQuantity: 150,
    leadTimeMin: 30,
    leadTimeMax: 44,
    priceMin: 450,
    priceMax: 1500,
    categories: ['Womenswear', 'Ethnic Contemporary', 'D2C Brands'],
    fabricCapabilities: ['Cotton Cambric', 'Cotton Jersey', 'Mulmul', 'Chanderi'],
    processCapabilities: ['Knit', 'Hand Screen Print', 'Digital Print', 'Embroidery']
  },
  {
    factoryId: 'factory-20',
    displayName: 'Factory 20',
    location: 'Gurugram Sector 37, Delhi NCR',
    monthlyCapacity: 195000,
    availableCapacity: 34000,
    minimumOrderValue: 150000,
    maximumOrderValue: 4500000,
    minimumOrderQuantity: 300,
    leadTimeMin: 30,
    leadTimeMax: 44,
    priceMin: 330,
    priceMax: 820,
    categories: ['Kidswear', 'Menswear', 'Casualwear'],
    fabricCapabilities: ['Cotton Jersey', 'Hosiery', 'Single Jersey'],
    processCapabilities: ['Knit', 'Screen Print', 'Embroidery', 'Wash / Finish']
  },
  {
    factoryId: 'factory-21',
    displayName: 'Factory 21',
    location: 'NSEZ Noida, Delhi NCR',
    monthlyCapacity: 300000,
    availableCapacity: 62000,
    minimumOrderValue: 250000,
    maximumOrderValue: 8000000,
    minimumOrderQuantity: 450,
    leadTimeMin: 26,
    leadTimeMax: 40,
    priceMin: 340,
    priceMax: 900,
    categories: ['Womenswear', 'Menswear', 'Resortwear'],
    fabricCapabilities: ['Cotton Jersey', 'Rayon', 'Satin', 'Poly Crepe'],
    processCapabilities: ['Knit', 'Digital Print', 'Sublimation', 'Wash / Finish']
  },
  {
    factoryId: 'factory-22',
    displayName: 'Factory 22',
    location: 'Faridabad, Delhi NCR',
    monthlyCapacity: 160000,
    availableCapacity: 29000,
    minimumOrderValue: 140000,
    maximumOrderValue: 4200000,
    minimumOrderQuantity: 250,
    leadTimeMin: 30,
    leadTimeMax: 45,
    priceMin: 370,
    priceMax: 980,
    categories: ['Menswear', 'Womenswear', 'Essential Basics'],
    fabricCapabilities: ['Cotton Jersey', 'Poplin', 'Slub Jersey'],
    processCapabilities: ['Knit', 'Screen Print', 'Wash / Finish', 'Bio Wash']
  },
  {
    factoryId: 'factory-23',
    displayName: 'Factory 23',
    location: 'Okhla, Delhi NCR',
    monthlyCapacity: 290000,
    availableCapacity: 58000,
    minimumOrderValue: 220000,
    maximumOrderValue: 7800000,
    minimumOrderQuantity: 400,
    leadTimeMin: 30,
    leadTimeMax: 44,
    priceMin: 390,
    priceMax: 1020,
    categories: ['Menswear', 'Womenswear', 'Streetwear', 'T-Shirts & Polos'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'French Terry', 'Pique Knit'],
    processCapabilities: ['Knit', 'Digital Print', 'Screen Print', 'Embroidery', 'Garment Dye / Wash']
  },
  {
    factoryId: 'factory-24',
    displayName: 'Factory 28',
    location: 'Manesar, Delhi NCR',
    monthlyCapacity: 150000,
    availableCapacity: 32000,
    minimumOrderValue: 180000,
    maximumOrderValue: 6000000,
    minimumOrderQuantity: 300,
    leadTimeMin: 35,
    leadTimeMax: 45,
    priceMin: 430,
    priceMax: 1250,
    categories: ['Menswear', 'Womenswear', 'Urban Streetwear', 'Loungewear'],
    fabricCapabilities: ['Cotton Jersey', 'Heavyweight Knit', 'French Terry'],
    processCapabilities: ['Knit', 'Screen Print', 'Embroidery', 'Wash / Finish']
  }
];

// ─── FACTORY FIT ENGINE CALCULATION ──────────────────────────────────────────
export function calculateFactoryFit(input: AssortmentInput): FactoryFitResult {
  const budget = Math.max(100000, input.collectionBudget);
  const cost = Math.max(100, input.landedCostPerUnit);
  const depth = Math.max(10, input.depthPerOption);
  const options = Math.max(1, input.optionCount || Math.floor(budget / (cost * depth)));
  const totalUnits = options * depth;
  const productionValue = totalUnits * cost;
  const prodWindow = input.productionWindowDays || 45;
  const targetCategory = input.category || 'Menswear';

  const defaultFabrics = input.fabricRequirements || [
    { name: 'Cotton Jersey', options: Math.max(1, Math.round(options * 0.44)) },
    { name: 'Heavyweight Knit', options: Math.max(1, Math.round(options * 0.17)) }
  ];

  const defaultPrints = input.printRequirements || [
    { name: 'Digital Print', options: Math.max(1, Math.round(options * 0.39)) },
    { name: 'Screen Print', options: Math.max(1, Math.round(options * 0.33)) }
  ];

  const defaultFinishes = input.finishRequirements || [
    { name: 'Embroidery', options: Math.max(1, Math.round(options * 0.22)) },
    { name: 'Garment Dye / Wash', options: Math.max(1, Math.round(options * 0.17)) }
  ];

  const allReqs = [...defaultFabrics, ...defaultPrints, ...defaultFinishes];
  const totalReqOptions = allReqs.reduce((sum, r) => sum + r.options, 0) || 1;

  // STEP 1 — HARD FILTER
  const eligible = VETTED_FACTORIES.filter((factory) => {
    // 1. Available capacity >= total units
    if (factory.availableCapacity < totalUnits) return false;
    // 2. Production value >= minimumOrderValue
    if (productionValue < factory.minimumOrderValue) return false;
    // 3. Production value <= maximumOrderValue
    if (productionValue > factory.maximumOrderValue) return false;
    // 4. Category supported
    const catMatch = factory.categories.some(
      (c) => c.toLowerCase() === targetCategory.toLowerCase() || c.toLowerCase().includes('knit') || c.toLowerCase().includes('wear')
    );
    if (!catMatch) return false;
    // 5. Critical process support (must have Knit or core capability)
    if (!factory.processCapabilities.includes('Knit')) return false;
    // 6. Lead time tolerance (+20 days max)
    if (factory.leadTimeMax > prodWindow + 20) return false;

    return true;
  });

  // STEP 2 to 7 — SCORING
  const scoredFactories: FactoryScoreDetail[] = eligible.map((factory) => {
    // Step 3 — Weighted Capability Score
    let matchedOptionPoints = 0;
    allReqs.forEach((req) => {
      const hasFabric = factory.fabricCapabilities.some((f) => f.toLowerCase() === req.name.toLowerCase() || f.toLowerCase().includes('jersey') && req.name.toLowerCase().includes('jersey'));
      const hasProcess = factory.processCapabilities.some((p) => p.toLowerCase() === req.name.toLowerCase() || (req.name.includes('Wash') && p.includes('Wash')));
      if (hasFabric || hasProcess) {
        matchedOptionPoints += req.options;
      }
    });
    const capabilityScore = Math.min(100, Math.round((matchedOptionPoints / totalReqOptions) * 100));

    // Step 4 — Capacity Score
    const ratio = factory.availableCapacity / totalUnits;
    let capacityScore = 70;
    if (ratio >= 5.0) capacityScore = 100;
    else if (ratio >= 3.0) capacityScore = 95;
    else if (ratio >= 2.0) capacityScore = 90;
    else if (ratio >= 1.5) capacityScore = 80;
    else if (ratio >= 1.0) capacityScore = 70;

    // Step 5 — Cost Fit
    let costScore = 30;
    if (cost >= factory.priceMin && cost <= factory.priceMax) {
      costScore = 100;
    } else {
      const lowerDiff = factory.priceMin > cost ? (factory.priceMin - cost) / factory.priceMin : 0;
      const upperDiff = cost > factory.priceMax ? (cost - factory.priceMax) / factory.priceMax : 0;
      const dev = Math.max(lowerDiff, upperDiff);
      if (dev <= 0.10) costScore = 85;
      else if (dev <= 0.20) costScore = 65;
      else costScore = 30;
    }

    // Step 6 — MOQ Fit
    let moqScore = 40;
    if (depth >= factory.minimumOrderQuantity) {
      moqScore = 100;
    } else if (depth >= factory.minimumOrderQuantity * 0.75) {
      moqScore = 85;
    } else if (depth >= factory.minimumOrderQuantity * 0.50) {
      moqScore = 65;
    } else {
      moqScore = 40;
    }

    // Step 7 — Lead Time Fit
    let leadTimeScore = 30;
    if (factory.leadTimeMax <= prodWindow) {
      leadTimeScore = 100;
    } else if (factory.leadTimeMax <= prodWindow + 10) {
      leadTimeScore = 75;
    } else if (factory.leadTimeMax <= prodWindow + 20) {
      leadTimeScore = 50;
    }

    // Category Fit
    const categoryScore = factory.categories.includes(targetCategory) ? 100 : 85;

    // STEP 2 — Overall Factory Score formula
    const overallScore = Math.round(
      capabilityScore * 0.25 +
      capacityScore * 0.20 +
      costScore * 0.20 +
      leadTimeScore * 0.15 +
      moqScore * 0.10 +
      categoryScore * 0.10
    );

    return {
      factory,
      overallScore: Math.min(100, Math.max(40, overallScore)),
      capabilityScore,
      capacityScore,
      costScore,
      leadTimeScore,
      moqScore,
      categoryScore
    };
  });

  // STEP 9 — SORTING: score descending, factoryId ascending as secondary sort
  scoredFactories.sort((a, b) => {
    if (b.overallScore !== a.overallScore) {
      return b.overallScore - a.overallScore;
    }
    return a.factory.factoryId.localeCompare(b.factory.factoryId);
  });

  // STEP 8 — DYNAMIC DISPLAY COUNT
  const SMALL_ORDER_THRESHOLD = 500000; // ₹5 Lakhs
  const maxDisplay = productionValue < SMALL_ORDER_THRESHOLD ? 3 : 5;
  const displayedFactories = scoredFactories.slice(0, maxDisplay);

  // STEP 10 — PRODUCTION READINESS (Collection-Level Score)
  const avgCapability = scoredFactories.length ? Math.round(scoredFactories.reduce((s, f) => s + f.capabilityScore, 0) / scoredFactories.length) : 50;
  const avgCapacity = scoredFactories.length ? Math.round(scoredFactories.reduce((s, f) => s + f.capacityScore, 0) / scoredFactories.length) : 50;
  const avgBudget = scoredFactories.length ? Math.round(scoredFactories.reduce((s, f) => s + f.costScore, 0) / scoredFactories.length) : 50;
  const avgLeadTime = scoredFactories.length ? Math.round(scoredFactories.reduce((s, f) => s + f.leadTimeScore, 0) / scoredFactories.length) : 50;
  const avgMoq = scoredFactories.length ? Math.round(scoredFactories.reduce((s, f) => s + f.moqScore, 0) / scoredFactories.length) : 50;

  const rawProductionReadiness = Math.round(
    avgCapability * 0.30 +
    avgCapacity * 0.25 +
    avgBudget * 0.20 +
    avgLeadTime * 0.15 +
    avgMoq * 0.10
  );

  const productionReadiness = eligible.length === 0 ? 0 : Math.min(99, Math.max(45, rawProductionReadiness));

  let fitLabel: 'HIGH FIT' | 'GOOD FIT' | 'MODERATE FIT' | 'LIMITED FIT' = 'LIMITED FIT';
  if (productionReadiness >= 90) fitLabel = 'HIGH FIT';
  else if (productionReadiness >= 75) fitLabel = 'GOOD FIT';
  else if (productionReadiness >= 60) fitLabel = 'MODERATE FIT';

  // STEP 11 — CAPABILITY COVERAGE TABLE
  const capabilityRows: { name: string; need: string; isPrintOrFinish?: boolean }[] = [
    { name: 'Cotton Jersey', need: `${Math.max(1, Math.round(options * 0.44))} options` },
    { name: 'Heavyweight Knit', need: `${Math.max(1, Math.round(options * 0.17))} options` },
    { name: 'Digital Print', need: `${Math.max(1, Math.round(options * 0.39))} options`, isPrintOrFinish: true },
    { name: 'Screen Print', need: `${Math.max(1, Math.round(options * 0.33))} options`, isPrintOrFinish: true },
    { name: 'Embroidery', need: `${Math.max(1, Math.round(options * 0.22))} options`, isPrintOrFinish: true },
    { name: 'Garment Dye / Wash', need: `${Math.max(1, Math.round(options * 0.17))} options`, isPrintOrFinish: true }
  ];

  const capabilityCoverage: CapabilityCoverageItem[] = capabilityRows.map((item) => {
    const matchingFactories = VETTED_FACTORIES.filter((f) => {
      const hasCap = f.fabricCapabilities.some((c) => c.toLowerCase() === item.name.toLowerCase() || (item.name.includes('Jersey') && c.includes('Jersey'))) ||
        f.processCapabilities.some((c) => c.toLowerCase() === item.name.toLowerCase() || (item.name.includes('Wash') && c.includes('Wash')));
      return hasCap && f.availableCapacity >= (totalUnits * 0.4);
    });

    const count = matchingFactories.length;
    const coveragePct = Math.min(100, Math.round((count / VETTED_FACTORIES.length) * 100));

    let minLead = 30;
    let maxLead = 45;
    if (matchingFactories.length > 0) {
      minLead = Math.min(...matchingFactories.map(f => f.leadTimeMin));
      maxLead = Math.max(...matchingFactories.map(f => f.leadTimeMax));
    }

    return {
      requirement: item.name,
      collectionNeed: item.need,
      matchedFactories: count,
      coveragePercentage: coveragePct,
      leadTimeRange: `${minLead} – ${maxLead} days`
    };
  });

  // STEP 12 — DATA INSIGHTS
  // Options that fit within planned depth
  const optionsWithinPlannedDepth = options;
  // Factories that meet the 45-day window
  const factoriesMeetingProductionWindow = VETTED_FACTORIES.filter(f => f.leadTimeMax <= prodWindow).length;
  // Factories supporting required print method (Digital Print or Screen Print)
  const factoriesSupportingRequiredPrint = VETTED_FACTORIES.filter(f =>
    f.processCapabilities.includes('Digital Print') || f.processCapabilities.includes('Screen Print')
  ).length;
  // Factories having available capacity for this totalUnits
  const factoriesWithAvailableCapacity = VETTED_FACTORIES.filter(f => f.availableCapacity >= totalUnits).length;

  return {
    totalUnits,
    productionValue,
    productionReadiness,
    fitLabel,
    metrics: {
      capacityFit: avgCapacity,
      leadTime: avgLeadTime,
      fabricCapability: avgCapability,
      printFinish: Math.round((avgCapability + avgBudget) / 2),
      moqFit: avgMoq
    },
    totalVettedCount: VETTED_FACTORIES.length,
    eligibleCount: eligible.length,
    displayedFactories,
    capabilityCoverage,
    dataInsights: {
      optionsWithinPlannedDepth,
      factoriesMeetingProductionWindow,
      factoriesSupportingRequiredPrint,
      factoriesWithAvailableCapacity
    }
  };
}
