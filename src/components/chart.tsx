import React from "react";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { useAuth0 } from "@auth0/auth0-react";
import useStrengths from "../hooks/useStrengths";
import { Strength } from "../types";
import StrengthsIcons from "../utils/strengthsIcons.json";

const options = {
  layout: {
    padding: {
      top: 50,
      bottom: 30,
      left: 90,
      right: 90,
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
        display: false,  // Hides the labels
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
  maintainAspectRatio: false,
};

const iconPositions = [
  { top: "30%", left: "50%" },  // Top center (Strategic)
  { top: "48%", right: "0%" },  // Right middle (Activator)
  { bottom: "2%", left: "34%" },  // Bottom center (Command)
  { bottom: "2%", right: "13%" },  // Right bottom (Learner)
  { top: "48%", left: "20%" },  // Left middle (Connectedness)
];

export const icons = StrengthsIcons

const RadarChart = ({ uuid }: { uuid: string }) => {
  const { user } = useAuth0();
  const strengths = useStrengths(user?.tenantId!, uuid);

  // Ensure data includes all strength scores, including "Learner"
  const data = Array.isArray(strengths)
    ? strengths?.map((strength: Strength) => ({
        name: strength.strength_name || strength.strengths_name,
        image: icons[strength.strengths_name || strength.strength_name]["image"] || icons.Default,
        score: strength.score ?? 0, // Fallback to 0 if no score
      }))
    : [];

  const chartData = {
    labels: data?.map((item) => item.name),
    datasets: [
      {
        data: data?.map((item) => item.score),
        fill: true,
        backgroundColor: "rgba(0, 115, 234, 0.35)",
        borderColor: "#0073EA",
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="relative w-[50%] border border-primary-border rounded-[16px] pt-[12px] px-2 bg-[#FFCB00/20]">
      <h3 className="text-heading font-semibold text-[16px]">Top personality</h3>
      <div className="-mt-3">
        <Radar data={chartData} options={options} height="320px" style={{ width: "100%", height: "320px" }} />
      </div>

      {/* Render the icons and labels */}
      {data.slice(0, 5).map((item, index) => (
        <div
          key={item.name}
          title={StrengthsIcons[item.name]["description"]}
          style={{
            position: "absolute",
            ...iconPositions[index],
            transform: "translate(-50%, -50%)",  // Center icon and text at the position
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <img src={item.image} alt={item.name} style={{ width: "35px", height: "35px", marginBottom: "4px" }} />
          <p style={{ marginTop: "-10px", fontSize: "12px", fontWeight: "bold" }}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default RadarChart;
