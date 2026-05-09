import { NextRequest, NextResponse } from 'next/server';
import { insertFarmer, insertOfficer, insertAuthority, getFarmerByPhone, getOfficerByOfficerId, getAuthorityByPhone } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const userType = formData.get('userType') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const documentFile = formData.get('document') as File | null;
    
    if (!name || !password || !userType) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    let documentPath = null;
    
    if (documentFile && documentFile.size > 0) {
      const bytes = await documentFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), 'public', 'documents', userType + 's');
      await fs.mkdir(uploadDir, { recursive: true });
      
      const filename = `${Date.now()}-${documentFile.name.replace(/[^a-zA-Z0-9.]/g, '') || 'doc.pdf'}`;
      const filepath = path.join(uploadDir, filename);
      
      await fs.writeFile(filepath, buffer);
      documentPath = `/documents/${userType}s/${filename}`;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (userType === 'farmer') {
      const phone = formData.get('phone') as string;
      if (!phone) return NextResponse.json({ success: false, error: 'Phone is required' }, { status: 400 });
      
      if (await getFarmerByPhone(phone)) {
        return NextResponse.json({ success: false, error: 'Phone number already registered' }, { status: 400 });
      }
      
      await insertFarmer({ name, phone, passwordHash, documentPath });
      
    } else if (userType === 'officer') {
      const officerId = formData.get('officerId') as string;
      const department = formData.get('department') as string;
      if (!officerId || !department) return NextResponse.json({ success: false, error: 'Officer ID and Department required' }, { status: 400 });
      
      if (await getOfficerByOfficerId(officerId)) {
        return NextResponse.json({ success: false, error: 'Officer ID already registered' }, { status: 400 });
      }
      
      await insertOfficer({ name, officerId, passwordHash, department, documentPath, isVerified: 1 });
    } else if (userType === 'authority') {
      const phone = formData.get('phone') as string;
      const department = formData.get('department') as string;
      if (!phone || !department) return NextResponse.json({ success: false, error: 'Phone and Department required' }, { status: 400 });
      
      if (await getAuthorityByPhone(phone)) {
        return NextResponse.json({ success: false, error: 'Phone number already registered' }, { status: 400 });
      }
      
      await insertAuthority({ name, phone, passwordHash, department });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid userType' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Registration successful' });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
