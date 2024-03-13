import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
const formatDateString = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
 
const calculateRemainingTime = (expirationDate) => {
  const expirationTime = new Date(expirationDate).getTime();
  const currentTime = new Date().getTime();
  const remainingTime = expirationTime - currentTime;
 
  // Convert remaining time to days
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
 
  return remainingDays;
};
 
const LicensingTable = () => {
  const [licensingData, setLicensingData] = useState([]);
 
  useEffect(() => {
    // Make a GET request to your backend API
axios.get('http://localhost:3001/licensing-data')
      .then(response => setLicensingData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
 
  return (
    <div>
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
              <td>{calculateRemainingTime(entry['License Expiration Date'])} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default LicensingTable