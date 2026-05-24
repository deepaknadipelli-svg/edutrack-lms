import { useEffect, useState } from 'react';

import axios from 'axios';

export default function AdminEnrollments() {

  const [enrollments, setEnrollments] =
    useState([]);

  useEffect(() => {

    fetchEnrollments();

  }, []);

  const fetchEnrollments = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/admin/enrollments'
      );

      setEnrollments(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="page">

      <h1>
        Student Enrollments
      </h1>

      {enrollments.map((item) => (

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

        </div>

      ))}

    </div>

  );

}