const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/uploads',
  express.static('uploads')
);

const SECRET = 'lms_secret_key';

const db = new sqlite3.Database('./database/lms.db');

db.serialize(() => {

  // USERS TABLE

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  // COURSES TABLE

  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      instructor TEXT,
      category TEXT,
      duration TEXT
    )
  `);

  // ENROLLMENTS TABLE

  db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentName TEXT,
      courseId INTEGER
    )
  `);

  // ASSIGNMENTS TABLE

  db.run(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courseId INTEGER,
      title TEXT,
      description TEXT,
      dueDate TEXT
    )
  `);

  // SUBMISSIONS TABLE

  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assignmentId INTEGER,
      studentName TEXT,
      status TEXT
    )
  `);

  // PROGRESS TRACKING TABLE

  db.run(`
    CREATE TABLE IF NOT EXISTS progress_tracking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentName TEXT,
      courseId INTEGER,
      progress INTEGER
    )
  `);

});

// ==========================
// FILE UPLOAD SETUP
// ==========================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, 'uploads/');

  },

  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  }

});

const upload = multer({
  storage: storage
});

// STATIC FOLDER

app.use('/uploads', express.static('uploads'));

// ==========================
// SIGNUP
// ==========================

app.post('/api/signup', (req, res) => {

  const {
    name,
    email,
    password,
    role
  } = req.body;

  db.run(
    `
    INSERT INTO users
    (name, email, password, role)
    VALUES (?, ?, ?, ?)
    `,
    [name, email, password, role],

    function(err) {

      if (err) {

        return res.status(400).json({
          error: 'User already exists'
        });

      }

      res.json({
        message: 'Signup successful'
      });

    }
  );

});


// ==========================
// LOGIN
// ==========================

app.post('/api/login', (req, res) => {

  const {
    email,
    password
  } = req.body;

  db.get(
    `
    SELECT * FROM users
    WHERE email = ?
    AND password = ?
    `,
    [email, password],

    (err, user) => {

      if (!user) {

        return res.status(401).json({
          error: 'Invalid credentials'
        });

      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        SECRET
      );

      res.json({
        token,
        role: user.role,
        name: user.name
      });

    }
  );

});


// ==========================
// GET COURSES
// ==========================

app.get('/api/courses', (req, res) => {

  db.all(
    `SELECT * FROM courses`,
    [],
    (err, rows) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json(rows);

    }
  );

});


// ==========================
// ADD COURSE
// ==========================

app.post('/api/courses', (req, res) => {

  const {
    title,
    instructor,
    category,
    duration
  } = req.body;

  db.run(
    `
    INSERT INTO courses
    (title, instructor, category, duration)
    VALUES (?, ?, ?, ?)
    `,
    [
      title,
      instructor,
      category,
      duration
    ],

    function(err) {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: 'Course added successfully'
      });

    }
  );

});


// ==========================
// ENROLL COURSE
// ==========================

app.post('/api/enrollments', (req, res) => {

  const { studentName, courseId } = req.body;

  db.get(
    `
    SELECT *
    FROM enrollments
    WHERE studentName = ?
    AND courseId = ?
    `,
    [studentName, courseId],

    (err, existingEnrollment) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (existingEnrollment) {
        return res.status(400).json({
          error: 'Already enrolled'
        });
      }

      db.run(
        `
        INSERT INTO enrollments(studentName, courseId)
        VALUES(?, ?)
        `,
        [studentName, courseId],

        function(err) {

          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: 'Enrollment successful'
          });

        }
      );

    }
  );

});


// ==========================
// GET ENROLLMENTS
// ==========================

app.get('/api/enrollments/:studentName', (req, res) => {

  const { studentName } = req.params;

  db.all(
    `
    SELECT
      courses.id as courseId,
      courses.title,
      courses.instructor,
      courses.category,
      courses.duration

    FROM enrollments

    JOIN courses
    ON enrollments.courseId = courses.id

    WHERE enrollments.studentName = ?
    `,
    [studentName],

    (err, rows) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json(rows);

    }
  );

});

