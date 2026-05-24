import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Assignments() {

  const [assignments, setAssignments] = useState([]);

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const studentName = user?.name;

  useEffect(() => {

    const fetchAssignments = async () => {

      try {

        // GET ENROLLED COURSES

        const enrollmentsRes = await axios.get(
          `http://localhost:5000/api/enrollments/${studentName}`
        );

        const enrolledCourses = enrollmentsRes.data;

        // GET STUDENT ASSIGNMENTS

        const assignmentsRes = await axios.get(
          `http://localhost:5000/api/student-assignments/${studentName}`
        );

        // FILTER ASSIGNMENTS ONLY FOR ENROLLED COURSES

        const filteredAssignments =
          assignmentsRes.data.filter((assignment) =>

            enrolledCourses.some(
              (course) =>
                course.courseId === assignment.courseId
            )

          );

        setAssignments(filteredAssignments);

      } catch (err) {

        console.log(err);

      }

    };

    fetchAssignments();

  }, [studentName]);

  // ==========================
  // SUBMIT ASSIGNMENT
  // ==========================

  const submitAssignment = async (
    assignmentId
  ) => {

    const fileInput =
      document.getElementById(
        `file-${assignmentId}`
      );

    const file = fileInput.files[0];

    if (!file) {

      alert('Please choose a file');

      return;

    }

    const formData = new FormData();

    formData.append(
      'assignmentId',
      assignmentId
    );

    formData.append(
      'studentName',
      studentName
    );

    formData.append(
      'file',
      file
    );

    try {

      await axios.post(
        'http://localhost:5000/api/submissions',
        formData
      );

      alert('Assignment submitted');

      window.location.reload();

    } catch {

      alert('Submission failed');

    }

  };

  return (

    <div className="container">

      <h1>Assignments</h1>

      {assignments.length === 0 ? (

        <div
          style={{
            textAlign: 'center',
            marginTop: '100px'
          }}
        >

          <h2>
            No Assignments Scheduled
          </h2>

          <p>
            Enroll in a course to
            view assignments.
          </p>

        </div>

      ) : (

        <div className="course-grid">

          {assignments.map((assignment) => (

            <div
              className="course-card"
              key={assignment.id}
            >

              <h2>
                {assignment.title}
              </h2>

              <p>
                <strong>Course:</strong>
                {' '}
                {assignment.courseTitle}
              </p>

              <p>
                <strong>Description:</strong>
                {' '}
                {assignment.description}
              </p>

              <p>
                <strong>Due Date:</strong>
                {' '}
                {assignment.dueDate}
              </p>

              {/* STATUS */}

              <p>
                <strong>Status:</strong>
                {' '}
                {assignment.status || 'Pending'}
              </p>

              {/* MARKS */}

              <p>
                <strong>Marks:</strong>
                {' '}
                {
                  assignment.marks ??
                  'Not Graded'
                }
              </p>

              {/* FEEDBACK */}

              <p>
                <strong>Feedback:</strong>
                {' '}
                {
                  assignment.feedback ||
                  'No Feedback'
                }
              </p>

              {/* FILE INPUT */}

              <input
                type="file"
                id={`file-${assignment.id}`}
              />

              {/* SUBMIT BUTTON */}

              <button
                onClick={() =>
                  submitAssignment(
                    assignment.id
                  )
                }
              >
                Submit Assignment
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}