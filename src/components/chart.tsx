import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import useStrengths from "../hooks/useStrengths";
import { Strength } from "../types";
import LeaderImage from "../../public/images/command-image.png";
// import { useAuth } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react"

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
        const basePositionOffset = index===0? 60 : 80;
        const iconSize = 35;
        const textOffset = 0; // Space between icon and text
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
        ctx.font = '600 10px "Poppins", Helvetica';
        ctx.fillStyle = "black";
        // ctx.color = "#37455C";
        ctx.textAlign = "center";
        // ctx.whiteSpace = "wrap" // Center text horizontally
        ctx.textBaseline = "top"; // Align text to start just below the icon
        // ctx.fillText(labelText, x, yForLabel); // Draw the label below the icon

        // Text wrapping logic
        const maxWidth = 70; // Maximum width for text area
        const words = labelText.split(" ");
        let currentLine = "";
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = currentLine + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(currentLine);
            currentLine = words[n] + " ";
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        // Now draw each line separately
        ctx.textAlign = "center"; // Center align text
        lines.forEach((line, i) => {
          ctx.fillText(line, x, yForLabel + i * 10); // Adjust y position for each line
        });
        ctx.restore();
      });
    });
  },
};

Chart.register(customLabelPlugin);

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
      angleLines: {
        color: "#505050",
      },
      ticks: {
        display: false,
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
  maintainAspectRatio: false,
};

export const icons = {
  Achiever:
    "https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/champion-winner-trophy-icon.png",
  Activator:
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/head-idea-icon.png",
  Adaptability:
    "https://uxwing.com/wp-content/themes/uxwing/download/controller-and-music/control-panel-icon.png",
  Analytical:
    "https://uxwing.com/wp-content/themes/uxwing/download/banking-finance/audit-icon.png",
  Arranger:
    "https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/dependency-icon.png",
  Belief:
    "https://uxwing.com/wp-content/themes/uxwing/download/relationship-love/care-icon.png",
  Command:
    "https://uxwing.com/wp-content/themes/uxwing/download/tools-equipment-construction/tools-icon.png",
  Communication:
    "https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/speaking-bubbles-line-icon.png",
  Competition:
    "https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/first-medal-icon.png",
  Connectedness:
    "https://uxwing.com/wp-content/themes/uxwing/download/medical-science-lab/atom-laboratory-science-icon.png",
  Consistency:
    "https://uxwing.com/wp-content/themes/uxwing/download/weather/water-wave-icon.png",
  Context:
    "https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/globe-line-icon.png",
  Deliberative:
    "https://uxwing.com/wp-content/themes/uxwing/download/logistics-shipping-delivery/distribution-icon.png",
  Developer:
    "https://uxwing.com/wp-content/themes/uxwing/download/toys-childhood/toy-block-icon.png",
  Discipline:
    "https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/quick-icon.svg",
  Empathy:
    "https://uxwing.com/wp-content/themes/uxwing/download/relationship-love/hobbies-like-icon.png",
  Focus:
    "https://uxwing.com/wp-content/themes/uxwing/download/seo-marketing/target-line-icon.png",
  Futuristic:
    "https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/bulb-exclamation-mark-icon.png",
  Harmony:
    "https://uxwing.com/wp-content/themes/uxwing/download/nature-and-environment/earth-environment-care-icon.png",
  Ideation:
    "https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/idea-icon.png",
  Includer:
    "https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/four-corners-arrows-line-icon.png",
  Individualization:
    "https://uxwing.com/wp-content/themes/uxwing/download/crime-security-military-law/evidence-icon.png",
  Input:
    "https://uxwing.com/wp-content/themes/uxwing/download/user-interface/underlined-check-line-icon.png",
  Intellection:
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/psychology-icon.png",
  Learner:
    "https://uxwing.com/wp-content/themes/uxwing/download/education-school/knowledge-icon.png",
  Maximizer:
    "https://uxwing.com/wp-content/themes/uxwing/download/household-and-furniture/stair-up-icon.png",
  Positivity:
    "https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/pinch-easy-icon.png",
  Relator:
    "https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/teamwork-together-icon.png",
  Responsibility:
    "https://uxwing.com/wp-content/themes/uxwing/download/internet-network-technology/digital-icon.png",
  Restorative:
    "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/product-launch-release-icon.png",
  "Self-Assurance":
    "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/person-insurance-icon.png",
  Significance:
    "https://uxwing.com/wp-content/themes/uxwing/download/clothes-and-accessories/diamond-gem-icon.png",
  Strategic:
    "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/hand-shake-icon.png",
  Woo: "https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/clap-icon.svg",
  Default:
    "https://uxwing.com/wp-content/themes/uxwing/download/tools-equipment-construction/setting-line-icon.png",
  Leadership: LeaderImage,
};

const RadarChart = ({ uuid }: { uuid: string }) => {
  const { user } = useAuth0();
  const strengths = useStrengths(user?.tenantId!, uuid);
  // console.log(strengths)
  const data = Array.isArray(strengths) ? strengths?.map((strength: Strength) => ({
    name: strength.strength_name || strength.strengths_name,
    image: icons[strength.strengths_name || strength.strength_name] || icons.Default,
    score: strength.score,
  })) : [];

  const chartData = {
    labels: data?.map((item) => item.name),
    datasets: [
      {
        data: data?.map((item) => item.score),
        fill: true,
        backgroundColor: "rgba(0, 115, 234, 0.35)",
        borderColor: "#0073EA",
        pointImages: data?.map((item) => item.image), // Custom property for images
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="w-[50%] border border-primary-border rounded-[16px] pt-[12px] px-2 bg-[#FFCB00/20">
      <h3 className="text-heading font-semibold text-[16px]">
        Top personality
      </h3>

      <div className="-mt-3">
        <Radar
          data={chartData}
          options={options}
          height="320px"
          style={{
            width: "100%",
            height: "320px",
          }}
        />
      </div>
    </div>
  );
};

export default RadarChart;
