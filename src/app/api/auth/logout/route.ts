import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteSession } from '@/lib/db';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (token) {
    deleteSession(token);
    cookieStore.delete('session_token');
  }

  return NextResponse.json({ success: true, message: 'Logged out' });
}
