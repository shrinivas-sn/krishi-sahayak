import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getComplaintsByFarmer } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const session = await getSession(token);
    if (!session || session.userType !== 'farmer') {
      return NextResponse.json({ success: false, error: 'Not authorized as farmer' }, { status: 403 });
    }

    const complaints = await getComplaintsByFarmer(session.userId);
    return NextResponse.json({ success: true, data: complaints });
  } catch (error: any) {
    console.error('Fetch complaints error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
