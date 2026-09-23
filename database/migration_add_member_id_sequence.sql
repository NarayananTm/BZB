-- Generate new member IDs sequentially as MBD000001, MBD000002, etc.
DO $$
DECLARE
  member_count BIGINT;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'member_id_sequence'
  ) THEN
    CREATE SEQUENCE member_id_sequence MINVALUE 1 START 1;
    SELECT COUNT(*) INTO member_count FROM members;
    IF member_count > 0 THEN
      PERFORM setval('member_id_sequence', member_count, true);
    END IF;
  END IF;
END $$;