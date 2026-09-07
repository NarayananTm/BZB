-- Store uploaded files in PostgreSQL instead of public/uploads.
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS avatar TEXT;

ALTER TABLE members
  ALTER COLUMN avatar TYPE TEXT;

ALTER TABLE member_documents
  ALTER COLUMN document_url TYPE TEXT;

-- Apply this when the optional registration_transactions table exists.
DO $$
BEGIN
  IF to_regclass('registration_transactions') IS NOT NULL THEN
    ALTER TABLE registration_transactions
      ALTER COLUMN transaction_proof TYPE TEXT;
  END IF;
END $$;