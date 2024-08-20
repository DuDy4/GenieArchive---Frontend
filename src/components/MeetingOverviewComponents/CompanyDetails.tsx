import React from 'react';

const CompanyDetails: React.FC<{ details: any }> = ({ details }) => {
  return (
    <div className="company-details">
      <h3>Company Details</h3>
      <div className="details-grid">
        {/* You can map through the details object and display them here */}
        <p>Industry: {details.industry}</p>
        <p>Size: {details.size}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default CompanyDetails;
