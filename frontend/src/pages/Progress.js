import { useEffect, useState } from 'react';

import axios from 'axios';

import { jsPDF } from 'jspdf';

export default function Progress() {

  const [progress, setProgress] = useState([]);

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const studentName = user?.name;

  useEffect(() => {

    fetchProgress();

  }, []);

  const fetchProgress = async () => {

    try {

      const res = await axios.get(
        `https://edutrack-lms-w3bg.onrender.com/api/progress/${studentName}`
      );

      const uniqueCourses = [];

      const addedCourses = new Set();

      res.data.forEach((item) => {

        if (!addedCourses.has(item.courseId)) {

          uniqueCourses.push(item);

          addedCourses.add(item.courseId);

        }

      });

      setProgress(uniqueCourses);

    } catch (err) {

      console.log(err);

    }

  };

  // CERTIFICATE DOWNLOAD

  const generateCertificate = (courseTitle) => {

    const doc = new jsPDF();

    doc.setFontSize(26);

    doc.text(
      'Certificate of Completion',
      45,
      40
    );

    doc.setFontSize(18);

    doc.text(
      `This certifies that`,
      75,
      80
    );

    doc.setFontSize(22);

    doc.text(
      studentName,
      80,
      100
    );

    doc.setFontSize(18);

    doc.text(
      `has successfully completed`,
      50,
      130
    );

    doc.setFontSize(20);

    doc.text(
      courseTitle,
      55,
      150
    );

    doc.setFontSize(14);

    doc.text(
      `EduTrack LMS`,
      90,
      220
    );

    doc.save(
      `${courseTitle}-certificate.pdf`
    );

  };

  return (

    <div className="page">

      <h1>
        Course Progress
      </h1>

      {progress.map((item) => (

        <div
          key={item.id}
          className="card"
        >

          <h2>
            {item.courseTitle}
          </h2>

          <p>
            Progress: {item.progress}%
          </p>

          {/* PROGRESS BAR */}

          <div
            style={{
              width: '100%',
              background: '#ddd',
              height: '20px',
              borderRadius: '10px',
              marginTop: '10px'
            }}
          >

            <div
              style={{
                width: `${item.progress}%`,
                background:
                  item.progress === 100
                    ? 'green'
                    : '#4f46e5',
                height: '100%',
                borderRadius: '10px'
              }}
            />

          </div>

          {/* CERTIFICATE BUTTON */}

          {item.progress === 100 && (

            <button
              onClick={() =>
                generateCertificate(
                  item.courseTitle
                )
              }
              style={{
                marginTop: '20px'
              }}
            >
              Download Certificate
            </button>

          )}

        </div>

      ))}

    </div>

  );

}