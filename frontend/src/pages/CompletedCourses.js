import { useEffect, useState } from 'react';

import axios from 'axios';

export default function CompletedCourses() {

  const [completed, setCompleted] =
    useState([]);

  useEffect(() => {

    fetchCompleted();

  }, []);

  const fetchCompleted = async () => {

    try {

      const res = await axios.get(
        'https://edutrack-lms-w3bg.onrender.com/api/admin/completed-courses'
      );

      setCompleted(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="page">

      <h1>
        Completed Courses
      </h1>

      {completed.map((item) => (

        <div
          key={item.id}
          className="card"
        >

          <h2>{item.studentName}</h2>

          <p>
            Course:
            {' '}
            {item.courseTitle}
          </p>

          <p>
            Progress:
            {' '}
            {item.progress}%
          </p>

        </div>

      ))}

    </div>

  );

}