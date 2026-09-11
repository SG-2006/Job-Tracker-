# Job Application Tracker

A full-stack web app for tracking job applications — add companies, update statuses, set deadlines, and store job posting links, all in one place.

Built as a personal project to learn full-stack development ahead of software engineering internship applications.

## Features

- Add applications with company name, status, deadline, and job posting link
- Update application status (Applied, Interview, Offer, Rejected) via dropdown
- Delete applications
- Data persists in a real SQLite database
- Clean, responsive UI with color-coded status badges

## Tech stack

**Frontend:** React, TypeScript
**Backend:** Node.js, Express, TypeScript
**Database:** SQLite (via better-sqlite3)

## Running it locally

**Backend:**

Runs on `http://localhost:3001`

**Frontend:** (in a separate terminal)

Runs on `http://localhost:3000`

Both servers need to be running simultaneously for the app to work.

## What I learned

This was my first time building a complete full-stack application — setting up an Express backend, connecting it to a real database, and building a React frontend that talks to it via a REST API. Along the way I worked through TypeScript configuration, CRUD operations (Create, Read, Update, Delete), and deploying code via Git/GitHub.

## Future improvements

- Deploy live (backend + frontend hosted, not just local)
- Add notes field per application
- Add sorting/filtering by status or deadline
- Add authentication for multi-user support