-- Migration: Update contacts table to add name field
-- This ensures all necessary fields are present for contact form submissions

-- Add name field if it doesn't exist
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
