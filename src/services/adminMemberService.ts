import { adminMembers, AdminMember } from '@/data/admin/members';
import { readCollection } from '@/lib/db';

export function getAdminMembers(): Promise<AdminMember[]> {
  return readCollection('admin_members', adminMembers);
}

export async function getAdminMemberById(id: string): Promise<AdminMember | undefined> {
  const members = await getAdminMembers();
  return members.find((member) => member.id === id);
}
