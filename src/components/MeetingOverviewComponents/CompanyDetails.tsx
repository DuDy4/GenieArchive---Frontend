// CompanyDetails.tsx
import React, {useState} from 'react';
import iconRoutes from "../../utils/iconRoutes.json";


interface SocialMediaLink {
  url: string;
  platform: string;
}


const CompanyDetails: React.FC<{ details: any }> = ({ details }) => {

    const [showTooltip, setShowTooltip] = useState(false);

    console.log(details);

  return (
    <div className="company-details p-[10px] rounded-[16px] border border-[#dddddd]">
        <div className="flex justify-between">
        <h3 className="text-lg font-bold mb-4">Company Details</h3>
        <div className="flex space-x-2">
            {details.social_links ? (
                details.social_links.map((link: SocialMediaLink, index: number) => (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        <img src={iconRoutes[link.platform.toLowerCase()]} alt={link.platform} className="w-6 h-6" />
                    </a>
                ))
            ) : null}
        </div>
        </div>
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

        {details.funding_rounds ? (
                <div
                    className="relative p-4 bg-gray-100 rounded"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <p className="text-sm font-bold">Last Raised At:</p>
                    <p>{Array.isArray(details.funding_rounds) && details.funding_rounds.length > 0 ? (
                        details.funding_rounds[0].date ? details.funding_rounds[0].date.split("-").reverse().slice(1,3).join("-") : null
                    ) : null}</p>

                    {showTooltip && (
                        <div className="absolute top-0 left-full ml-2 p-3 w-56 bg-black bg-opacity-90 text-white rounded-xl shadow-lg z-10">
                            <div className="mb-2">
                                <p className="text-xs">Type: {details.funding_rounds[0].type}</p>
                                <p className="text-xs">Amount: {details.funding_rounds[0].amount}</p>
                            </div>
                            <p className="text-xs font-bold">Investors:</p>
                            <ul className="list-disc list-inside text-xs">
                                {details.funding_rounds[0].investors.map((investor, index) => (
                                    <li key={index}>{investor}</li>
                                ))}
                            </ul>
                            <div className="absolute -left-2 top-2 transform -rotate-45 w-4 h-4 bg-black"></div>
                        </div>
                    )}
                </div>
            ) : null}

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
