import { NextRequest } from 'next/server';
import { getWithdrawal, processWithdrawal } from '@/controllers/withdrawalController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getWithdrawal(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => processWithdrawal(req, params.id);

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const w = await getWithdrawalById(params.id);
    if (!w) return NextResponse.json({ success: false, message: 'Withdrawal not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: w });
  } catch (error) {
    console.error('Get withdrawal error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch withdrawal' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { admin, error } = requireAdmin(request);
  if (error) return error;

  try {
    const { action, remarks } = await request.json();
    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, message: 'action must be approve or reject' }, { status: 400 });
    }

    const w =
      action === 'approve'
        ? await approveWithdrawal(params.id, remarks)
        : await rejectWithdrawal(params.id, remarks);

    if (!w) return NextResponse.json({ success: false, message: 'Withdrawal not found' }, { status: 404 });

    await createAuditLog({
      id: generateAuditId(),
      user_name: admin!.name,
      action: `${action === 'approve' ? 'Approved' : 'Rejected'} withdrawal request`,
      target: params.id,
      status: 'Success',
    });

    return NextResponse.json({ success: true, data: w });
  } catch (error) {
    console.error('Update withdrawal error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update withdrawal' }, { status: 500 });
  }
}
