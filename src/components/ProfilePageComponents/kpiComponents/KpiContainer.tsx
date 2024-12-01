import React from 'react';
import KpiCard from './KpiCard';

const KpiContainer: React.FC<KpiContainerProps> = ({ kpi, actionItems }) => {
  const sortedActionItems = actionItems
    ? [...actionItems].sort((a, b) => b.score - a.score)
    : [];

  return (
    <div className="kpi-section">
        {kpi && <div className="kpi-card-no-hover" style={{height: 'fit-content', minHeight: '50px'}}>
            <p className="kpi-title"><strong>Meeting KPI</strong>: {kpi}</p>
        </div> }
      <div className="kpi-cards">
        {sortedActionItems && sortedActionItems.map((actionItem, index) => (
          <KpiCard
            key={index}
            title={actionItem.title}
            description={actionItem.action_item}
            percentage={actionItem.score}
            criteria={actionItem.criteria}
            icon={actionItem.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default kpiContainer;
