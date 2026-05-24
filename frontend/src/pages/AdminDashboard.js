import { useEffect, useState } from 'react';

import axios from 'axios';

export default function AdminDashboard() {

  const [summary, setSummary] = useState({

    totalCourses: 0,

    totalStudents: 0,

    totalEnrollments: 0,

    completedCourses: 0

  });

  useEffect(() => {

    fetchSummary();

  }, []);

  const fetchSummary = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/dashboard/summary'
      );

      setSummary(res.data);

    } catch (err) {

      console.log(err);

    }

  };

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
            window.location.href = '/courses'
          }
          style={{
            cursor: 'pointer'
          }}
        >

          <h2>Total Courses</h2>

          <h1>
            {summary.totalCourses}
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
            {summary.totalStudents}
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
            {summary.totalEnrollments}
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
            {summary.completedCourses}
          </h1>

          <p>
            Click to view completed students
          </p>

        </div>

      </div>

    </div>

  );

}