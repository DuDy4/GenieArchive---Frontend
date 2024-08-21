// CompanyDetails.tsx
import React from 'react';

interface SocialMediaLink {
  url: string;
  platform: string;
}


const CompanyDetails: React.FC<{ details: any }> = ({ details }) => {
  return (
    <div className="company-details">
      <h3 className="text-lg font-bold mb-4">Company Details</h3>
      <div className="grid grid-cols-2 gap-4">
        {details.industry ? (
            <div className="p-4 bg-gray-100 rounded">
                      <p className="text-sm font-bold">Industry:</p>
                      <p>{details.industry}</p>
                    </div>
                    ) : null
            }
        {details.size ? (
            <div className="p-4 bg-gray-100 rounded">
                      <p className="text-sm font-bold">Size:</p>
                      <p>{details.size}</p>
                    </div>
                    ) : null
            }
        {details.country ? (
            <div className="p-4 bg-gray-100 rounded">
                      <p className="text-sm font-bold">Country:</p>
                      <p>{details.country}</p>
                    </div>
                    ) : null
            }
        {details.annual_revenue ? (
            <div className="p-4 bg-gray-100 rounded">
                      <p className="text-sm font-bold">Annual Revenue:</p>
                      <p>{details.annual_revenue}</p>
                    </div>
                    ) : null
            }
        {details.total_funding ? (
            <div className="p-4 bg-gray-100 rounded">
                      <p className="text-sm font-bold">Total Funding:</p>
                      <p>{details.total_funding}</p>
                    </div>
                    ) : null
            }

        {details.last_raised_at ? (
            <div className="p-4 bg-gray-100 rounded">
                        <p className="text-sm font-bold">Last Raised At:</p>
                        <p>{details.last_raised_at}</p>
                        </div>
                        ) : null
            }

        {details.main_customers ? (
            <div className="p-4 bg-gray-100 rounded">
                        <p className="text-sm font-bold">Main Customers:</p>
                        <p>{details.main_customers}</p>
                        </div>
                        ) : null
            }

        {details.main_competitors ? (
            <div className="p-4 bg-gray-100 rounded">
                        <p className="text-sm font-bold">Main Competitors:</p>
                        <p>{details.main_competitors}</p>
                        </div>
                        ) : null
            }

      </div>
    </div>
  );
};

export default CompanyDetails;
