import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Dashboard() {

  const role = localStorage.getItem('role');

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const studentName = user?.name;

  // =========================
  // STUDENT SUMMARY
  // =========================

  const [studentSummary, setStudentSummary] =
    useState({

      totalCourses: 0,

      enrolledCourses: 0,

      completedCourses: 0

    });

  // =========================
  // ADMIN SUMMARY
  // =========================

  const [adminSummary, setAdminSummary] =
    useState({

      totalCourses: 0,

      totalStudents: 0,

      totalEnrollments: 0,

      completedCourses: 0

    });

  useEffect(() => {

    if (role === 'admin') {

      fetchAdminDashboard();

    } else {

      fetchStudentDashboard();

    }

  }, []);

  // ===================================
  // STUDENT DASHBOARD
  // ===================================

  const fetchStudentDashboard = async () => {

    try {

      const coursesRes = await axios.get(
        'http://localhost:5000/api/courses'
      );

      const enrollmentsRes = await axios.get(
        `http://localhost:5000/api/enrollments/${studentName}`
      );

      const progressRes = await axios.get(
        `http://localhost:5000/api/progress/${studentName}`
      );

      const completed =
        progressRes.data.filter(
          (course) => course.progress === 100
        ).length;

      setStudentSummary({

        totalCourses:
          coursesRes.data.length,

        enrolledCourses:
          enrollmentsRes.data.length,

        completedCourses:
          completed

      });

    } catch (err) {

      console.log(err);

    }

  };

  // ===================================
  // ADMIN DASHBOARD
  // ===================================

  const fetchAdminDashboard = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/dashboard/summary'
      );

      setAdminSummary(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ===================================
  // ADMIN UI
  // ===================================

  if (role === 'admin') {

    return (

      <div className="page">

        <h1>
          Admin Dashboard Analytics
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}
        >

          {/* TOTAL COURSES */}

          <div
            className="card"
            onClick={() =>
              window.location.href =
                '/courses'
            }
            style={{
              cursor: 'pointer'
            }}
          >

            <h2>Total Courses</h2>

            <h1>
              {adminSummary.totalCourses}
            </h1>

            <p>
              Click to view all courses
            </p>

          </div>

          {/* TOTAL STUDENTS */}

          <div
            className="card"
            onClick={() =>
              window.location.href =
                '/admin/students'
            }
            style={{
              cursor: 'pointer'
            }}
          >

            <h2>Total Students</h2>

            <h1>
              {adminSummary.totalStudents}
            </h1>

            <p>
              Click to view students
            </p>

          </div>

          {/* TOTAL ENROLLMENTS */}

          <div
            className="card"
            onClick={() =>
              window.location.href =
                '/admin/enrollments'
            }
            style={{
              cursor: 'pointer'
            }}
          >

            <h2>Total Enrollments</h2>

            <h1>
              {adminSummary.totalEnrollments}
            </h1>

            <p>
              Click to view enrollments
            </p>

          </div>

          {/* COMPLETED COURSES */}

          <div
            className="card"
            onClick={() =>
              window.location.href =
                '/admin/completed-courses'
            }
            style={{
              cursor: 'pointer'
            }}
          >

            <h2>Completed Courses</h2>

            <h1>
              {adminSummary.completedCourses}
            </h1>

            <p>
              Click to view completed students
            </p>

          </div>

        </div>

      </div>

    );

  }

  // ===================================
  // STUDENT UI
  // ===================================

  return (

    <div className="page">

      <h1>
        LMS Dashboard
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}
      >

        {/* TOTAL COURSES */}

        <div
          className="card"
          onClick={() =>
            window.location.href =
              '/courses'
          }
          style={{
            cursor: 'pointer'
          }}
        >

          <h2>
            Total Courses
          </h2>

          <h1>
            {studentSummary.totalCourses}
          </h1>

        </div>

        {/* ENROLLED COURSES */}

        <div
          className="card"
          onClick={() =>
            window.location.href =
              '/enrollments'
          }
          style={{
            cursor: 'pointer'
          }}
        >

          <h2>
            Enrolled Courses
          </h2>

          <h1>
            {studentSummary.enrolledCourses}
          </h1>

        </div>

        {/* COMPLETED COURSES */}

        <div
          className="card"
          onClick={() =>
            window.location.href =
              '/progress'
          }
          style={{
            cursor: 'pointer'
          }}
        >

          <h2>
            Completed Courses
          </h2>

          <h1>
            {studentSummary.completedCourses}
          </h1>

        </div>

      </div>

    </div>

  );

}