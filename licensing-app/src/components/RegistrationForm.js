// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import CSS file for styling

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role is 'employee'
  const [department, setDepartment] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
        role,
        department // Include department in the registration data
      });
      console.log('Registration successful:', response.data);
      // Optionally, you can display a success message or redirect the user to another page
    } catch (error) {
      console.error('Error registering user:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form className="registration-form">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
