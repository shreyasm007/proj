// PieChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ licensingData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    renderPieChart();
  }, []); // Empty dependency array ensures the effect runs only once

  const renderPieChart = () => {
    if (!chartRef.current && licensingData.length > 0) {
      const totalCost = licensingData.reduce((acc, entry) => {
        const price = parseFloat(entry.Price.replace('$', ''));
        return isNaN(price) ? acc : acc + price;
      }, 0);

      const teamNames = licensingData.map(entry => entry.Team);
      const totalCostsPerTeam = licensingData.map(entry => parseFloat(entry.Price.replace('$', '')));

      const pieChartCanvas = document.getElementById('pieChart');

      chartRef.current = new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: teamNames,
          datasets: [{
            label: 'Total Cost Per Team',
            data: totalCostsPerTeam,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              // Add more colors as needed
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  };

  return <canvas id="pieChart"></canvas>;
};

export default PieChart;
