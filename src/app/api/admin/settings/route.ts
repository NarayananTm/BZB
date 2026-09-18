import { NextRequest } from 'next/server';
import { listSettings, saveSettings } from '@/controllers/settingController';

export const GET = (req: NextRequest) => listSettings(req);
export const PUT = (req: NextRequest) => saveSettings(req);
