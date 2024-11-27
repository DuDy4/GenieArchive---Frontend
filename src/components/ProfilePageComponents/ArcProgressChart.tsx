import React from 'react';
import { Box, Typography } from '@mui/material';

interface ArcProgressProps {
  total_score: number; // Current score as a percentage
}

const ArcProgress: React.FC<ArcProgressProps> = ({ total_score }) => {
  return (
    <Box sx={{ position: 'relative', margin: '16px auto', width: '150px', height: '75px' }}>
      <svg width="150" height="75" viewBox="0 0 100 50">
        {/* Background Arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
        />
        {/* Foreground Arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#90caf9"
          strokeWidth="10"
          strokeDasharray={`${(total_score / 100) * 126} 126`}
          strokeLinecap="round"
          opacity="0.9" // Use higher opacity for clicked scores
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