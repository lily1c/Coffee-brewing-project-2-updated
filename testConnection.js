// testConnection.js
import 'dotenv/config';
import pool from './config/database.js';

async function testDB() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("✅ Connected to DB. Current time:", res.rows[0]);
  } catch (err) {
    console.error("❌ DB connection error:", err);
  } finally {
    await pool.end(