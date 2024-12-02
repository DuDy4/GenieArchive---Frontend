import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import SalesCriteriaChart from './SalesCriteriaChart'; // Import the bar chart component
import ArcProgress from './ArcProgressChart'; // Import the arc progress component
import { useSalesCriteria } from '../../providers/SalesCriteriaProvider'; // Import the context hook
import LoadingGenie from '../ui/loading-genie';

interface SalesCriteria {
  criteria: string;
  target_score: number;
  score: number;
}

interface SalesCriteriaChartProps {
  sales_criteria: any[];
  hoveredScores: { [key: string]: number };
  clickedScores: { [key: string]: number };
}


const SalesCriteriaContainer: React.FC<SalesCriteriaContainerProps> = ({ name, salesCriteria, hoveredScores, clickedScores }) => {
  const [hoveredCriterion, setHoveredCriterion] = useState<string | null>(null);

    console.log("Sales Criteria: ", salesCriteria);

  // Calculate the total score dynamically based on hover/click states
    const calculateTotalScore = () => {
      return salesCriteria.reduce((total, item) => {
        // Get scores for the current criterion
        const hoveredScore = hoveredScores[item.criteria] || 0;
        const clickedScore = clickedScores[item.criteria] || 0;

        // Use the maximum of hoverScore and clickedScore
        const additionalScore = Math.max(hoveredScore, clickedScore);

        // Calculate the combined score
        const combinedScore = item.score + additionalScore;

        // If combined score exceeds target, use target score
        const finalScore = combinedScore > item.target_score ? item.target_score : combinedScore;

        return total + finalScore; // Add to total score
      }, 0);
    };

  const total_score = salesCriteria ? calculateTotalScore() : 0; // Calculate total score

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          width: '100%',
          padding: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {name}'s leading sales criteria
          </Typography>
          <Typography variant="body2" sx={{ color: '#6c6c6c' }}>
            These are {name}'s decision-making criteria, ranked by importance:
          </Typography>
        </Box>

        <ArcProgress total_score={total_score} /> {/* Pass total_score dynamically */}
      </Box>
      <Box
        sx={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <SalesCriteriaChart
          salesCriteria={salesCriteria}
          hoveredScores={hoveredScores}
          clickedScores={clickedScores}
        />
      </Box>
    </Box>
  );
};

export default SalesCriteriaContainer;
