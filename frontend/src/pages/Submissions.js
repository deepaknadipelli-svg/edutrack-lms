import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Submissions() {

  const [submissions, setSubmissions] = useState([]);

  const [marks, setMarks] = useState({});

  const [feedback, setFeedback] = useState({});

  useEffect(() => {

    fetchSubmissions();

  }, []);

  const fetchSubmissions = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/submissions'
      );

      setSubmissions(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const reviewSubmission = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/submissions/${id}/review`,
        {
          marks: marks[id],
          feedback: feedback[id],
          status: 'Reviewed'
        }
      );

      alert('Submission Reviewed');

      fetchSubmissions();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div style={{ padding: '40px' }}>

      <h1>Student Submissions</h1>

      {submissions.length === 0 ? (

        <p>No submissions found</p>

      ) : (

        submissions.map((sub) => (

          <div
            key={sub.id}
            style={{
              background: 'white',
              padding: '20px',
              marginTop: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >

            <h2>
              Student: {sub.studentName}
            </h2>

            <p>
              Assignment ID: {sub.assignmentId}
            </p>

            <p>
              Status:
              {' '}
              <strong>
                {sub.status || 'Submitted'}
              </strong>
            </p>

            <p>
              Marks:
              {' '}
              {sub.marks ?? 'Not Graded'}
            </p>

            <p>
              Feedback:
              {' '}
              {sub.feedback || 'No Feedback'}
            </p>

            {/* DOWNLOAD FILE */}

            {sub.fileUrl && (

              <a
                href={`http://localhost:5000/uploads/${sub.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  color: '#4f46e5',
                  fontWeight: 'bold'
                }}
              >
                Download Submission
              </a>

            )}

            {/* REVIEW FORM */}

            <div style={{ marginTop: '20px' }}>

              <input
                type="number"
                placeholder="Enter Marks"
                value={marks[sub.id] || ''}
                onChange={(e) =>
                  setMarks({
                    ...marks,
                    [sub.id]: e.target.value
                  })
                }
                style={{
                  padding: '10px',
                  width: '200px',
                  marginRight: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />

              <textarea
                placeholder="Enter Feedback"
                value={feedback[sub.id] || ''}
                onChange={(e) =>
                  setFeedback({
                    ...feedback,
                    [sub.id]: e.target.value
                  })
                }
                style={{
                  display: 'block',
                  marginTop: '10px',
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />

              <button
                onClick={() =>
                  reviewSubmission(sub.id)
                }
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Review Submission
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  );

}