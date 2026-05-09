import { NextRequest, NextResponse } from 'next/server';
import { getComplaints, insertComplaint, updateComplaintStatus } from '@/lib/db';
import { getUserFromSession } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user || (user.userType !== 'officer' && user.userType !== 'authority')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const complaints = await getComplaints();
    return NextResponse.json({ success: true, data: complaints });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    if (!user || user.userType !== 'farmer') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const issueType = formData.get('issueType') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string | null;
    const imageFile = formData.get('image') as File | null;
    const videoFile = formData.get('video') as File | null;
    
    if (!issueType || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    let imagePath = null;
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(publicUploadsDir, { recursive: true });
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '') || 'image.jpg'}`;
      const filepath = path.join(publicUploadsDir, filename);
      
      await fs.writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    let videoPath = null;
    
    if (videoFile && videoFile.size > 0) {
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(publicUploadsDir, { recursive: true });
      
      const filename = `${Date.now()}-${videoFile.name.replace(/[^a-zA-Z0-9.]/g, '') || 'video.webm'}`;
      const filepath = path.join(publicUploadsDir, filename);
      
      await fs.writeFile(filepath, buffer);
      videoPath = `/uploads/${filename}`;
    }

    const complaintId = await insertComplaint({
      farmerId: user.id!,
      issueType,
      description,
      imagePath,
      videoPath,
      location: location || undefined,
      status: 'Pending'
    });

    return NextResponse.json({ success: true, data: { id: complaintId.toString() } });
  } catch (error: any) {
    console.error('Error creating complaint:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    if (!user || user.userType !== 'officer') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    await updateComplaintStatus(id, status);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
