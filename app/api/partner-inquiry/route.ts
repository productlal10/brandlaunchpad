import { NextRequest, NextResponse } from 'next/server';
import { savePartnerInquiry, getPartnerInquiries } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { partnerService, fullName, email, phone, brandName, projectBrief } = body;

    if (!fullName || !email || !brandName || !partnerService) {
      return NextResponse.json(
        { success: false, error: 'Partner service, name, email, and brand name are required.' },
        { status: 400 }
      );
    }

    const newInquiry = await savePartnerInquiry({
      partnerService: String(partnerService).trim(),
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      brandName: String(brandName).trim(),
      projectBrief: String(projectBrief || '').trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Partner inquiry sent to the Lal10 partner coordinator.',
      inquiry: newInquiry,
    });
  } catch (error: any) {
    console.error('Partner Inquiry API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error submitting partner inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await getPartnerInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve partner inquiries.' }, { status: 500 });
  }
}
