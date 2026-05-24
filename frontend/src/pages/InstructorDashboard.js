import { useEffect, useState } from 'react';

import axios from 'axios';

export default function InstructorDashboard() {

  const [courses, setCourses] = useState([]);

  // COURSE FORM

  const [title, setTitle] = useState('');

  const [category, setCategory] = useState('');

  const [duration, setDuration] = useState('');

  // ASSIGNMENT FORM

  const [courseId, setCourseId] =
    useState('');

  const [assignmentTitle, setAssignmentTitle] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [dueDate, setDueDate] =
    useState('');

  const instructor =
    localStorage.getItem('name');

  useEffect(() => {

    fetchCourses();

  }, []);

 
  // FETCH COURSES

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        'https://edutrack-lms-w3bg.onrender.com/api/courses'
      );

      const instructorCourses =
        res.data.filter(
          (course) =>
            course.instructor === instructor
        );

      setCourses(instructorCourses);

    } catch (err) {

      console.log(err);

    }

  };

  // CREATE COURSE

  const createCourse = async () => {

    if (
      !title ||
      !category ||
      !duration
    ) {

      alert('Please fill all fields');

      return;

    }

    try {

      await axios.post(
        'https://edutrack-lms-w3bg.onrender.com/api/courses',
        {

          title,

          instructor,

          category,

          duration

        }
      );

      alert('Course Created');

      setTitle('');

      setCategory('');

      setDuration('');

      fetchCourses();

    } catch (err) {

      console.log(err);

    }

  };

  
  // CREATE ASSIGNMENT

  const createAssignment = async () => {

    if (
      !courseId ||
      !assignmentTitle ||
      !description ||
      !dueDate
    ) {

      alert('Please fill all fields');

      return;

    }

    try {

      await axios.post(
        'https://edutrack-lms-w3bg.onrender.com/api/assignments',
        {

          courseId,

          title: assignmentTitle,

          description,

          dueDate

        }
      );

      alert('Assignment Created');

      setAssignmentTitle('');

      setDescription('');

      setDueDate('');

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="container">

      <h1>
        Instructor Dashboard
      </h1>

      {/* CREATE COURSE */}

      <div className="course-card">

        <h2>
          Create Course
        </h2>

        <input
          type="text"
          placeholder="Course Title"
          className="search-box"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="search-box"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Duration"
          className="search-box"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
        />

        <button
          onClick={createCourse}
        >
          Create Course
        </button>

      </div>

      {/* CREATE ASSIGNMENT */}

      <div
        className="course-card"
        style={{
          marginTop: '30px'
        }}
      >

        <h2>
          Create Assignment
        </h2>

        <select
          className="search-box"
          value={courseId}
          onChange={(e) =>
            setCourseId(e.target.value)
          }
        >

          <option value="">
            Select Course
          </option>

          {courses.map((course) => (

            <option
              key={course.id}
              value={course.id}
            >

              {course.title}

            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="Assignment Title"
          className="search-box"
          value={assignmentTitle}
          onChange={(e) =>
            setAssignmentTitle(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Description"
          className="search-box"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          type="date"
          className="search-box"
          value={dueDate}
          onChange={(e) =>
            setDueDate(
              e.target.value
            )
          }
        />

        <button
          onClick={createAssignment}
        >
          Create Assignment
        </button>

      </div>

      {/* MY COURSES */}

      <h1
        style={{
          marginTop: '40px'
        }}
      >
        My Courses
      </h1>

      <div className="course-grid">

        {courses.map((course) => (

          <div
            key={course.id}
            className="course-card"
          >

            <h2>
              {course.title}
            </h2>

            <p>
              <strong>Category:</strong>
              {' '}
              {course.category}
            </p>

            <p>
              <strong>Duration:</strong>
              {' '}
              {course.duration}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}