import { NextRequest, NextResponse } from 'next/server';
import { proxyToExternalApi } from '@/lib/externalApi';

export async function POST(req: NextRequest) {
  try {
    const proxiedResponse = await proxyToExternalApi(req, 'EXTERNAL_AUTH_LOGOUT_URL', '/api/launchpad/auth/logout');
    if (proxiedResponse) {
      return proxiedResponse;
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully.',
    });

    response.cookies.set('lal10_auth_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to log out.' },
      { status: 500 }
    );
  }
}
