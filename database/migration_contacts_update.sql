-- Migration: Update contacts table to add name field
-- This ensures all necessary fields are present for contact form submissions

-- Add name field if it doesn't exist
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Repair the original contacts table, which did not generate IDs automatically.
-- The sequence is deliberately separate so this also works on existing tables
-- that were created before contacts.id became an identity column.
CREATE SEQUENCE IF NOT EXISTS contacts_id_seq;

SELECT setval(
	'contacts_id_seq',
	COALESCE((SELECT MAX(id) FROM contacts), 0) + 1,
	false
);

ALTER TABLE contacts
	ALTER COLUMN id SET DEFAULT nextval('contacts_id_seq');

ALTER SEQUENCE contacts_id_seq OWNED BY contacts.id;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
