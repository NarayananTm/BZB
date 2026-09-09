-- Migration: Add original_password column to members table
-- This stores the plain password that members enter during registration
-- We show this to admin when approving, so member gets their own password back

ALTER TABLE members ADD COLUMN IF NOT EXISTS original_password VARCHAR(255);

-- Create index for performance if querying by status + original_password
CREATE INDEX IF NOT EXISTS idx_members_status_has_password 
ON members(status) 
WHERE original_password IS NOT NULL;

-- Add comment
COMMENT ON COLUMN members.original_password IS 'Plain text password entered by member during registration. Used to display credentials during approval.';
