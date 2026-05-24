import { Link } from 'react-router-dom';

export default function Navbar() {

  const role =
    localStorage.getItem('role');

  const name =
    localStorage.getItem('name');

  const logout = () => {

    localStorage.clear();

    window.location.href =
      '/login';

  };

  return (

    <nav className="navbar">

      <h2>
        EduTrack LMS
      </h2>

      <div>

        {/* DASHBOARD */}

        <Link to="/">
          Dashboard
        </Link>

        {/* STUDENT */}

        {role === 'student' && (
          <>

            <Link to="/courses">
              Courses
            </Link>

            <Link to="/progress">
              Progress
            </Link>

            <Link to="/enrollments">
              Enrollments
            </Link>

            <Link to="/assignments">
              Assignments
            </Link>

          </>
        )}

        {/* INSTRUCTOR */}

        {role === 'instructor' && (
          <>

            <Link to="/instructor">
              Instructor
            </Link>

            <Link to="/submissions">
              Submissions
            </Link>

          </>
        )}

        {/* ADMIN */}

        {role === 'admin' && (
          <>

            <Link to="/courses">
              Courses
            </Link>

            <Link to="/admin">
              Admin
            </Link>

          </>
        )}

        {/* AUTH LINKS */}

        {!role ? (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>

          </>

        ) : (

          <>

            <span
              style={{
                color: 'white',
                marginLeft: '20px',
                fontWeight: 'bold'
              }}
            >

              {name}

            </span>

            <button
              onClick={logout}
              style={{
                marginLeft: '20px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >

              Logout

            </button>

          </>

        )}

      </div>

    </nav>

  );

}