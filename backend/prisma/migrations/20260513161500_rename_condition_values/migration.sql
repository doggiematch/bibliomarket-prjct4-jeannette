DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'LIKE_NEW'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'ComoNuevo'
  ) THEN
    ALTER TYPE "Condition" RENAME VALUE 'LIKE_NEW' TO 'ComoNuevo';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'GOOD'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'BuenEstado'
  ) THEN
    ALTER TYPE "Condition" RENAME VALUE 'GOOD' TO 'BuenEstado';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'ACCEPTABLE'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'Aceptable'
  ) THEN
    ALTER TYPE "Condition" RENAME VALUE 'ACCEPTABLE' TO 'Aceptable';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'POOR'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'Condition' AND e.enumlabel = 'ConDefectos'
  ) THEN
    ALTER TYPE "Condition" RENAME VALUE 'POOR' TO 'ConDefectos';
  END IF;
END $$;
