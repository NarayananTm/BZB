-- Update referral milestones to the current business rules.
UPDATE levels SET required_referrals = 5,
  description = 'Complete 5 direct referrals to unlock the Level 1 reward package.'
WHERE id = 'level-1';

UPDATE levels SET required_referrals = 50,
  description = 'Reach Level 2 by completing 50 direct referrals and maintaining active status.'
WHERE id = 'level-2';

UPDATE levels SET required_referrals = 125,
  description = 'Meet the Level 3 criteria for premium reward eligibility.'
WHERE id = 'level-3';