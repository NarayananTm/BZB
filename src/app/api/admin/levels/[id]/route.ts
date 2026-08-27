import { NextRequest } from 'next/server';
import { getLevel, editLevel, removeLevel } from '@/controllers/levelController';

type Params = { params: { id: string } };

export const GET    = (req: NextRequest, { params }: Params) => getLevel(req, params.id);
export const PATCH  = (req: NextRequest, { params }: Params) => editLevel(req, params.id);
export const DELETE = (req: NextRequest, { params }: Params) => removeLevel(req, params.id);

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const level = await getLevelById(params.id);
    if (!level) return NextResponse.json({ success: false, message: 'Level not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: level });
  } catch (error) {
    console.error('Get level error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch level' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const level = await updateLevel(params.id, body);
    if (!level) return NextResponse.json({ success: false, message: 'Level not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: level });
  } catch (error) {
    console.error('Update level error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update level' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const deleted = await deleteLevel(params.id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Level not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Level deleted' });
  } catch (error) {
    console.error('Delete level error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete level' }, { status: 500 });
  }
}
