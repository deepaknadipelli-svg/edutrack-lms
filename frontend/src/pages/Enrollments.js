import { useEffect, useState } from 'react';
import axios from 'axios';

function Enrollments() {

  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {

    if (user) {

      axios
        .get(`https://edutrack-lms-w3bg.onrender.com/api/enrollments/${user.name}`)
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    }

  }, []);

  return (

    <div className="page">

      <h1>Enrolled Courses</h1>

      <div className="course-grid">

        {
          courses.length === 0 ? (

            <p>No enrolled courses</p>

          ) : (

            courses.map((course) => (

              <div className="course-card" key={course.id}>

                <h2>{course.title}</h2>

                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>

                <p>
                  <strong>Category:</strong> {course.category}
                </p>

                <p>
                  <strong>Duration:</strong> {course.duration}
                </p>

              </div>

            ))

          )
        }

      </div>

    </div>

  );

}

export default Enrollments;