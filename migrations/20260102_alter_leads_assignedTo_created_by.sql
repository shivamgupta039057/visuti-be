-- Migration script to update assignedTo and created_by columns to INTEGER for PostgreSQL
ALTER TABLE "leads"
  ALTER COLUMN "assignedTo" TYPE INTEGER USING NULLIF("assignedTo", '')::integer,
  ALTER COLUMN "created_by" TYPE INTEGER USING NULLIF("created_by", '')::integer;
