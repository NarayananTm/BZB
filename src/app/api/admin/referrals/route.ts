import { NextRequest } from 'next/server';
import { listReferrals, addReferral } from '@/controllers/referralController';

export const GET  = (req: NextRequest) => listReferrals(req);
export const POST = (req: NextRequest) => addReferral(req);