// ==========================
// DASHBOARD SUMMARY
// ==========================

app.get('/api/dashboard-summary/:studentName', (req, res) => {

  const { studentName } = req.params;

  db.get(
    `
    SELECT
      (SELECT COUNT(*) FROM courses) AS totalCourses,

      (
        SELECT COUNT(*)
        FROM enrollments
        WHERE studentName = ?
      ) AS totalEnrollments
    `,
    [studentName],

    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(row);

    }
  );

});


// ==========================
// CREATE ASSIGNMENT
// ==========================

app.post('/api/assignments', (req, res) => {

  const {
    courseId,
    title,
    description,
    dueDate
  } = req.body;

  db.run(
    `
    INSERT INTO assignments
    (courseId, title, description, dueDate)
    VALUES (?, ?, ?, ?)
    `,
    [
      courseId,
      title,
      description,
      dueDate
    ],

    function(err) {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: 'Assignment created'
      });

    }
  );

});


// ==========================
// GET ASSIGNMENTS
// ==========================


app.get('/api/assignments', (req, res) => {

  db.all(
    `
    SELECT
      assignments.*,
      courses.title as courseTitle

    FROM assignments

    JOIN courses
    ON assignments.courseId = courses.id
    `,
    [],

    (err, rows) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json(rows);

    }
  );

});

// ==========================
// GET STUDENT ASSIGNMENTS
// ==========================

app.get(
  '/api/student-assignments/:studentName',

  (req, res) => {

    const { studentName } = req.params;

    db.all(
      `
      SELECT
        assignments.*,
        courses.title AS courseTitle,
        submissions.status,
        submissions.marks,
        submissions.feedback

      FROM assignments

      JOIN courses
      ON assignments.courseId = courses.id

      LEFT JOIN submissions
      ON assignments.id = submissions.assignmentId
      AND submissions.studentName = ?

      `,
      [studentName],

      (err, rows) => {

        if (err) {

          return res
            .status(500)
            .json(err);

        }

        res.json(rows);

      }
    );

  }
);


// ==========================
// SUBMIT ASSIGNMENT
// ==========================

app.post(
  '/api/submissions',
  upload.single('file'),

  (req, res) => {

    const assignmentId = req.body.assignmentId;

    const studentName = req.body.studentName;

    const fileUrl = req.file
      ? req.file.filename
      : null;

    db.run(

      `
      INSERT INTO submissions
      (
        assignmentId,
        studentName,
        fileUrl,
        status
      )
      VALUES (?, ?, ?, ?)
      `,

      [
        assignmentId,
        studentName,
        fileUrl,
        'Submitted'
      ],

      function(err) {

        if (err) {

          return res
            .status(500)
            .json(err);

        }

        res.json({
          message: 'Assignment submitted successfully'
        });

      }

    );

  }

);


// ==========================
// GET SUBMISSIONS
// ==========================

app.get('/api/submissions', (req, res) => {

  db.all(
    `
    SELECT
      submissions.id,
      submissions.studentName,
      submissions.status,
      submissions.fileUrl,
      submissions.marks,
      submissions.feedback,

      assignments.title as assignmentTitle,

      courses.title as courseTitle

    FROM submissions

    JOIN assignments
    ON submissions.assignmentId = assignments.id

    JOIN courses
    ON assignments.courseId = courses.id
    `,
    [],

    (err, rows) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json(rows);

    }
  );

});

// ===============================
// REVIEW SUBMISSION
// ===============================

app.put('/api/submissions/:id/review', (req, res) => {

  const { marks, feedback, status } = req.body;

  db.run(
    `
    UPDATE submissions
    SET marks = ?,
        feedback = ?,
        status = ?
    WHERE id = ?
    `,
    [
      marks,
      feedback,
      status,
      req.params.id
    ],
    function(err) {

      if (err) {

        return res
          .status(500)
          .json(err);

      }

      res.json({
        message: 'Submission reviewed successfully'
      });

    }
  );

});

