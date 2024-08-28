import React from 'react';

const CompanyOverview: React.FC<{ overview: string }> = ({ overview, logo }) => {
  return (
    <div className="company-overview p-[10px] rounded-[16px] border border-[#dddddd] my-4 text-justify">
        <div className="flex justify-between">
        {logo && <img className="company-logo" src={logo} alt="Company Logo" />}
        <h3 className="text-lg font-bold mb-2">Company Overview</h3>
        </div>
      <p>{overview}</p>
    </div>
  );
};

export default CompanyOverview;
