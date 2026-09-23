-- Keep the submitted payment with the request so approval can initialize wallets reliably.
ALTER TABLE member_requests
  ADD COLUMN IF NOT EXISTS amount NUMERIC(14,2);