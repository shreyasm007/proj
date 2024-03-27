import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import CSS file for styling

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState(''); // Add state for role

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
        department,
        role // Include role in the data sent to the backend
      });
      console.log('Registration successful:', response.data);
      // Call the onRegister function passed as prop with the user data
      if (typeof onRegister === 'function') {
        onRegister(response.data.user, response.data.token);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form className="registration-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="role">Role:</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
