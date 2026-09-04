-- ============================================================
-- BZB Platform - PostgreSQL Database Schema
-- Host: 
-- Database: 
-- ============================================================

-- Users (registered members via website)
CREATE TABLE IF NOT EXISTS users (
  id          VARCHAR(50)  PRIMARY KEY,
  full_name   VARCHAR(255)  NOT NULL,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  mobile      VARCHAR(20)   NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  created_date TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Admin users (back-office staff)
CREATE TABLE IF NOT EXISTS admin_users (
  id          VARCHAR(50)  PRIMARY KEY,
  username    VARCHAR(100)  NOT NULL UNIQUE,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  mobile      VARCHAR(20),
  password    VARCHAR(255)  NOT NULL,
  role        VARCHAR(50)   NOT NULL DEFAULT 'admin',  -- admin | superadmin
  is_active   BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Levels configuration
CREATE TABLE IF NOT EXISTS levels (
  id                  VARCHAR(50)  PRIMARY KEY,
  name                VARCHAR(50)  NOT NULL,
  required_referrals  INTEGER      NOT NULL,
  reward              VARCHAR(255),
  members_count       INTEGER      NOT NULL DEFAULT 0,
  completion_pct      INTEGER      NOT NULL DEFAULT 0,
  status              VARCHAR(20)  NOT NULL DEFAULT 'Active',   -- Active | Inactive
  description         TEXT,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Members (MLM participants)
CREATE TABLE IF NOT EXISTS members (
  id              VARCHAR(50)     PRIMARY KEY,              -- e.g. BZB9601381
  user_id         VARCHAR(50)     REFERENCES users(id),
  name            VARCHAR(255)    NOT NULL,
  email           VARCHAR(255)    NOT NULL,
  mobile          VARCHAR(20)     NOT NULL,
  sponsor_id      VARCHAR(50)     REFERENCES members(id),
  sponsor_name    VARCHAR(255),
  level_id        VARCHAR(50)     REFERENCES levels(id),
  level_name      VARCHAR(20)     NOT NULL DEFAULT 'Level 1',
  status          VARCHAR(20)     NOT NULL DEFAULT 'Pending',  -- Active | Inactive | Pending | Approved | Rejected
  joining_date    DATE            NOT NULL DEFAULT CURRENT_DATE,
  total_earnings  NUMERIC(14,2)   NOT NULL DEFAULT 0,
  wallet_balance  NUMERIC(14,2)   NOT NULL DEFAULT 0,
  referral_count  INTEGER         NOT NULL DEFAULT 0,
  team_count      INTEGER         NOT NULL DEFAULT 0,
  avatar          VARCHAR(500),
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS member_profiles (
  member_id        VARCHAR(50) PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE,
  date_of_birth    DATE,
  gender           VARCHAR(20),
  address          TEXT,
  district         VARCHAR(100),
  pincode          VARCHAR(20),
  state            VARCHAR(100),
  nominee_name     VARCHAR(255),
  nominee_relation VARCHAR(100),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referrals (one row per referred member)
CREATE TABLE IF NOT EXISTS referrals (
  id            VARCHAR(50)   PRIMARY KEY,           -- e.g. REF-20260712-001
  sponsor_id    VARCHAR(50)   REFERENCES members(id),
  sponsor_name  VARCHAR(255),
  member_id     VARCHAR(50)   REFERENCES members(id),
  member_name   VARCHAR(255),
  level_name    VARCHAR(20),
  join_date     DATE,
  status        VARCHAR(20)   NOT NULL DEFAULT 'Pending',  -- Active | Pending | Approved | Rejected
  reward_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Earnings (income transactions per member)
CREATE TABLE IF NOT EXISTS earnings (
  id          VARCHAR(50)   PRIMARY KEY,             -- e.g. EARN-20260719-001
  member_id   VARCHAR(50)   REFERENCES members(id),
  member_name VARCHAR(255),
  source      VARCHAR(100),                          -- Referral Reward | Top-up Bonus | Level Completion
  level_name  VARCHAR(20),
  amount      NUMERIC(14,2) NOT NULL,
  earn_date   DATE          NOT NULL,
  status      VARCHAR(20)   NOT NULL DEFAULT 'Pending',  -- Completed | Pending | Failed
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Top-ups (wallet deposits)
CREATE TABLE IF NOT EXISTS topups (
  id          VARCHAR(50)   PRIMARY KEY,             -- e.g. TOP-20260719-001
  member_id   VARCHAR(50)   REFERENCES members(id),
  member_name VARCHAR(255),
  amount      NUMERIC(14,2) NOT NULL,
  method      VARCHAR(50),                           -- UPI | Bank Transfer | Wallet
  topup_date  DATE          NOT NULL,
  status      VARCHAR(20)   NOT NULL DEFAULT 'Pending',  -- Pending | Completed | Failed
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Withdrawals (payout requests from members)
CREATE TABLE IF NOT EXISTS withdrawals (
  id              VARCHAR(50)   PRIMARY KEY,         -- e.g. WD-20260719-001
  member_id       VARCHAR(50)   REFERENCES members(id),
  member_name     VARCHAR(255),
  amount          NUMERIC(14,2) NOT NULL,
  requested_date  DATE          NOT NULL,
  approved_date   DATE,
  status          VARCHAR(20)   NOT NULL DEFAULT 'Pending',  -- Pending | Approved | Rejected
  payout_method   VARCHAR(50),                       -- Bank Transfer | UPI | Wallet
  remarks         TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Payouts (admin-initiated payments)
CREATE TABLE IF NOT EXISTS payouts (
  id          VARCHAR(50)   PRIMARY KEY,             -- e.g. PT-20260720-001
  member_id   VARCHAR(50)   REFERENCES members(id),
  member_name VARCHAR(255),
  plan        VARCHAR(255),
  amount      NUMERIC(14,2) NOT NULL,
  payout_date DATE,
  status      VARCHAR(20)   NOT NULL DEFAULT 'Scheduled',  -- Completed | Scheduled | Failed
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id            VARCHAR(50)   PRIMARY KEY,           -- e.g. NT-20260720-001
  title         VARCHAR(255)  NOT NULL,
  message       TEXT,
  type          VARCHAR(20)   NOT NULL DEFAULT 'System',  -- System | Member | Alert
  is_read       BOOLEAN       NOT NULL DEFAULT FALSE,
  created_date  DATE          NOT NULL DEFAULT CURRENT_DATE,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id          VARCHAR(50)   PRIMARY KEY,             -- e.g. AL-20260720-001
  user_name   VARCHAR(255),
  action      TEXT          NOT NULL,
  target      VARCHAR(255),
  log_date    TIMESTAMPTZ   NOT NULL,
  status      VARCHAR(20),                           -- Success | Failure
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id            VARCHAR(50)  PRIMARY KEY,            -- e.g. RP-20260701-001
  title         VARCHAR(255) NOT NULL,
  category      VARCHAR(50),                         -- Members | Earnings | Referral | Compliance | Activity
  created_date  DATE         NOT NULL DEFAULT CURRENT_DATE,
  owner         VARCHAR(255),
  status        VARCHAR(20)  NOT NULL DEFAULT 'Ready',  -- Ready | Generating | Scheduled
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Contact submissions (from website contact form)
CREATE TABLE IF NOT EXISTS contacts (
  id          BIGINT        PRIMARY KEY,
  email       VARCHAR(255),
  phone       VARCHAR(20),
  subject     VARCHAR(255),
  message     TEXT,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Referral form submissions (from referral landing page)
CREATE TABLE IF NOT EXISTS referral_submissions (
  id            BIGINT        PRIMARY KEY,
  full_name     VARCHAR(255),
  email         VARCHAR(255),
  phone         VARCHAR(20),
  city          VARCHAR(100),
  referral_code VARCHAR(50),
  message       TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Admin settings (key-value config store)
CREATE TABLE IF NOT EXISTS admin_settings (
  key         VARCHAR(100)  PRIMARY KEY,
  value       TEXT          NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Email Verification Tokens (for user registration verification)
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id              BIGINT        PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id         INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  email           VARCHAR(255)  NOT NULL,
  token           VARCHAR(255)  NOT NULL UNIQUE,
  is_verified     BOOLEAN       NOT NULL DEFAULT FALSE,
  expires_at      TIMESTAMPTZ   NOT NULL,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Password Reset Tokens (for password reset functionality)
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id              BIGINT        PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id         INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  token           VARCHAR(255)  NOT NULL UNIQUE,
  is_used         BOOLEAN       NOT NULL DEFAULT FALSE,
  expires_at      TIMESTAMPTZ   NOT NULL,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Bank Accounts / Payment Methods (for withdrawal processing)
CREATE TABLE IF NOT EXISTS bank_accounts (
  id              VARCHAR(50)   PRIMARY KEY,
  member_id       VARCHAR(50)   NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  account_holder  VARCHAR(255)  NOT NULL,
  bank_name       VARCHAR(255)  NOT NULL,
  account_number  VARCHAR(50)   NOT NULL,
  ifsc_code       VARCHAR(20),
  branch          VARCHAR(255),
  pan             VARCHAR(50),
  upi_id          VARCHAR(255),
  account_type    VARCHAR(20),                       -- Savings | Current | Business
  is_primary      BOOLEAN       NOT NULL DEFAULT FALSE,
  is_verified     BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Member Documents / KYC (for identity verification)
CREATE TABLE IF NOT EXISTS member_documents (
  id              VARCHAR(50)   PRIMARY KEY,
  member_id       VARCHAR(50)   NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  document_type   VARCHAR(50)   NOT NULL,            -- Aadhar | PAN | Passport | License
  document_number VARCHAR(50)   NOT NULL,
  document_url    VARCHAR(500),
  is_verified     BOOLEAN       NOT NULL DEFAULT FALSE,
  verified_by     VARCHAR(255),
  verified_date   TIMESTAMPTZ,
  remarks         TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Member Status History (audit trail of status changes)
CREATE TABLE IF NOT EXISTS member_status_history (
  id              BIGINT        PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  member_id       VARCHAR(50)   NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  old_status      VARCHAR(20),
  new_status      VARCHAR(20)   NOT NULL,
  changed_by      VARCHAR(255),
  reason          TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Wallet History (unified transaction log for all member wallet transactions)
CREATE TABLE IF NOT EXISTS wallet_history (
  id              VARCHAR(50)   PRIMARY KEY,
  member_id       VARCHAR(50)   NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50)  NOT NULL,            -- Topup | Withdrawal | Earning | Payout | Deduction
  reference_id    VARCHAR(50),                       -- Foreign key to topups/withdrawals/earnings/payouts
  amount          NUMERIC(14,2) NOT NULL,
  balance_before  NUMERIC(14,2) NOT NULL,
  balance_after   NUMERIC(14,2) NOT NULL,
  description     TEXT,
  status          VARCHAR(20)   NOT NULL DEFAULT 'Completed',  -- Completed | Pending | Failed
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Member Activity Log (user activity tracking)
CREATE TABLE IF NOT EXISTS member_activity_logs (
  id              BIGINT        PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  member_id       VARCHAR(50)   REFERENCES members(id) ON DELETE CASCADE,
  activity_type   VARCHAR(50)   NOT NULL,            -- Login | Logout | ProfileUpdate | WithdrawalRequest | etc
  details         TEXT,
  ip_address      VARCHAR(50),
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Member Settings / Preferences (user-specific settings)
CREATE TABLE IF NOT EXISTS member_settings (
  id              VARCHAR(50)   PRIMARY KEY,
  member_id       VARCHAR(50)   NOT NULL UNIQUE REFERENCES members(id) ON DELETE CASCADE,
  notification_email BOOLEAN    NOT NULL DEFAULT TRUE,
  notification_sms   BOOLEAN    NOT NULL DEFAULT TRUE,
  two_factor_enabled BOOLEAN    NOT NULL DEFAULT FALSE,
  language        VARCHAR(10)   NOT NULL DEFAULT 'en',
  theme           VARCHAR(20)   NOT NULL DEFAULT 'light',
  privacy_level   VARCHAR(20)   NOT NULL DEFAULT 'private',  -- Public | Private
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes for common lookups
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_members_status        ON members(status);
CREATE INDEX IF NOT EXISTS idx_members_sponsor_id    ON members(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_referrals_sponsor_id  ON referrals(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status      ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_earnings_member_id    ON earnings(member_id);
CREATE INDEX IF NOT EXISTS idx_earnings_status       ON earnings(status);
CREATE INDEX IF NOT EXISTS idx_topups_member_id      ON topups(member_id);
CREATE INDEX IF NOT EXISTS idx_topups_status         ON topups(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_member_id ON withdrawals(member_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status    ON withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_payouts_member_id     ON payouts(member_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status        ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_name  ON audit_logs(user_name);
