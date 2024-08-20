import React from 'react';

const CompanyOverview: React.FC<{ overview: string }> = ({ overview }) => {
  return (
    <div className="company-overview">
      <h3>Company Overview</h3>
      <p>{overview}</p>
    </div>
  );
};

export default CompanyOverview;
