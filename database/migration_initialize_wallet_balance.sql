-- Set the initial wallet balance for members registered before wallet_balance
-- began receiving the registration amount during account creation.
UPDATE members
SET wallet_balance = amount
WHERE COALESCE(wallet_balance, 0) = 0
  AND amount IS NOT NULL
  AND amount > 0;