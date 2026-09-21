import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    manualUserProvisioning: process.env.LAUNCHPAD_MANUAL_USER_PROVISIONING === 'true',
  });
}
