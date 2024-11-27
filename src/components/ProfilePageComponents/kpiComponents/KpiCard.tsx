import React from 'react';

interface KpiCardProps {
  icon: string;
  title: string;
  description: string;
  percentage: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, title, description, percentage }) => {
  return (
    <div className="kpi-card">
      <div className="icon" style={{width: 'fit-content'}}>
        <img src={icon} alt={`${title} icon`} style={{height: '48px', width: '48px'}} />
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      </div>
      <div className="percentage">
        <span>{percentage}</span>
      </div>
    </div>
  );
};

export default KpiCard;
