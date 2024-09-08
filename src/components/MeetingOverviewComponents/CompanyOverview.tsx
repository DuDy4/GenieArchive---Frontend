import React from 'react';

const titleize = (name: string) => {
  return name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const CompanyOverview: React.FC<{ overview: string }> = ({ name, overview, logo }) => {
  return (
    <div className="company-overview p-[10px] rounded-[16px] border border-[#dddddd] my-4">
        <div className="flex justify-start gap-3">
        {logo && <img className="company-logo" src={logo} alt="Company Logo" />}
        <h3 className="text-lg font-bold mb-2 self-center">{titleize(name)}</h3>
        </div>
      <p>{overview}</p>
    </div>
  );
};

export default CompanyOverview;
