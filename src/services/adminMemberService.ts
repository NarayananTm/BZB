import { adminMembers, AdminMember } from '@/data/admin/members';

export function getAdminMembers(): Promise<AdminMember[]> {
  return Promise.resolve(adminMembers);
}

export function getAdminMemberById(id: string): Promise<AdminMember | undefined> {
  return Promise.resolve(adminMembers.find((member) => member.id === id));
}
