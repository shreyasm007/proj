// // LicenseGraphWithData.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LicenseGraph from './LicenseGraph';

// const LicenseGraphWithData = () => {
//   const [licensingData, setLicensingData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:3001/licensing-data')
//       .then(response => {
//         const sortedData = response.data.sort((a, b) => {
//           const remainingTimeA = new Date(a['License Expiration Date']).getTime() - new Date().getTime();
//           const remainingTimeB = new Date(b['License Expiration Date']).getTime() - new Date().getTime();
//           return remainingTimeA - remainingTimeB;
//         });
//         setLicensingData(sortedData);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError('An error occurred while fetching data. Please try again later.');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (licensingData.length === 0) {
//     return <div>No data available for displaying. Please upload data first.</div>;
//   }

//   return <LicenseGraph licensingData={licensingData} loading={loading} />;
// };

// export default LicenseGraphWithData;
