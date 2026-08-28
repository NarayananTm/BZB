import { NextRequest } from 'next/server';
import { getEarning, patchEarning } from '@/controllers/earningController';

type Params = { params: { id: string } };

export const GET   = (req: NextRequest, { params }: Params) => getEarning(req, params.id);
export const PATCH = (req: NextRequest, { params }: Params) => patchEarning(req, params.id);
