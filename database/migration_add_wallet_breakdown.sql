-- Store the registration payment allocation shown in the member dashboard.
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS level_income_wallet NUMERIC(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS mbd_wallet NUMERIC(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS booster_topup NUMERIC(14,2) NOT NULL DEFAULT 0;

-- Backfill members created before the wallet breakdown was introduced.
UPDATE members
SET level_income_wallet = COALESCE(NULLIF(level_income_wallet, 0), COALESCE(amount, wallet_balance, 0)),
    mbd_wallet = COALESCE(NULLIF(mbd_wallet, 0), ROUND(COALESCE(amount, wallet_balance, 0) / 5, 2)),
    booster_topup = COALESCE(NULLIF(booster_topup, 0), ROUND(COALESCE(amount, wallet_balance, 0) * 0.02, 2)),
    wallet_balance = ROUND(
      COALESCE(amount, wallet_balance, 0)
      - ROUND(COALESCE(amount, wallet_balance, 0) / 5, 2)
      - ROUND(COALESCE(amount, wallet_balance, 0) * 0.02, 2),
      2
    )
WHERE COALESCE(amount, wallet_balance, 0) > 0;