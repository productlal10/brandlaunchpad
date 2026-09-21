import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/adminAuth';
import { getAdminUsers, saveAdminUser } from '@/lib/storage';
import { proxyToExternalApi } from '@/lib/externalApi';

export async function GET(req: NextRequest) {
  try {
    const proxiedResponse = await proxyToExternalApi(
      req,
      'EXTERNAL_ADMIN_USERS_URL',
      '/api/launchpad/users',
      {
        fallbackOnNetworkError: true,
        fallbackOnStatuses: [500, 502, 503, 504],
        timeoutMs: 2500,
      }
    );
    if (proxiedResponse) {
      return proxiedResponse;
    }

    const auth = await requireAuthenticatedAdmin(req);
    if (auth.response) {
      return auth.response;
    }

    const users = await getAdminUsers();
    const safeUsers = users.map(({ password, ...u }) => u);
    return NextResponse.json({ success: true, count: safeUsers.length, users: safeUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve team users.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (process.env.LAUNCHPAD_MANUAL_USER_PROVISIONING === 'true') {
      return NextResponse.json(
        {
          success: false,
          error: 'Launchpad user provisioning is managed manually in ERP right now.',
        },
        { status: 403 }
      );
    }

    const proxiedResponse = await proxyToExternalApi(
      req,
      'EXTERNAL_ADMIN_USERS_URL',
      '/api/launchpad/users',
      {
        fallbackOnNetworkError: true,
        fallbackOnStatuses: [500, 502, 503, 504],
        timeoutMs: 2500,
      }
    );
    if (proxiedResponse) {
      return proxiedResponse;
    }

    const auth = await requireAuthenticatedAdmin(req);
    if (auth.response) {
      return auth.response;
    }

    const body = await req.json();
    const { name, email, role } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required.' }, { status: 400 });
    }

    const emailStr = String(email).trim().toLowerCase();
    const username = emailStr.split('@')[0];

    const newUser = await saveAdminUser({
      username,
      name: String(name).trim(),
      email: emailStr,
      role: role || 'Editor',
    });

    const { password: _, ...safeUser } = newUser;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to save team user.' }, { status: 500 });
  }
}
