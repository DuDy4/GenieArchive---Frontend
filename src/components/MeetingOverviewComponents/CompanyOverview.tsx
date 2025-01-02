import React, { useState, useEffect } from 'react';
import { useApiClient } from '../../utils/AxiosMiddleware';
import { IconButton, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const titleize = (name: string) => {
  return name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

interface CompanyOverviewProps {
  name: string;
  overview: string;
  logo?: string;
  handleNextCompany: () => void;
  companiesLength: number;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ name, overview, logo, handleNextCompany, companiesLength }) => {
  const [translatedOverview, setTranslatedOverview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTranslateOption, setShowTranslateOption] = useState(false);
  const [showTranslateOverview, setShowTranslateOverview] = useState(false);
  const { makeRequest } = useApiClient();

  useEffect(() => {
    // Function to translate the text and compare it with the original
    const translateAndCompare = async () => {
      setLoading(true);
      try {
          const response = await makeRequest('POST', '/google-services/translate', {text: overview});
        const result = response;

        // If translated text differs from the original, show translation option
        if (result.translatedText !== overview) {
          setTranslatedOverview(result.translatedText);
          setShowTranslateOption(true);
        } else {
          setShowTranslateOption(false);
        }
      } catch (error) {
        console.error('Error during translation:', error);
      } finally {
        setLoading(false);
      }
    };
    if (overview){
            translateAndCompare();
        }
  }, [overview]);

  return (
    <div className="company-overview p-[10px] rounded-[16px] border border-[#dddddd] my-4 bg-white">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            {logo && (
              <img
                src={logo}
                alt="Company Logo"
                style={{ width: 48, height: 48, borderRadius: '50%' }}
              />
            )}
            <h3 className="text-lg font-bold mb-2">{titleize(name)}</h3>
          </div>
          {companiesLength > 1 && (
          <Tooltip title="Next Company" arrow>
            <IconButton
              onClick={handleNextCompany}
              color="primary"
              style={{
                backgroundColor: '#f1f1f1',
                borderRadius: '8px',
                border: '1 px solid #f1f1f1',
                height: '35px',
                padding: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>)}
        </div>
      <p>{showTranslateOverview ? translatedOverview : overview}</p>
      <div>
        {/* Show the translate button only if the translation is different from the original */}
        {showTranslateOption && translatedOverview && translatedOverview !== overview
                                                &&  (
          <button
            onClick={() => {
                setTranslatedOverview(translatedOverview)
                setShowTranslateOverview(!showTranslateOverview)}}
            disabled={loading}
            className="text-blue-500 hover:text-blue-700"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            {(loading ? 'Translating...' : `Switch ${showTranslateOverview ? 'back' : 'to english'}`)}
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyOverview;
