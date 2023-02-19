// react imports
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// utils
import './register.css';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      if (res.data) {
        navigate('/login');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='register'>
      <form className='register-form' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className='register-input'
          type='text'
          placeholder='Enter your Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className='register-input'
          type='email'
          placeholder='Enter your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className='register-input'
          type='password'
          placeholder='Enter your Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='register-button' type='submit'>
          Register
        </button>
      </form>
      <button className='register-login-button'>
        <Link to='/login' className='link'>
          Login
        </Link>
      </button>
      {error && (
        <span className='registration-error'>Something went wrong!</span>
      )}
    </div>
  );
}
