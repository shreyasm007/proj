// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LicensingTable from './components/LicensingTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LicenseGraph from './components/LicenseGraph';
import UploadExcelFile from './components/UploadExcelFile';

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
function App() {
  const [licensingData, setLicensingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/licensing-data')
      .then(response => {
        const sortedData = response.data.sort((a, b) => {
          const remainingTimeA = new Date(a['License Expiration Date']).getTime() - new Date().getTime();
          const remainingTimeB = new Date(b['License Expiration Date']).getTime() - new Date().getTime();
          return remainingTimeA - remainingTimeB;
        });
        setLicensingData(sortedData);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<><LicenseGraph licensingData={licensingData} loading={loading} /><LicensingTable /></>} />
          <Route path='/register' element={<RegistrationForm></RegistrationForm>}/>
          <Route path='/login' element={<LoginForm></LoginForm>}></Route>
          <Route path="/upload" element={<UploadExcelFile />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
