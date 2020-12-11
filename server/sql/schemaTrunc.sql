DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'TRUNCATE TABLE' || quote_ident(r.tablename) || 'RESTART IDENTITY CASCADE';
    END LOOP;
END $$;