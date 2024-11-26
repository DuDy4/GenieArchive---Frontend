import React from 'react';
import { Typography, Box } from '@mui/material';
import useStrengthsAndCategories from '../hooks/useStrengthsAndCategories';

interface SalesCriteriaChartProps {
  tenantId: string;
  uuid: string;
}

const SalesCriteriaChart: React.FC<SalesCriteriaChartProps> = ({ sales_criteria }) => {


  // Sort criteria DESC by target score
  const sortedCriteria = [...sales_criteria].sort(
    (a: any, b: any) => b.target_score - a.target_score
  );

  const getColorForCriteria = (criteria: string): string => {
    const colors: { [key: string]: string } = {
      BUDGET: '#90caf9',
      TECHNICAL_FIT: '#9fa8da',
      BUSINESS_FIT: '#80cbc4',
      VALUE_PROPOSITION: '#fcb602',
      INNOVATION: '#ffd54f',
      LONG_TERM_PROFESSIONAL_ADVISOR: '#f48fb1',
      RESPONSIVENESS: '#4ada85',
      REPUTATION: '#5855ff',
      TRUST: '#8c52ff',
    };
    return colors[criteria] || '#e0e0e0';
  };

  // Utility function to convert criteria names to Camel Case
  const formatCriteriaName = (criteria: string): string => {
    return criteria
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Find the maximum target score to calculate relative widths
  const maxTargetScore = Math.max(...sales_criteria.map((criterion: any) => criterion.target_score));

  return (
    <Box
      sx={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        maxWidth: '400px',
      }}
    >
      {sortedCriteria.map((criterion: any, index: number) => (
        <Box key={index} sx={{ marginBottom: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatCriteriaName(criterion.criteria)} {/* Convert to Camel Case */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box
              sx={{
                position: 'relative',
                height: '20px',
                borderRadius: '5px',
                backgroundColor: '#e0e0e0',
                overflow: 'hidden',
                width: `${(criterion.target_score / maxTargetScore) * 100}%`, // Set width based on target score
              }}
            >
              {/* Target Score Background */}
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%', // Full width of the bar represents the target score
                  backgroundColor: `${getColorForCriteria(criterion.criteria)}33`, // Add transparency to the color
                }}
              />
              {/* Actual Score Foreground */}
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: `${(criterion.score / criterion.target_score) * 100}%`, // Actual score as a percentage of the target
                  backgroundColor: getColorForCriteria(criterion.criteria),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingLeft: '5px',
                }}
              >
                {criterion.score > 0 && ( // Only show score if greater than 0
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  >
                    {`${criterion.score}%`}
                  </Typography>
                )}
              </Box>
            </Box>
            {/* Target Score Percentage */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                marginLeft: '8px', // Add space between the bar and the target score
                fontSize: '12px',
                whiteSpace: 'nowrap', // Ensure it stays on the same line
              }}
            >
              {`${criterion.target_score}%`}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SalesCriteriaChart;
