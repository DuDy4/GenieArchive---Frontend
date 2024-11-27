import React from 'react';
import { Typography, Box } from '@mui/material';
import SalesCriteriaChart from './SalesCriteriaChart'; // Import the bar chart component
import ArcProgress from './ArcProgressChart'; // Import the arc progress component

interface SalesCriteria {
  criteria: string;
  target_score: number;
  score: number;
}

interface SalesCriteriaContainerProps {
  name: string;
  salesCriteria: SalesCriteria[];
}

const SalesCriteriaContainer: React.FC<SalesCriteriaContainerProps> = ({ name, salesCriteria }) => {
  const total_score = salesCriteria.reduce((sum, item) => sum + item.score, 0);

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
            }}>

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                width: '100%',

                textAlign: 'left',
            }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {name}'s leading sales criteria
          </Typography>
          <Typography variant="body2" sx={{ color: '#6c6c6c', }}>
            These are {name}'s decision-making criteria, ranked by importance:
          </Typography>
      </Box>

      <ArcProgress total_score={total_score} /> {/* Pass total_score dynamically */}
        </Box>
      <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItem: 'center', width: "100%", minWidth: "100%", justifyContent: "center" }}>
            <SalesCriteriaChart sales_criteria={salesCriteria} />
      </Box>
    </Box>
  );
};

export default SalesCriteriaContainer;
