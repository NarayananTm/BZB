-- ============================================================
-- Migration: Add Member Registration & KYC Columns
-- Description: Add missing columns for member registration,
--              KYC details, and transaction proof storage
-- ============================================================

-- Add registration and KYC columns to members table
ALTER TABLE members
ADD COLUMN IF NOT EXISTS password VARCHAR(255),
ADD COLUMN IF NOT EXISTS pan VARCHAR(20),
ADD COLUMN IF NOT EXISTS aadhar VARCHAR(20),
ADD COLUMN IF NOT EXISTS amount NUMERIC(14,2),
ADD COLUMN IF NOT EXISTS utr_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS transaction_proof BYTEA,
ADD COLUMN IF NOT EXISTS transaction_proof_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS transaction_proof_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'member';

-- Create index on PAN for faster lookups
CREATE INDEX IF NOT EXISTS idx_members_pan ON members(pan);

-- Create index on Aadhar for faster lookups
CREATE INDEX IF NOT EXISTS idx_members_aadhar ON members(aadhar);

-- Create index on status for filtering pending members
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);

-- Add comment to document the columns
COMMENT ON COLUMN members.pan IS 'PAN (Permanent Account Number) for tax identification';
COMMENT ON COLUMN members.aadhar IS 'Aadhar number for KYC verification';
COMMENT ON COLUMN members.amount IS 'Initial investment/topup amount';
COMMENT ON COLUMN members.utr_number IS 'Unique Transaction Reference (UTR) for payment proof';
COMMENT ON COLUMN members.transaction_proof IS 'Binary file containing payment proof (stored as BYTEA)';
COMMENT ON COLUMN members.transaction_proof_name IS 'Original filename of transaction proof';
COMMENT ON COLUMN members.transaction_proof_type IS 'MIME type of transaction proof (e.g., image/png)';
COMMENT ON COLUMN members.password IS 'Hashed password for member authentication';
COMMENT ON COLUMN members.role IS 'Role of the member (member, admin, superadmin)';
