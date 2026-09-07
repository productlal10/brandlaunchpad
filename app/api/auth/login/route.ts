import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const user = await verifyAdminCredentials(String(username), String(password));

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password. Please verify credentials.' },
        { status: 401 }
      );
    }

    // Strip password from returned profile
    const { password: _, ...safeProfile } = user;

    const response = NextResponse.json({
      success: true,
      user: safeProfile,
      message: `Welcome back, ${user.name}!`,
    });

    // Set secure HTTP-only session cookie
    response.cookies.set('lal10_auth_session', JSON.stringify(safeProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Auth Login API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server login error.' },
      { status: 500 }
    );
  }
}
