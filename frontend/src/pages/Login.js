import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
        'https://edutrack-lms-w3bg.onrender.com/api/login',
        formData
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'role',
        res.data.role
      );

      localStorage.setItem(
        'name',
        res.data.name
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          name: res.data.name,
          role: res.data.role
        })
      );

      alert('Login successful');

      navigate('/');

    } catch (err) {

      alert(
        err.response?.data?.error ||
        'Login failed'
      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

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

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}