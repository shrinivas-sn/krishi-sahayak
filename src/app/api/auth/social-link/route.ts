import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, updateFarmerSocials } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const session = getSession(token);
    if (!session || session.userType !== 'farmer') {
      return NextResponse.json({ success: false, error: 'Not authorized as farmer' }, { status: 403 });
    }

    const body = await request.json();
    const { twitterUsername, twitterPassword, facebookUsername, facebookPassword } = body;

    updateFarmerSocials(session.userId, twitterUsername, twitterPassword, facebookUsername, facebookPassword);

    return NextResponse.json({ success: true, message: 'Social media credentials linked successfully.' });
  } catch (error: any) {
    console.error('Social link error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
