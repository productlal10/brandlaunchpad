import { NextRequest, NextResponse } from 'next/server';
import { findAdminUser } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('lal10_auth_session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const parsed = JSON.parse(sessionCookie);
    if (!parsed || !parsed.username) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const liveUser = await findAdminUser(parsed.username);
    if (!liveUser) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const { password: _, ...safeProfile } = liveUser;

    return NextResponse.json({
      success: true,
      user: safeProfile,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }
}
