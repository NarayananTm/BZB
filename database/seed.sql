-- ============================================================
-- BZB Platform - Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- Default admin user  (password: Admin@2025)
-- Hash generated with bcryptjs rounds=10
INSERT INTO admin_users (username, email, password, role) VALUES
  ('admin',      'admin@bzbgroup.com',      '$2b$10$YourHashedPasswordHere1111111111111111111111111111', 'superadmin'),
  ('operations', 'ops@bzbgroup.com',        '$2b$10$YourHashedPasswordHere2222222222222222222222222222', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Levels
INSERT INTO levels (id, name, required_referrals, reward, members_count, completion_pct, status, description) VALUES
  ('level-1', 'Level 1', 3, 'Bike Reward',         1240, 85, 'Active', 'Complete 3 direct referrals to unlock the Level 1 reward package.'),
  ('level-2', 'Level 2', 5, 'Car Reward',           620,  62, 'Active', 'Reach Level 2 by completing 5 direct referrals and maintaining active status.'),
  ('level-3', 'Level 3', 8, 'Luxury House Reward',  320,  42, 'Active', 'Meet the Level 3 criteria for premium reward eligibility.')
ON CONFLICT (id) DO NOTHING;

-- Members
INSERT INTO members (id, name, email, mobile, sponsor_name, level_name, status, joining_date, total_earnings, wallet_balance, referral_count, team_count) VALUES
  ('BZB9827341', 'Mahimai Dass J', 'mahimai@bzbgroup.com',   '6381987654', 'Company',     'Level 3', 'Approved',  '2026-05-18', 28540.00, 9100.00, 32, 64),
  ('BZB9601381', 'Kavi',           'kavi@bzbgroup.com',      '9876543210', 'Mahimai Dass J', 'Level 2', 'Active', '2026-07-01', 12850.00, 2400.00, 18, 30),
  ('BZB9899333', 'Vetrivel N',     'vetrivel@bzbgroup.com',  '6381612345', 'Mahimai Dass J', 'Level 3', 'Active', '2026-06-26', 18760.00, 4010.00, 25, 48),
  ('BZB9635120', 'Priya Srinivasan','priya.s@bzbgroup.com',  '9123456780', 'Kavi',        'Level 1', 'Pending',   '2026-07-15',  1750.00,  880.00,  8, 12),
  ('BZB9700291', 'Rahul Mehta',    'rahul@bzbgroup.com',     '9156782340', 'Vetrivel N',  'Level 2', 'Inactive',  '2026-06-30',  6320.00, 1120.00, 13, 22)
ON CONFLICT (id) DO NOTHING;

-- Referrals
INSERT INTO referrals (id, sponsor_id, sponsor_name, member_name, level_name, join_date, status, reward_amount) VALUES
  ('REF-20260712-001', 'BZB9601381', 'Kavi',           'Nisha Menon',     'Level 1', '2026-07-12', 'Active',   1200.00),
  ('REF-20260630-002', 'BZB9899333', 'Vetrivel N',      'Sanjay Agarwal',  'Level 2', '2026-06-30', 'Approved', 2500.00),
  ('REF-20260705-003', 'BZB9827341', 'Mahimai Dass J',  'Priya Patel',     'Level 3', '2026-07-05', 'Pending',  3500.00),
  ('REF-20260718-004', 'BZB9601381', 'Kavi',            'Anil Kumar',      'Direct',  '2026-07-18', 'Active',    850.00)
ON CONFLICT (id) DO NOTHING;

-- Earnings
INSERT INTO earnings (id, member_id, member_name, source, level_name, amount, earn_date, status) VALUES
  ('EARN-20260719-001', 'BZB9601381', 'Kavi',            'Referral Reward',    'Level 1', 1200.00, '2026-07-19', 'Completed'),
  ('EARN-20260718-002', 'BZB9899333', 'Vetrivel N',      'Top-up Bonus',       'Level 2', 2650.00, '2026-07-18', 'Completed'),
  ('EARN-20260715-003', 'BZB9827341', 'Mahimai Dass J',  'Level Completion',   'Level 3', 4750.00, '2026-07-15', 'Completed'),
  ('EARN-20260714-004', 'BZB9635120', 'Priya Srinivasan','Referral Reward',    'Direct',   650.00, '2026-07-14', 'Pending')
ON CONFLICT (id) DO NOTHING;

-- Topups
INSERT INTO topups (id, member_id, member_name, amount, method, topup_date, status) VALUES
  ('TOP-20260719-001', 'BZB9601381', 'Kavi',            5000.00,  'UPI',           '2026-07-19', 'Completed'),
  ('TOP-20260718-002', 'BZB9899333', 'Vetrivel N',     10000.00,  'Bank Transfer', '2026-07-18', 'Pending'),
  ('TOP-20260717-003', 'BZB9827341', 'Mahimai Dass J',  2500.00,  'UPI',           '2026-07-17', 'Completed'),
  ('TOP-20260716-004', 'BZB9635120', 'Priya Srinivasan',1000.00,  'Wallet',        '2026-07-16', 'Failed')
ON CONFLICT (id) DO NOTHING;

-- Withdrawals
INSERT INTO withdrawals (id, member_id, member_name, amount, requested_date, approved_date, status, payout_method) VALUES
  ('WD-20260719-001', 'BZB9827341', 'Mahimai Dass J',  25000.00, '2026-07-19', '2026-07-20', 'Approved', 'Bank Transfer'),
  ('WD-20260718-002', 'BZB9899333', 'Vetrivel N',       8500.00, '2026-07-18', NULL,          'Pending',  'UPI'),
  ('WD-20260716-003', 'BZB9635120', 'Priya Srinivasan', 3200.00, '2026-07-16', '2026-07-17', 'Approved', 'Wallet')
ON CONFLICT (id) DO NOTHING;

-- Payouts
INSERT INTO payouts (id, member_id, member_name, plan, amount, payout_date, status) VALUES
  ('PT-20260720-001', 'BZB9601381', 'Kavi',            'Gold Referral Bonus',  12000.00, '2026-07-20', 'Completed'),
  ('PT-20260720-002', 'BZB9899333', 'Vetrivel N',      'Level 2 Reward',        5500.00, '2026-07-22', 'Scheduled'),
  ('PT-20260718-003', 'BZB9635120', 'Priya Srinivasan','Referral Commission',   1200.00, '2026-07-18', 'Failed')
ON CONFLICT (id) DO NOTHING;

-- Notifications
INSERT INTO notifications (id, title, message, type, is_read, created_date) VALUES
  ('NT-20260720-001', 'Pending withdrawal approval',    'A withdrawal request from Vetrivel N requires review.',     'Alert',  FALSE, '2026-07-20'),
  ('NT-20260719-002', 'New referral added',             'Nisha Menon joined through Kavi.',                         'Member', TRUE,  '2026-07-19'),
  ('NT-20260718-003', 'System maintenance scheduled',   'Scheduled downtime is planned for 2026-07-25 02:00 AM.',   'System', FALSE, '2026-07-18')
ON CONFLICT (id) DO NOTHING;

-- Audit logs
INSERT INTO audit_logs (id, user_name, action, target, log_date, status) VALUES
  ('AL-20260720-001', 'Admin',      'Approved withdrawal request',        'WD-20260718-002',   '2026-07-20 11:12:00+00', 'Success'),
  ('AL-20260719-002', 'Admin',      'Updated referral reward settings',   'Referral Program',  '2026-07-19 09:48:00+00', 'Success'),
  ('AL-20260718-003', 'Superadmin', 'Failed payout due to invalid bank details', 'PT-20260718-003', '2026-07-18 14:30:00+00', 'Failure')
ON CONFLICT (id) DO NOTHING;

-- Reports
INSERT INTO reports (id, title, category, created_date, owner, status) VALUES
  ('RP-20260701-001', 'Monthly Earnings Summary',         'Earnings',  '2026-07-01', 'Admin Team',  'Ready'),
  ('RP-20260708-002', 'Active Member Growth',             'Members',   '2026-07-08', 'Operations',  'Ready'),
  ('RP-20260715-003', 'Referral Campaign Performance',    'Referral',  '2026-07-15', 'Marketing',   'Scheduled')
ON CONFLICT (id) DO NOTHING;

-- Default admin settings
INSERT INTO admin_settings (key, value, description) VALUES
  ('site_name',            'BZB Group',                    'Platform display name'),
  ('referral_bonus_l1',    '1200',                         'Referral reward amount for Level 1 (Rs)'),
  ('referral_bonus_l2',    '2500',                         'Referral reward amount for Level 2 (Rs)'),
  ('referral_bonus_l3',    '3500',                         'Referral reward amount for Level 3 (Rs)'),
  ('min_withdrawal',       '500',                          'Minimum withdrawal amount (Rs)'),
  ('max_withdrawal',       '50000',                        'Maximum withdrawal amount per request (Rs)'),
  ('withdrawal_processing','3',                            'Withdrawal processing days'),
  ('maintenance_mode',     'false',                        'Put site in maintenance mode')
ON CONFLICT (key) DO NOTHING;
