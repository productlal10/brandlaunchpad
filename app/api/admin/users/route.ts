import { NextRequest, NextResponse } from 'next/server';
import { getAdminUsers, saveAdminUser } from '@/lib/storage';

export async function GET() {
  try {
    const users = await getAdminUsers();
    const safeUsers = users.map(({ password, ...u }) => u);
    return NextResponse.json({ success: true, count: safeUsers.length, users: safeUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve team users.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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
