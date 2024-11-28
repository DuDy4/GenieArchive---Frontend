import React from 'react';
import KpiCard from './KpiCard';

const kpiContainer = ({kpi, actionItems}) => {

  return (
    <div className="kpi-section">
        {kpi && <div className="kpi-card-no-hover" style={{height: 'fit-content', minHeight: '50px'}}>
            <p className="kpi-title"><strong>Meeting KPI</strong>: {kpi}</p>
        </div> }
      <div className="kpi-cards">
        {actionItems && actionItems.map((actionItem, index) => (
          <KpiCard
            key={index}
            icon={actionItem.icon}
            title={actionItem.title}
            description={actionItem.action_item}
            percentage={actionItem.score}
            criteria={actionItem.criteria}
          />
        ))}
      </div>
    </div>
  );
};

export default kpiContainer;
