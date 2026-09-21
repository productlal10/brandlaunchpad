import { NextRequest, NextResponse } from 'next/server';
import { findAdminUser } from '@/lib/storage';

export async function getAuthenticatedAdmin(req: NextRequest) {
  const sessionCookie = req.cookies.get('lal10_auth_session')?.value;
  if (!sessionCookie) {
    return null;
  }

  try {
    const parsed = JSON.parse(sessionCookie);
    if (!parsed?.username) {
      return null;
    }

    const user = await findAdminUser(String(parsed.username));
    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function requireAuthenticatedAdmin(req: NextRequest) {
  const user = await getAuthenticatedAdmin(req);
  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}
