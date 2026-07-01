# Async Race

**Deployed UI:** [https://async-race-app.vercel.app](https://async-race-app.vercel.app)

**Estimated Score:** 300 / 400

## About

Single Page Application for managing a collection of radio-controlled cars and running drag-racing competitions. Built with React 18, Redux Toolkit, and TypeScript.

## Getting Started

### Prerequisites
- Node.js 18+
- The [server mock](https://github.com/mikhama/async-race-api) running on `http://127.0.0.1:3000`

### Setup

```bash
# Clone the server mock
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start

# In a separate terminal, run this app
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format with Prettier |
| `npm run ci:format` | Check formatting (CI) |

## Checklist 300/400 pts

### UI Deployment

- [x] **Deployment Platform:** Successfully deployed on Vercel.

### Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** Conventional commits used throughout.
- [x] **Checklist included in README.md**
- [x] **Score calculation:** Estimated score at top of README.
- [x] **UI Deployment link in README.md**

### Basic Structure (80 points)

- [x] **Two Views (10 points):** "Garage" and "Winners" views implemented.
- [x] **Garage View Content (30 points):**
  - [x] Name of view
  - [x] Car creation and editing panel
  - [x] Race control panel
  - [x] Garage section
- [x] **Winners View Content (10 points):**
  - [x] Name of view ("Winners")
  - [x] Winners table
  - [x] Pagination
- [x] **Persistent State (30 points):** View state preserved when switching between views.

### Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points)**
- [x] **Color Selection (10 points)**
- [x] **Random Car Creation (20 points)**
- [x] **Car Management Buttons (10 points)**
- [x] **Pagination (10 points)**
- [x] **EXTRA POINTS (20 points):**
  - [x] Empty Garage handled with friendly message
  - [x] Empty page navigation to previous page

### Winners View (50 points)

- [x] **Display Winners (15 points)**
- [x] **Pagination for Winners (10 points)**
- [x] **Winners Table (15 points)**
- [x] **Sorting Functionality (10 points)**

### Race (170 points)

- [x] **Start Engine Animation (20 points)**
- [x] **Stop Engine Animation (20 points)**
- [x] **Responsive Animation (30 points)**
- [x] **Start Race Button (10 points)**
- [x] **Reset Race Button (15 points)**
- [x] **Winner Announcement (5 points)**
- [x] **Button States (20 points)**
- [x] **Actions during the race (50 points)**

### Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** `format` and `ci:format` scripts configured.
- [x] **ESLint Configuration (5 points):** Airbnb style guide configured.

### Overall Code Quality (100 points) _Skip during self-check_

- [ ] **(Up to 100 points)** Reviewer discretion.
