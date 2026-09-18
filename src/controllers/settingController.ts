import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllSettings, upsertManySettings } from '@/services/settingService';

export async function listSettings(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const settings = await getAllSettings();
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    return NextResponse.json({ success: true, data: map });
  } catch (err) {
    console.error('[settingController.listSettings]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function saveSettings(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json() as Record<string, string>;
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, message: 'Body must be a key-value object' }, { status: 400 });
    }
    await upsertManySettings(body);
    return NextResponse.json({ success: true, message: 'Settings saved' });
  } catch (err) {
    console.error('[settingController.saveSettings]', err);
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 });
  }
}
