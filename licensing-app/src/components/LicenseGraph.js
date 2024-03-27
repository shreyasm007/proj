import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const LicenseGraph = () => {
  const [licensingData, setLicensingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

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
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const parentWidth = chartRef.current.parentElement.clientWidth;
        const parentHeight = chartRef.current.parentElement.clientHeight;
        setChartDimensions({ width: parentWidth, height: parentHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
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
                return Math.max(remainingTime / (1000 * 60 * 60 * 24 * 30), 0); // Convert milliseconds to months, ensure non-negative value
              }),
              backgroundColor: licensingData.map(entry => {
                const remainingTime = new Date(entry['License Expiration Date']).getTime() - new Date().getTime();
                return remainingTime / (1000 * 60 * 60 * 24 * 30) < 3 ? 'rgba(255, 0, 0, 0.6)' : 'rgba(54, 162, 235, 0.6)';
              }),
              borderColor: licensingData.map(entry => {
                const remainingTime = new Date(entry['License Expiration Date']).getTime() - new Date().getTime();
                return remainingTime / (1000 * 60 * 60 * 24 * 30) < 3 ? 'rgba(255, 0, 0, 1)' : 'rgba(54, 162, 235, 1)';
              }),
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
                text: 'Remaining Time (months)',
              },
              ticks: {
                callback: function(value, index, values) {
                  return `${Math.floor(value)} months`; // Show remaining time in months without decimals
                }
              }
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const dataIndex = context.dataIndex;
                  const entry = licensingData[dataIndex];
                  const remainingTime = new Date(entry['License Expiration Date']).getTime() - new Date().getTime();
                  const remainingMonths = Math.max(remainingTime / (1000 * 60 * 60 * 24 * 30), 0); // Convert milliseconds to months, ensure non-negative value
                  return remainingMonths < 0 ? 'Expired' : `${Math.ceil(remainingMonths)} months`;
                }
              }
            }
          }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (licensingData.length === 0) {
    return <div className="no-data-message">No data available for displaying. Please upload data first.</div>;
  }

  return (
    <div className="license-graph" style={{ width: '100%', height: '500px' }}>
      <h2>Licensing Data Graph</h2>
      <div style={{ width: '100%', height: '100%' }}>
        <canvas ref={chartRef} width={chartDimensions.width} height={chartDimensions.height}></canvas>
      </div>
    </div>
  );
};

export default LicenseGraph;
