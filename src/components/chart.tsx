import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";

const customLabelPlugin = {
  id: "customLabelPlugin",
  afterDatasetsDraw: (chartInstance: any) => {
    const ctx = chartInstance.ctx;
    const radius = chartInstance.scales.r.drawingArea;
    const centerX = chartInstance.scales.r.xCenter;
    const centerY = chartInstance.scales.r.yCenter;

    chartInstance.data.datasets.forEach((dataset: any, datasetIndex: any) => {
      const meta = chartInstance.getDatasetMeta(datasetIndex);
      meta.data.forEach((_: any, index: any) => {
        const image = new Image();
        image.src = dataset.pointImages[index];

        // Calculate position for the label
        const angle =
          (index / chartInstance.data.labels.length) * (2 * Math.PI) -
          Math.PI / 2;
        const basePositionOffset = 90;
        const iconSize = 35;
        const textOffset = 10; // Space between icon and text
        const totalHeight = iconSize + textOffset; // Total height for icon and text
        const x =
          centerX +
          (radius + basePositionOffset - totalHeight) * Math.cos(angle);
        const yForLabel =
          centerY +
          (radius + basePositionOffset - totalHeight) * Math.sin(angle);

        // position for the icon
        const yForIcon = yForLabel - iconSize;

        ctx.drawImage(
          image,
          x - iconSize / 2,
          yForIcon - iconSize / 2,
          iconSize,
          iconSize
        ); // Center the icon above the label

        // Draw the label below the icon
        const labelText = chartInstance.data.labels[index];
        ctx.save();
        ctx.font = '600 14px "Poppins", Helvetica';
        ctx.fillStyle = "black";
        // ctx.color = "#37455C";
        ctx.textAlign = "center"; // Center text horizontally
        ctx.textBaseline = "top"; // Align text to start just below the icon
        ctx.fillText(labelText, x, yForLabel); // Draw the label below the icon

        ctx.restore();
      });
    });
  },
};

Chart.register(customLabelPlugin);

const options = {
  layout: {
    padding: {
      top: 80,
      bottom: 40,
      left: 80,
      right: 80,
    },
  },
  elements: {
    line: {
      borderWidth: 1.5,
      fill: "#000",
    },
  },
  responsive: true,
  scales: {
    r: {
      max: 5,
      suggestedMax: 5,
      angleLines: {
        color: "#505050",
      },
      ticks: {
        display: false, // Hide the scale values
        steps: 5,
      },
      grid: {
        color: "#505050",
      },
      pointLabels: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.label}: ${context.raw}`;
        },
      },
    },
  },
};

const RadarChart = () => {
  const data = [
    {
      name: "Achiever",
      image: "/images/acheiver-image.png",
      score: 5,
    },
    {
      name: "Command",
      image: "/images/command-image.png",
      score: 0,
    },
    {
      name: "Focus",
      image: "/images/focus-image.png",
      score: 4,
    },
    {
      name: "Futuristic",
      image: "/images/futuristic-image.png",
      score: 3,
    },
    {
      name: "Developer",
      image: "/images/developer-image.png",
      score: 2,
    },
  ];

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.score),
        fill: true,
        backgroundColor: "rgb(255 203 0 / 0.2)",
        borderColor: "#FFCB00",
        pointImages: data.map((item) => item.image), // Custom property for images
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="w-[50%] border border-primary-border rounded-[16px] pt-[12px] pb-[12px] px-2 bg-[#FFCB00/20">
      <h3 className="text-heading font-semibold text-[16px]">
        Top personality
      </h3>

      <div className="">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
