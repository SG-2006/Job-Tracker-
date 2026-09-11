import Database from "better-sqlite3";

const db = new Database("dev.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    status TEXT NOT NULL,
    deadline TEXT,
    jobLink TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

try {
  db.exec(`ALTER TABLE applications ADD COLUMN deadline TEXT`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE applications ADD COLUMN jobLink TEXT`);
} catch (e) {}

export default db;