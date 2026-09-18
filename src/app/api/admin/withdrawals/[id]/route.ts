import { NextRequest } from 'next/server';
import { getWithdrawal, processWithdrawal } from '@/controllers/withdrawalController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getWithdrawal(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => processWithdrawal(req, params.id);
