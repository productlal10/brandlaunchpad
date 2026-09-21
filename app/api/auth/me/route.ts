import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/adminAuth';
import { proxyToExternalApi } from '@/lib/externalApi';

export async function GET(req: NextRequest) {
  try {
    const proxiedResponse = await proxyToExternalApi(
      req,
      'EXTERNAL_AUTH_ME_URL',
      '/api/launchpad/auth/session',
      {
        fallbackOnNetworkError: true,
        fallbackOnStatuses: [500, 502, 503, 504],
        timeoutMs: 2000,
      }
    );
    if (proxiedResponse) {
      return proxiedResponse;
    }

    const liveUser = await getAuthenticatedAdmin(req);
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
