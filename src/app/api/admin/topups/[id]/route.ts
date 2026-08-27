import { NextRequest } from 'next/server';
import { getTopup, patchTopup } from '@/controllers/topupController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getTopup(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => patchTopup(req, params.id);

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const topup = await getTopupById(params.id);
    if (!topup) return NextResponse.json({ success: false, message: 'Topup not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: topup });
  } catch (error) {
    console.error('Get topup error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch topup' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const topup = await updateTopupStatus(params.id, status);
    if (!topup) return NextResponse.json({ success: false, message: 'Topup not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: topup });
  } catch (error) {
    console.error('Update topup error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update topup' }, { status: 500 });
  }
}
