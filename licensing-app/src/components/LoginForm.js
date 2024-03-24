// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import CSS file for styling

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      // Optionally, you can set up authentication state (e.g., JWT token) and redirect the user
      // For now, just call the onLogin function passed as prop
      if (typeof onLogin === 'function') {
        onLogin(response.data.user);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
