import express from "express";
import cors from "cors";
import db from "./db";

const app = express();
app.use(cors());
app.use(express.json());

// GET all applications
app.get("/applications", (req, res) => {
  const applications = db.prepare("SELECT * FROM applications").all();
  res.json(applications);
});

// POST a new application
app.post("/applications", (req, res) => {
  const { company, status, deadline, jobLink } = req.body;
  const stmt = db.prepare(
    "INSERT INTO applications (company, status, deadline, jobLink) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(company, status, deadline, jobLink);
  res.json({ id: result.lastInsertRowid, company, status, deadline, jobLink });
});

// PATCH — update an existing application's status
app.patch("/applications/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.prepare("UPDATE applications SET status = ? WHERE id = ?").run(status, id);
  res.json({ success: true });
});

// DELETE — remove an application
app.delete("/applications/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM applications WHERE id = ?").run(id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));