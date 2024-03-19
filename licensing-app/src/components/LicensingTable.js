// LicensingTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from './PieChart';

// Define formatDateString function
const formatDateString = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Define calculateRemainingTime function
const calculateRemainingTime = (expirationDate) => {
  const expirationTime = new Date(expirationDate).getTime();
  const currentTime = new Date().getTime();
  const remainingTime = expirationTime - currentTime;

  // If license has expired
  if (remainingTime <= 0) {
    return "Expired";
  }

  // Convert remaining time to days
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  return remainingDays + " days";
};

const LicensingTable = () => {
  const [licensingData, setLicensingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/licensing-data')
      .then(response => {
        setLicensingData(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalCost = licensingData.reduce((acc, entry) => {
    const price = parseFloat(entry.Price.replace('$', ''));
    return isNaN(price) ? acc : acc + price;
  }, 0);

  return (
    <div className="container">
      <h2>Licensing Information</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Purchasing Date</th>
            <th>License Expiration Date</th>
            <th>Price</th>
            <th>Days Remaining</th>
          </tr>
        </thead>
        <tbody>
          {licensingData.map(entry => (
            <tr key={entry.Team}>
              <td>{entry.Team}</td>
              <td>{formatDateString(entry['Purchasing Date'])}</td>
              <td>{formatDateString(entry['License Expiration Date'])}</td>
              <td>{entry.Price}</td>
              <td className={calculateRemainingTime(entry['License Expiration Date']) === "Expired" ? "expired" : ""}>{calculateRemainingTime(entry['License Expiration Date'])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ color: 'green' }}>
        <h1>Total Cost: ${totalCost.toFixed(2)}</h1>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Company Cost Overview</h2>
        {/* Render PieChart component */}
        <PieChart licensingData={licensingData} />
      </div>
    </div>
  );
};

export default LicensingTable;
