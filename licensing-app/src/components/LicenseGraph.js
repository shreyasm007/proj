import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart from Chart.js library

const LicenseGraph = () => {
  const [licensingData, setLicensingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/licensing-data')
      .then(response => {
        console.log('Response data:', response.data);
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

  useEffect(() => {
    const renderChart = (chartRef) => {
      const chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: licensingData.map(entry => entry.Team),
          datasets: [
            {
              label: 'Remaining Time',
              data: licensingData.map(entry => {
                const remainingTime = new Date(entry['License Expiration Date']).getTime() - new Date().getTime();
                return Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
              }),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Remaining Time (days)',
              },
            },
          },
        },
      });
      return chartInstance;
    };

    if (!loading && licensingData.length > 0) {
      const chartInstance = renderChart(chartRef);
      return () => {
        chartInstance.destroy();
      };
    }
  }, [loading, licensingData]);

  return (
    <div className="license-graph">
      <h2>Licensing Data Graph</h2>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default LicenseGraph;
