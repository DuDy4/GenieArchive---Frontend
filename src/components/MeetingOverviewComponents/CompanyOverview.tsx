import React from 'react';

const CompanyOverview: React.FC<{ overview: string }> = ({ overview }) => {
  return (
    <div className="company-overview my-4">
      <h3 className="text-lg font-bold mb-2">Company Overview</h3>
      <p>{overview}</p>
    </div>
  );
};

export default CompanyOverview;
