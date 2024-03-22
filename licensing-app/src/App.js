import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import LicensingTable from './components/LicensingTable';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import LicenseGraph from './components/LicenseGraph';

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
    <>
      <Navbar />
      <div className="App">
        <LicensingTable />
        <LicenseGraph licensingData={licensingData} loading={loading} />
      </div>
      <Footer />
    </>
  );
}

export default App;
