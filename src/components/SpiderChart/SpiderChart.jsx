import React from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart } from 'chart.js';

// Custom plugin to draw images on radar chart points and styled labels
const customLabelPlugin = {
  id: 'customLabelPlugin',
  afterDatasetsDraw: (chart, args, options) => {
    const ctx = chart.ctx;
    const radius = chart.scales.r.drawingArea;
    const centerX = chart.scales.r.xCenter;
    const centerY = chart.scales.r.yCenter;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((point, index) => {
        // Draw image
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, point.x - 15, point.y - 15, 30, 30); // Adjust size and position
        };
        image.onerror = (err) => {
          console.error('Failed to load image:', dataset.pointImages[index], err);
        };
        image.src = dataset.pointImages[index];

        // Draw styled label
        const label = chart.data.labels[index];
        ctx.save();
        ctx.font = '600 14px "Poppins", Helvetica'; // Custom font style
        ctx.fillStyle = 'black'; // Custom text color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Split text into lines
        const maxWidth = 80; // Maximum width of each line
        const lines = splitTextIntoLines(ctx, label, maxWidth);

        const angle = (index / chart.data.labels.length) * (2 * Math.PI) - Math.PI / 2;
        const x = centerX + (radius + 1) * Math.cos(angle); // Adjust position
        const y = centerY + (radius + 1) * Math.sin(angle); // Adjust position
        lines.forEach((line, i) => {
          ctx.fillText(line, x, y + i * 16); // Adjust line height as needed
        });
        ctx.restore();
      });
    });
  }
};

// Helper function to split text into lines
function splitTextIntoLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

Chart.register(customLabelPlugin);

const RadarChart = ({ data }) => {
    console.log("SpiderChart data: ", data);
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.score),
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        pointBackgroundColor: 'rgba(34, 202, 236, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
        pointImages: data.map(item => item.image), // Custom property for images
      },
    ],
  };
  console.log("SpiderChart chartData: ", chartData.datasets[0].pointImages);

  const options = {
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 40,
        right: 40,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        pointLabels: {
          display: false, // Hide the original labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
