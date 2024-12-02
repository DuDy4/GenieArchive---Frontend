import React from 'react';
import { Box, Typography } from '@mui/material';

interface ArcProgressProps {
  total_score: number; // Current score as a percentage
  hover_score?: number; // Hover score as a percentage
  clicked_score?: number; // Clicked score as a percentage
}

const ArcProgress: React.FC<ArcProgressProps> = ({
  total_score,
  hover_score = 0,
  clicked_score = 0,
}) => {
  const arcLength = 126; // Total length of the arc for 100%

  // Calculate arc lengths for each state
  const currentArc = (total_score / 100) * arcLength;
  const hoverArc = ((total_score + hover_score) / 100) * arcLength;
  const clickedArc = ((total_score + clicked_score) / 100) * arcLength;

  return (
    <Box sx={{ position: 'relative', margin: '16px auto', width: '150px', height: '75px' }}>
      <svg width="150" height="75" viewBox="0 0 100 50">
        {/* Background Arc with opacity */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
          opacity="0.5"
        />
        {/* Hover Effect Arc */}
        {hover_score > 0 && (
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#90caf9"
            strokeWidth="10"
            strokeDasharray={`${hoverArc} ${arcLength - hoverArc}`}
            strokeLinecap="round"
            opacity="0.5" // Semi-transparent for hover
          />
        )}
        {/* Clicked Effect Arc */}
        {clicked_score > 0 && (
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#90caf9"
            strokeWidth="10"
            strokeDasharray={`${clickedArc} ${arcLength - clickedArc}`}
            strokeLinecap="round"
            opacity="0.7" // More opaque for clicked
          />
        )}
        {/* Foreground Arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#90caf9"
          strokeWidth="10"
          strokeDasharray={`${currentArc} ${arcLength - currentArc}`}
          strokeLinecap="round"
          opacity="1" // Solid for current score
        />
      </svg>
      {/* Score Text */}
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 600,
          fontSize: '16px',
          color: '#90caf9',
        }}
      >
        {`${total_score}%`}
      </Typography>
    </Box>
  );
};

export default ArcProgress;
