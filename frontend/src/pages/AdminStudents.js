import { useEffect, useState } from 'react';

import axios from 'axios';

export default function AdminStudents() {

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/admin/students'
      );

      setStudents(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="page">

      <h1>
        Registered Students
      </h1>

      {students.map((student) => (

        <div
          key={student.id}
          className="card"
        >

          <h2>{student.name}</h2>

          <p>{student.email}</p>

        </div>

      ))}

    </div>

  );

}