import { NextRequest } from 'next/server';
import { getPayout, patchPayout } from '@/controllers/payoutController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getPayout(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => patchPayout(req, params.id);

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const payout = await getPayoutById(params.id);
    if (!payout) return NextResponse.json({ success: false, message: 'Payout not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: payout });
  } catch (error) {
    console.error('Get payout error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch payout' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const payout = await updatePayoutStatus(params.id, status);
    if (!payout) return NextResponse.json({ success: false, message: 'Payout not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: payout });
  } catch (error) {
    console.error('Update payout error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update payout' }, { status: 500 });
  }
}
