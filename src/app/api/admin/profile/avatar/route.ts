import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberProfile, updateMemberAvatar } from '@/lib/postgres';

export async function POST(request: NextRequest) {
  if (!getAdminFromRequest(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const profile = await getMemberProfile();
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