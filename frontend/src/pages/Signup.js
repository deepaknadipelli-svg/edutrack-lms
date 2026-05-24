import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        'https://edutrack-lms-w3bg.onrender.com/api/signup',
        formData
      );

      alert(res.data.message);

      navigate('/login');

    } catch (err) {

      alert(
        err.response?.data?.error ||
        'Signup failed'
      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          onChange={handleChange}
        >

          <option value="student">
            Student
          </option>

          <option value="instructor">
            Instructor
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button type="submit">
          Signup
        </button>

      </form>

    </div>

  );

}