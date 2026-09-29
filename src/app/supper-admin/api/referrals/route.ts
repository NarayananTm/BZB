import { NextRequest } from 'next/server';
import { listSuperAdminReferralDirectory } from '@/controllers/referralController';

export const GET = (request: NextRequest) => listSuperAdminReferralDirectory(request);