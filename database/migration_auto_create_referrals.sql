-- Create one referral record automatically whenever a sponsored member is added.
-- Run this migration once against the production PostgreSQL database.

CREATE OR REPLACE FUNCTION create_referral_for_member()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.sponsor_id IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO referrals (
    id,
    sponsor_id,
    sponsor_name,
    member_id,
    member_name,
    level_name,
    join_date,
    status,
    reward_amount
  )
  VALUES (
    'REF-' || NEW.id,
    NEW.sponsor_id,
    COALESCE(NEW.sponsor_name, (SELECT name FROM members WHERE id = NEW.sponsor_id)),
    NEW.id,
    NEW.name,
    NEW.level_name,
    NEW.joining_date,
    CASE
      WHEN NEW.status IN ('Active', 'Approved') THEN NEW.status
      ELSE 'Pending'
    END,
    0
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS members_create_referral ON members;

CREATE TRIGGER members_create_referral
AFTER INSERT ON members
FOR EACH ROW
EXECUTE FUNCTION create_referral_for_member();