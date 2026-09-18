import { NextRequest } from 'next/server';
import { getLevel, editLevel, removeLevel } from '@/controllers/levelController';

type Params = { params: { id: string } };

export const GET    = (req: NextRequest, { params }: Params) => getLevel(req, params.id);
export const PATCH  = (req: NextRequest, { params }: Params) => editLevel(req, params.id);
export const DELETE = (req: NextRequest, { params }: Params) => removeLevel(req, params.id);
