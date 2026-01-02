// Node.js script to run the migration SQL for updating leads table columns
const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

async function runMigration() {
  const sql = fs.readFileSync('./migrations/20260102_alter_leads_assignedTo_created_by_safe.sql', 'utf8');
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  });
  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('Migration ran successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err.message);
  } finally {
    await client.end();
  }
}

runMigration();
