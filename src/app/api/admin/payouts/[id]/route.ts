import { NextRequest } from 'next/server';
import { getPayout, patchPayout } from '@/controllers/payoutController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getPayout(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => patchPayout(req, params.id);
