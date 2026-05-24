import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://edutrack-lms-w3bg.onrender.com/api/courses')
      .then((res) => setCourses(res.data));
  }, []);

  const enroll = async (id) => {

    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      alert('Please login first');
      return;
    }
  
    try {
  
      const response = await axios.post(
        'https://edutrack-lms-w3bg.onrender.com/api/enrollments',
        {
          studentName: user.name,
          courseId: id
        }
      );
  
      alert(response.data.message);
  
    } catch (err) {
  
      console.log(err);
  
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert('Enrollment failed');
      }
  
    }
  
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Available Courses</h1>

      <input
        type="text"
        placeholder="Search by title or category..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="course-grid">

        {filteredCourses.map((course) => (

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

            <button onClick={() => enroll(course.id)}>
              Enroll
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}