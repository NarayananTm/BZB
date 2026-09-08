-- ============================================================
-- Migration: Create dedicated website login users table
-- Purpose: Separate website login users from MLM members table
-- ============================================================

-- Create website_users table for login purposes only
CREATE TABLE IF NOT EXISTS website_users (
  id          VARCHAR(50)  PRIMARY KEY,
  full_name   VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  mobile      VARCHAR(20)  NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_website_users_email ON website_users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_website_users_mobile ON website_users(mobile);

-- Optionally migrate existing users from the old users table (if needed)
-- INSERT INTO website_users (id, full_name, email, mobile, password, created_at)
-- SELECT id, full_name, email, mobile, password, created_date
-- FROM users
-- ON CONFLICT (id) DO NOTHING;
