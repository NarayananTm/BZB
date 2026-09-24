import { NextRequest } from 'next/server';
import { updateStatus } from '@/controllers/referralController';

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  return updateStatus(request, context.params.id);
}