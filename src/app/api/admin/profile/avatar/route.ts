import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberProfile, updateMemberAvatar, getPool } from '@/lib/postgres';

export async function POST(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const memberId = String(admin.id);
    let profile = await getMemberProfile(memberId);
    
    // Create member record if it doesn't exist
    if (!profile) {
      await getPool().query(
        `INSERT INTO members (id, email, name, mobile, level_id, level_name, status, joining_date) 
         VALUES ($1, $2, $3, $4, 'level-1', 'Level 1', 'Active', CURRENT_DATE)`,
        [memberId, admin.email, admin.name || '', admin.mobile || '']
      );
      profile = await getMemberProfile(memberId);
    }
    
    const file = (await request.formData()).get('file');
    if (!profile || !(file instanceof File)) return NextResponse.json({ success: false, message: 'Profile and image are required' }, { status: 400 });
    if (!file.type.startsWith('image/')) return NextResponse.json({ success: false, message: 'Only image files are allowed' }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ success: false, message: 'Image must be smaller than 5MB' }, { status: 400 });
    const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'jpg';
    const directory = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(directory, { recursive: true });
    const filename = `${profile.id}-${randomUUID()}.${extension}`;
    await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ success: true, profile: await updateMemberAvatar(profile.id, `/uploads/${filename}`) });
  } catch (error) {
    console.error('[admin/profile/avatar]', error);
    return NextResponse.json({ success: false, message: 'Unable to upload image' }, { status: 500 });
  }
}