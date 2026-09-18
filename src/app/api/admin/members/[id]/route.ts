import { NextRequest } from 'next/server';
import { getMember, editMember, removeMember } from '@/controllers/memberController';

type Params = { params: { id: string } };

export const GET    = (req: NextRequest, { params }: Params) => getMember(req, params.id);
export const PATCH  = (req: NextRequest, { params }: Params) => editMember(req, params.id);
export const DELETE = (req: NextRequest, { params }: Params) => removeMember(req, params.id);

