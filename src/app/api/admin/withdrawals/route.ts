import { NextRequest } from 'next/server';
import { listWithdrawals, addWithdrawal } from '@/controllers/withdrawalController';

export const GET  = (req: NextRequest) => listWithdrawals(req);
export const POST = (req: NextRequest) => addWithdrawal(req);
