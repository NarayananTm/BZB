import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberDocuments, getMemberProfile, saveMemberDocument } from '@/lib/postgres';

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  const profile = await getMemberProfile(admin.email);
  return NextResponse.json({ success: true, documents: profile ? await getMemberDocuments(profile.id) : [] });
}

export async function POST(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const documentType = formData.get('documentType');
    const profile = await getMemberProfile(admin.email);
    if (!profile || !(file instanceof File) || typeof documentType !== 'string' || !documentType) return NextResponse.json({ success: false, message: 'Document type and file are required' }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ success: false, message: 'File must be smaller than 5MB' }, { status: 400 });
    const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'bin';
    const directory = path.join(process.cwd(), 'public', 'uploads', 'kyc');
    await mkdir(directory, { recursive: true });
    const filename = `${profile.id}-${randomUUID()}.${extension}`;
    await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
    const document = await saveMemberDocument(profile.id, documentType, `/uploads/kyc/${filename}`);
    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error('[admin/profile/documents]', error);
    return NextResponse.json({ success: false, message: 'Unable to upload document' }, { status: 500 });
  }
}