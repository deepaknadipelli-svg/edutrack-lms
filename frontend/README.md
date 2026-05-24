# EduTrack LMS

EduTrack LMS is a full-stack Learning Management System developed using React.js, Node.js, Express.js, and SQLite.

The application allows students to enroll in courses, submit assignments, track progress, and download certificates. Instructors can create courses and assignments, while administrators can monitor overall platform analytics.

---

# Features

## Authentication and Authorization

- User Signup and Login
- Role-based access control
- Protected routes for students, instructors, and admins

---

## Student Features

- View available courses
- Enroll in courses
- Prevent duplicate enrollments
- View enrolled courses
- Submit assignments with PDF upload
- Track course progress
- View assignment marks and feedback
- Download completion certificates

---

## Instructor Features

- Create courses
- View instructor-specific courses
- Create assignments
- Review student submissions
- Download submitted assignment files
- Provide marks and feedback

---

## Admin Features

- View overall platform analytics
- View total students
- View total enrollments
- View completed courses
- Monitor student activity

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js

## Database

- SQLite

## File Upload

- Multer

## Certificate Generation

- jsPDF

---

# Project Structure

```bash
EduTrack-LMS/
│
├── backend/
│   ├── uploads/
│   ├── server.js
│   ├── database/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

---

# Installation and Setup

## Clone the Repository

```bash
git clone <repository-link>
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend server:

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

Open another terminal and navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend server:

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Default Roles

## Student

- Can enroll in courses
- Submit assignments
- Track progress

## Instructor

- Can create courses
- Create assignments
- Review submissions

## Admin

- Can monitor analytics
- View platform statistics

---

# Database Tables

- users
- courses
- enrollments
- assignments
- submissions
- progress_tracking

---

# Key Functionalities

## Assignment Workflow

1. Instructor creates assignment
2. Student uploads assignment PDF
3. Instructor reviews submission
4. Student receives marks and feedback

---

## Progress Tracking

- Tracks enrolled course progress
- Displays completed courses
- Enables certificate generation

---

## Certificate Generation

- Certificates are generated automatically for completed courses

---

# API Endpoints

## Authentication

- POST `/api/signup`
- POST `/api/login`

## Courses

- GET `/api/courses`
- POST `/api/courses`

## Enrollments

- GET `/api/enrollments/:studentName`
- POST `/api/enrollments`

## Assignments

- GET `/api/assignments`
- POST `/api/assignments`

## Submissions

- GET `/api/submissions`
- POST `/api/submissions`

## Progress

- GET `/api/progress/:studentName`

## Dashboard

- GET `/api/dashboard/summary`

---

# Future Improvements

- JWT Authentication
- Email Notifications
- Search and Filters
- Course Editing and Deletion
- Online Deployment
- Chart-Based Analytics
- Profile Management

---

# Author

Developed as a full-stack LMS project using React.js, Node.js, Express.js, and SQLite.