import { NextRequest, NextResponse } from 'next/server';
import { saveDiscoveryLead, getDiscoveryLeads, updateLeadStatus } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, brandName, category, stage, budget, preferredDate, preferredTimeSlot, notes, trackInterest } = body;

    // Basic Validation
    if (!fullName || !email || !brandName) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and brand name are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const newLead = await saveDiscoveryLead({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      brandName: String(brandName).trim(),
      category: category || 'Womenswear',
      stage: stage || 'Concept & Moodboard',
      budget: budget || '₹15L – ₹35L ($18k – $42k)',
      preferredDate: preferredDate || '',
      preferredTimeSlot: preferredTimeSlot || 'Morning (10:00 AM - 1:00 PM IST)',
      notes: notes || '',
      trackInterest: trackInterest || 'Launch Sprint',
    });

    return NextResponse.json({
      success: true,
      message: 'Discovery call request received. Our advisory team will reach out within 24 hours.',
      lead: newLead,
    });
  } catch (error: any) {
    console.error('Discovery Call API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing request.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const leads = await getDiscoveryLeads();
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error: any) {
    console.error('Discovery Call GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve leads.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Lead ID and status required.' }, { status: 400 });
    }

    const updated = await updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
