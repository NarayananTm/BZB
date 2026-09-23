-- Correct wallet allocation to match the dashboard values:
-- amount 135000 => MBD 27000, Booster 2700, Wallet Balance 105300.
UPDATE members
SET level_income_wallet = ROUND(COALESCE(amount, level_income_wallet, 0), 2),
    mbd_wallet = ROUND(COALESCE(amount, level_income_wallet, 0) / 5, 2),
    booster_topup = ROUND(COALESCE(amount, level_income_wallet, 0) * 0.02, 2),
    wallet_balance = ROUND(
      COALESCE(amount, level_income_wallet, 0)
      - ROUND(COALESCE(amount, level_income_wallet, 0) / 5, 2)
      - ROUND(COALESCE(amount, level_income_wallet, 0) * 0.02, 2),
      2
    )
WHERE COALESCE(amount, level_income_wallet, 0) > 0;