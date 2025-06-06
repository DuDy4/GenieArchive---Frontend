import React, { useRef, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { useAuth0 } from "@auth0/auth0-react";
import useStrengths from "../hooks/useStrengths";
import { Strength } from "../types";
import StrengthsIcons from "../utils/StrengthsIcons.json";
import { hexToRGBA } from "../utils/colorsUtils";

const options = {
  layout: {
    padding: {
      top: 10,
      bottom: 10,
      left: 40,
      right: 40,
    },
  },
  elements: {
    line: {
      borderWidth: 1.5,
      fill: "#000",
    },
    point: {
      pointStyle: 'circle',
      radius: 5,
      hoverRadius: 7,

    },
  },
  responsive: true,
  scales: {
    r: {
      min: 50,  // Set minimum value for the scale
      max: 100, // Optional: Set a maximum value if you want
      angleLines: {
        color: "#ccc",  // Lighter angle lines
      },
      grid: {
        color: "#ccc",  // Lighter grid lines
      },
      ticks: {
        display: false,  // Hide tick labels (optional)
      },
      pointLabels: {
        font: {
          size: 14,
        },
        display: false,
        color: '#ddd', // Adjust point label color
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
          return `Score: ${context.raw}`;
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const calculateIconPosition = (angle, radius, canvasWidth, canvasHeight) => {
  const radians = (angle * Math.PI) / 180;
  const x = canvasWidth / 2 + radius * Math.cos(radians);
  const y = canvasHeight / 2 + radius * Math.sin(radians);
  return { x, y };
};

const iconData = [
  { angle: -76, radius: 0.36 },      // Top center
  { angle: -7, radius: 0.52 },       // Top right
  { angle: 55, radius: 0.57 },       // Bottom right
  { angle: 112, radius: 0.51 },      // Bottom left
  { angle: 187, radius: 0.39 },      // Top left
];

export const icons = StrengthsIcons;

interface Strength {
  strength_name: string;
  reasoning: string;
  score: number;
}

interface RadarChartProps {
  color: string;
  strengths?: Strength[];
}

const RadarChart: React.FC<RadarChartProps> = ({ strengths, color }) => {
  const { user } = useAuth0();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);

  console.log("Strengths: ", strengths);

  const data = Array.isArray(strengths)
    ? strengths?.map((strength: Strength) => {
        const strengthKey = strength.strength_name ? strength.strength_name.split(" ")[0] : "";
        const icon = icons[strengthKey] || icons.Default; // Default icon if not found

        return {
          name: strengthKey,
          image: icon ? icon.image : "",
          description: icon ? icon.description : "",
          score: strength.score ?? 0,
        };
      })
    : [];

  const chartData = {
    labels: data?.map((item) => item.name),
    datasets: [
      {
        data: data?.map((item) => item.score),
        fill: true,
        backgroundColor: hexToRGBA(color ? color : "#0073EA", 0.35),
        borderColor: color ? color : "#0073EA",
        pointRadius: 5, // Make points visible
        pointHoverRadius: 7,
        pointBackgroundColor: color ? color : "#0073EA", // Point color
      },
    ],
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const canvasElement = canvasRef.current;
        setCanvasSize({
          width: canvasElement.clientWidth,
          height: canvasElement.clientHeight,
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize); // Handle resize events

    return () => window.removeEventListener('resize', updateCanvasSize); // Cleanup
  }, []);

  return (
      <div className="flex flex-col justify-between gap-4 pr-7 pb-4 pl-7 bg-white border border-primary-border rounded-[16px]">
      <div className="flex flex-col relative items-center justify-between gap-4 pt-[12px] px-2 bg-[#FFCB00/20] bg-white" style={{ height: '100%' }}>
        <p className="flex flex-row justify-center">
          <h3 className="text-heading text-center self-center font-semibold text-[16px]">Top 5 personal strengths</h3>
        </p>
        <div ref={canvasRef} className="" style={{ height: "200px", width: "200px" }}>
          <Radar data={chartData} options={options} height="200px" style={{ width: "100%", height: "100%" }} ></Radar>
          {iconData.map((item, index) => {
              const { x, y } = calculateIconPosition(item.angle, item.radius * canvasSize.width, canvasSize.width, canvasSize.height);
              const currentStrength = data[index];

              if (!currentStrength) return null;

              return (
                <div
                  key={currentStrength.name}
                  title={currentStrength.description}
                  style={{
                    position: "absolute",
                    left: `${x -8}px`,
                    top: `${y + 53}px`,
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img src={currentStrength.image} alt={currentStrength.name} style={{ width: "35px", height: "35px", marginBottom: "4px" }} />
                  <p style={{ marginTop: "-10px", fontSize: "12px", fontWeight: "bold" }}>{currentStrength.name}</p>
                </div>
              );})}

        </div>
        </div>


      </div>
    );
  };

export default RadarChart;
