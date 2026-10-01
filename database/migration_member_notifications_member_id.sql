CREATE TABLE IF NOT EXISTS member_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  icon VARCHAR(50),
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  notification_type VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE member_notifications
  DROP CONSTRAINT IF EXISTS fk_member_notifications_member;

ALTER TABLE member_notifications
  ALTER COLUMN member_id TYPE VARCHAR(50) USING member_id::text;

ALTER TABLE member_notifications
  ADD CONSTRAINT fk_member_notifications_member
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_member_notifications_member_id
  ON member_notifications(member_id);

CREATE INDEX IF NOT EXISTS idx_member_notifications_member_read
  ON member_notifications(member_id, is_read);