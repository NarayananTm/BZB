import { NextRequest } from 'next/server';
import { getTopup, patchTopup } from '@/controllers/topupController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getTopup(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => patchTopup(req, params.id);
