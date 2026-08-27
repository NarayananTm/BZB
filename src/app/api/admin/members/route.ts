import { NextRequest } from 'next/server';
import { listMembers, addMember } from '@/controllers/memberController';

export const GET  = (req: NextRequest) => listMembers(req);
export const POST = (req: NextRequest) => addMember(req);
