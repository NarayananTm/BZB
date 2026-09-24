import { NextRequest } from 'next/server';
import { listReferrals } from '@/controllers/referralController';

export const GET = (request: NextRequest) => listReferrals(request);