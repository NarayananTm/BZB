export interface AdminLevel {
  id: string;
  name: string;
  requiredReferrals: number;
  reward: string;
  members: number;
  completion: number;
  status: 'Active' | 'Inactive';
  description: string;
}

export const adminLevels: AdminLevel[] = [
  {
    id: 'level-1',
    name: 'Level 1',
    requiredReferrals: 3,
    reward: 'Bike Reward',
    members: 1240,
    completion: 85,
    status: 'Active',
    description: 'Complete 3 direct referrals to unlock the Level 1 reward package.',
  },
  {
    id: 'level-2',
    name: 'Level 2',
    requiredReferrals: 5,
    reward: 'Car Reward',
    members: 620,
    completion: 62,
    status: 'Active',
    description: 'Reach Level 2 by completing 5 direct referrals and maintaining active status.',
  },
  {
    id: 'level-3',
    name: 'Level 3',
    requiredReferrals: 8,
    reward: 'Luxury House Reward',
    members: 320,
    completion: 42,
    status: 'Active',
    description: 'Meet the Level 3 criteria for premium reward eligibility.',
  },
];
