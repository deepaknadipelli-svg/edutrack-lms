import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';

import Signup from './pages/Signup';
import Login from './pages/Login';

import AdminDashboard from './pages/AdminDashboard';

import InstructorDashboard from './pages/InstructorDashboard';

import Assignments from './pages/Assignments';

import Submissions from './pages/Submissions';

import Progress from './pages/Progress';

import AdminStudents from './pages/AdminStudents';

import AdminEnrollments from './pages/AdminEnrollments';

import CompletedCourses from './pages/CompletedCourses';

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* STUDENT */}

        <Route
          path="/enrollments"
          element={
            <ProtectedRoute
              allowedRoles={[
                'student',
                'admin',
                'instructor'
              ]}
            >
              <Enrollments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute
              allowedRoles={['student']}
            >
              <Assignments />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* INSTRUCTOR */}

        <Route
          path="/instructor"
          element={
            <ProtectedRoute
              allowedRoles={['instructor']}
            >
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submissions"
          element={
            <ProtectedRoute
              allowedRoles={['instructor']}
            >
              <Submissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute
              allowedRoles={['student']}
            >
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={<AdminStudents />}
        />

        <Route
          path="/admin/enrollments"
          element={<AdminEnrollments />}
        />

        <Route
          path="/admin/completed-courses"
          element={<CompletedCourses />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;