// ==========================
// UPDATE PROGRESS
// ==========================

app.post('/api/progress', (req, res) => {

  const {
    studentName,
    courseId,
    progress
  } = req.body;

  db.run(
    `
    INSERT INTO progress_tracking
    (studentName, courseId, progress)
    VALUES (?, ?, ?)
    `,
    [
      studentName,
      courseId,
      progress
    ],

    function(err) {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: 'Progress updated'
      });

    }
  );

});



// ==========================
// GET STUDENT PROGRESS
// ==========================

app.get(
  '/api/progress/:studentName',

  (req, res) => {

    const { studentName } = req.params;

    db.all(
      `
      SELECT
        progress_tracking.*,
        courses.title AS courseTitle

      FROM progress_tracking

      JOIN courses
      ON progress_tracking.courseId = courses.id

      WHERE progress_tracking.studentName = ?
      `,
      [studentName],

      (err, rows) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json(rows);

      }
    );

  }
);

// ============================
// DASHBOARD ANALYTICS
// ============================

app.get('/api/dashboard/summary', (req, res) => {

  db.get(
    `
    SELECT COUNT(*) AS totalCourses
    FROM courses
    `,
    [],
    (err, coursesRow) => {

      if (err) {

        return res.status(500).json(err);

      }

      db.get(
        `
        SELECT COUNT(*) AS totalStudents
        FROM users
        WHERE role = 'student'
        `,
        [],
        (err, studentsRow) => {

          if (err) {

            return res.status(500).json(err);

          }

          db.get(
            `
            SELECT COUNT(*) AS totalEnrollments
            FROM enrollments
            `,
            [],
            (err, enrollmentsRow) => {

              if (err) {

                return res.status(500).json(err);

              }

              db.get(
                `
                SELECT COUNT(*) AS completedCourses
                FROM progress_tracking
                WHERE progress = 100
                `,
                [],
                (err, completedRow) => {

                  if (err) {

                    return res.status(500).json(err);

                  }

                  res.json({

                    totalCourses:
                      coursesRow.totalCourses,

                    totalStudents:
                      studentsRow.totalStudents,

                    totalEnrollments:
                      enrollmentsRow.totalEnrollments,

                    completedCourses:
                      completedRow.completedCourses

                  });

                }
              );

            }
          );

        }
      );

    }
  );

});

// ==========================
// ADMIN STUDENTS
// ==========================

app.get(
  '/api/admin/students',
  (req, res) => {

    db.all(
      `
      SELECT *
      FROM users
      WHERE role='student'
      `,
      [],
      (err, rows) => {

        if (err) {

          return res
            .status(500)
            .json(err);

        }

        res.json(rows);

      }
    );

  }
);

// ==========================
// ADMIN ENROLLMENTS
// ==========================

app.get(
  '/api/admin/enrollments',
  (req, res) => {

    db.all(
      `
      SELECT
        enrollments.id,
        enrollments.studentName,
        courses.title AS courseTitle

      FROM enrollments

      JOIN courses
      ON enrollments.courseId = courses.id
      `,
      [],
      (err, rows) => {

        if (err) {

          return res
            .status(500)
            .json(err);

        }

        res.json(rows);

      }
    );

  }
);

// ==========================
// COMPLETED COURSES
// ==========================

app.get(
  '/api/admin/completed-courses',
  (req, res) => {

    db.all(
      `
      SELECT
        progress_tracking.studentName,
        courses.title AS courseTitle,
        progress_tracking.progress

      FROM progress_tracking

      INNER JOIN courses
      ON progress_tracking.courseId = courses.id

      WHERE progress_tracking.progress = 100
      `,
      [],
      (err, rows) => {

        if (err) {

          console.log(err);

          return res
            .status(500)
            .json(err);

        }

        res.json(rows);

      }
    );

  }
);

// ==========================
// START SERVER
// ==========================

app.listen(5000, () => {

  console.log(
    'Server running on 5000'
  );

});