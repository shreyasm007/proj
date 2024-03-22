// Navbar.js

import React from 'react';
import './Navbar.css'; // Import CSS file for navbar styling
import logo from "./logo.jpg";
import logo2 from "./logo2.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-section">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </div>
        <div className="title">
          <h1>Emerson Innovation Center, Pune</h1>
        </div>
      </div>
      
      <div className="right-section">
        <div className='nav-links li'>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
        
        <div className="logo2">
          <img src={logo2} alt="Logo2" style={{ height: '25px' }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
