import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSalesCriteria } from "../../providers/SalesCriteriaProvider";

interface SalesCriteriaChartProps {
//   salesCriteria: any[];
//   hoveredScores: { [key: string]: number };
//   clickedScores: { [key: string]: number };
//   setHoveredCriterion: (criteria: string | null) => void;
}

const SalesCriteriaChart: React.FC<SalesCriteriaChartProps> = ({
//   salesCriteria,
//   hoveredScores,
//   clickedScores,
//   setHoveredCriterion,
}) => {

    const { salesCriteria, hoveredScores, clickedScores } = useSalesCriteria();
  // Sort criteria DESC by target score
  const sortedCriteria = salesCriteria ? [...salesCriteria].sort(
    (a: any, b: any) => b.target_score - a.target_score
  ) : [];

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

  const formatCriteriaName = (criteria: string): string =>
    criteria
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const maxTargetScore = salesCriteria ? Math.max(...salesCriteria.map((criterion: any) => criterion.target_score)) : 0;

  return (
    <Box
      sx={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        width: '100%',
      }}
    >
      {sortedCriteria.map((criterion: any, index: number) => {
        const clickedEffect = clickedScores[criterion.criteria] || 0;
        const hoverEffect = Math.max(hoveredScores[criterion.criteria] - clickedEffect, 0) || 0;

        const baseWidth = (criterion.score / criterion.target_score) * 100; // Current score width
        const clickWidth = (clickedEffect / criterion.target_score) * 100; // Click score width
        const hoverWidth = (hoverEffect / criterion.target_score) * 100; // Hover score width

        return (
          <Box
            key={index}
            sx={{
              marginBottom: '16px',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {formatCriteriaName(criterion.criteria)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              {/* Target Score Background */}
              <Box
                sx={{
                  position: 'relative',
                  height: '20px',
                  borderRadius: '5px',
                  backgroundColor: '#e0e0e0',
                  overflow: 'hidden',
                  width: `${(criterion.target_score / maxTargetScore) * 100}%`,
                }}
              >
                {/* Current Score Foreground */}
                <Box
                  sx={{
                    position: 'absolute',
                    height: '100%',
                    width: `${baseWidth}%`, // Current score width
                    backgroundColor: getColorForCriteria(criterion.criteria),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: '5px',
                    paddingLeft: '5px',
                  }}
                >
                  {criterion.score + hoverEffect + clickedEffect > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#fff',
                        fontSize: '12px',
                        zIndex: 999,
                      }}
                    >
                         {`${(criterion.score + hoverEffect+ clickedEffect) > criterion.target_score
                            ? criterion.target_score
                            : hoverEffect || clickedEffect
                              ? criterion.score + hoverEffect + clickedEffect
                              : criterion.score}%`}
                    </Typography>
                  )}
                </Box>
                {/* Hover Score Overlay */}
                {hoverEffect > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      height: '100%',
                      width: `${baseWidth + hoverWidth}%`, // Add hover width to current width
                      backgroundColor: getColorForCriteria(criterion.criteria),
                      borderRadius: '5px',
                      opacity: 0.5,
                    }}
                  />
                )}
                {/* Click Score Overlay */}
                {clickedEffect > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      height: '100%',
                      width: `${baseWidth + clickWidth}%`, // Add click width to current width
                      backgroundColor: getColorForCriteria(criterion.criteria),
                      borderRadius: '5px',
                      opacity: 0.6,
                    }}
                  />
                )}
              </Box>
              {/* Target Score Percentage */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  marginLeft: '8px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                {`${criterion.target_score}%`}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default SalesCriteriaChart;
