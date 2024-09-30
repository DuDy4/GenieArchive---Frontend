import React, { useState, useEffect } from 'react';
import { useApiClient } from '../../utils/AxiosMiddleware';

const titleize = (name: string) => {
  return name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const CompanyOverview: React.FC<{ name: string; overview: string; logo?: string }> = ({ name, overview, logo }) => {
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
    <div className="company-overview p-[10px] rounded-[16px] border border-[#dddddd] my-4">
      <div className="flex justify-start gap-3">
        {logo && <img className="company-logo" src={logo} alt="Company Logo" />}
        <h3 className="text-lg font-bold mb-2 self-center">{titleize(name)}</h3>
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
