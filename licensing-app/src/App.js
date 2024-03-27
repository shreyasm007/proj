import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LicenseGraph from './components/LicenseGraph'; // Import LicenseGraphWithData
import LicensingTable from './components/LicensingTable'; // Import LicensingTable
import UploadExcelFile from './components/UploadExcelFile';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/upload" element={<UploadExcelFile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const Home = () => (
  <>
    <LicenseGraph />
    <LicensingTable />
  </>
);

export default App;
