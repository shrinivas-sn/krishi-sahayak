import { NextRequest, NextResponse } from 'next/server';
import { getFarmerByPhone, getOfficerByOfficerId, getAuthorityByPhone, createSession } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userType, identifier, password } = body;
    
    if (!userType || !identifier || !password) {
      return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 400 });
    }

    let user;
    
    if (userType === 'farmer') {
      user = await getFarmerByPhone(identifier);
    } else if (userType === 'officer') {
      user = await getOfficerByOfficerId(identifier);
    } else if (userType === 'authority') {
      user = await getAuthorityByPhone(identifier);
    } else {
      return NextResponse.json({ success: false, error: 'Invalid userType' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    await createSession({
      token,
      userId: user.id!,
      userType: userType as 'farmer' | 'officer' | 'authority',
      expiresAt
    });

    const response = NextResponse.json({ success: true, message: 'Logged in successfully', userType });
    
    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
