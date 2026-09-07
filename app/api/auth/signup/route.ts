import { NextRequest, NextResponse } from 'next/server';
import { saveAdminUser, findAdminUser } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Full name, work email, and password are required.' },
        { status: 400 }
      );
    }

    const emailStr = String(email).trim().toLowerCase();
    const username = emailStr.split('@')[0];

    const existing = await findAdminUser(emailStr);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email or username already exists.' },
        { status: 409 }
      );
    }

    const newUser = await saveAdminUser({
      username,
      name: String(name).trim(),
      email: emailStr,
      password: String(password).trim(),
      role: role || 'Editor',
    });

    const { password: _, ...safeProfile } = newUser;

    const response = NextResponse.json({
      success: true,
      user: safeProfile,
      message: 'Account created successfully!',
    });

    response.cookies.set('lal10_auth_session', JSON.stringify(safeProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Sign Up API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error creating account.' },
      { status: 500 }
    );
  }
}
