import { NextRequest } from 'next/server';
import { registerAdmin } from '@/controllers/authController';

export const POST = (request: NextRequest) => registerAdmin(request);