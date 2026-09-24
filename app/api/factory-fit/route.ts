import { NextRequest, NextResponse } from 'next/server';
import { calculateFactoryFit, VETTED_FACTORIES } from '@/lib/factoryData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = calculateFactoryFit({
      collectionBudget: Number(body.collectionBudget) || 1200000,
      landedCostPerUnit: Number(body.landedCostPerUnit) || 600,
      depthPerOption: Number(body.depthPerOption) || 110,
      optionCount: Number(body.optionCount) || 18,
      category: body.category || 'Menswear',
      productionWindowDays: Number(body.productionWindowDays) || 45
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Calculation error' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    totalVettedFactories: VETTED_FACTORIES.length,
    factories: VETTED_FACTORIES.map(f => ({
      factoryId: f.factoryId,
      displayName: f.displayName,
      location: f.location,
      monthlyCapacity: f.monthlyCapacity,
      availableCapacity: f.availableCapacity,
      minimumOrderQuantity: f.minimumOrderQuantity,
      leadTimeMin: f.leadTimeMin,
      leadTimeMax: f.leadTimeMax,
      processCapabilities: f.processCapabilities
    }))
  });
}
