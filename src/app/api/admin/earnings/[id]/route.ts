import { NextRequest } from 'next/server';
import { getEarning, patchEarning } from '@/controllers/earningController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getEarning(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => patchEarning(req, params.id);

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const earning = await getEarningById(params.id);
    if (!earning) return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: earning });
  } catch (error) {
    console.error('Get earning error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch earning' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const earning = await updateEarningStatus(params.id, status);
    if (!earning) return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: earning });
  } catch (error) {
    console.error('Update earning error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update earning' }, { status: 500 });
  }
}
