import pg from 'pg';

console.log("DB CONFIG", {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: process.env.PGSSLMODE
});

const config = {
  user: 