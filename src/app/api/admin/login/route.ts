import { NextRequest } from 'next/server';
import { login } from '@/controllers/authController';

export const POST = (req: NextRequest) => login(req);
