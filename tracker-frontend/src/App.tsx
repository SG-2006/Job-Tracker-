import { useEffect, useState } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function App() {
  const [applications, setApplications] = useState<any[]>([]);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [deadline, setDeadline] = useState("");
  const [jobLink, setJobLink] = useState("");

  const loadApplications = () => {
    fetch(`${API_URL}/applications`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, status, deadline, jobLink }),
    }).then(() => {
      setCompany("");
      setDeadline("");
      setJobLink("");
      loadApplications();
    });
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/applications/${id}`, {
      method: "DELETE",
    }).then(() => loadApplications());
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    fetch(`${API_URL}/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => loadApplications());
  };

  return (
    <div className="app-container">
      <h1>My Applications</h1>
      <p className="subtitle">Track every application in one place</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          type="url"
          placeholder="Job link"
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {applications.length === 0 ? (
        <p className="empty-state">No applications yet — add your first one above.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              <span className="company-name">{app.company}</span>
              <select
                className={`status-badge status-${app.status}`}
                value={app.status}
                onChange={(e) => handleStatusChange(app.id, e.target.value)}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              {app.deadline && (
                <span className="deadline">Due {app.deadline}</span>
              )}
              {app.jobLink && (
                <a href={app.jobLink} target="_blank" rel="noreferrer">
                  View posting
                </a>
              )}
              <button onClick={() => handleDelete(app.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
