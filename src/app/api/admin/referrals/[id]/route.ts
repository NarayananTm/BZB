import { NextRequest } from 'next/server';
import { getReferral, updateStatus } from '@/controllers/referralController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getReferral(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => updateStatus(req, params.id);

