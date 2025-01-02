import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyOverview from './CompanyOverview';
import Participants from './Participants';
import MeetingGuidelines from './MeetingGuidelines';
import CompanyDetails from './CompanyDetails';
import Challenges from './Challenges';
import NewsSection from './NewsSection';
import InternalMeetingDetails from './InternalMeetingDetails';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

const ExternalMeetingDetails: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const { meeting, companies, participants } = data;
  const [company, setCompany] = useState(companies && Array.isArray(companies) && companies.length > 0 ? companies[0] : {});
  const agendaItems = meeting ? meeting.agenda : [];
  const news = company ? company.news : undefined;
  const link = meeting ? meeting.video_link : undefined;
  const classification = meeting ? meeting.classification : undefined;

  const handleNextCompany = () => {
    setCurrentCompanyIndex((currentCompanyIndex + 1) % companies.length);
    setCompany(companies[currentCompanyIndex]);
  }

  if (companies && companies.length === 0) {
      return (
                  <div className="flex-1 mr-2 flex justify-center items-start p-6">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-md text-center">
                      <h1 className="text-2xl font-bold text-gray-700 mb-4">Ooooops!</h1>
                      <p className="text-gray-600">
                        We couldn't find a company associated with the persons you are about to meet...
                      </p>
                      <InternalMeetingDetails data={data} />
                    </div>
                  </div>);
      }

  return (
    <div className="meeting-details p-6">
      <div className="flex justify-between">

          <div className="flex-1 mr-2">
            <div className="flex flex-row space-x-5">
            {company.name && company.name !== "Unknown" &&
              <CompanyOverview
                name={company.name}
                overview={(company.description && (company.description.length < 60 && company.description > 15)) ? capitalizeFirstLetter(company.description) : company.overview}
                logo={company.logo}
                handleNextCompany={handleNextCompany}
                companiesLength={companies.length}
              />}
              {/* {participants && <Participants participants={participants} />} */}
            </div>
            {company.challenges && Array.isArray(company.challenges) && company.challenges.length > 0 && <Challenges challenges={company.challenges} />}
            {agendaItems && agendaItems.length > 0 ? <MeetingGuidelines agendaItems={agendaItems} duration={meeting.duration}/> : <CompanyDetails details={company} />}
          </div>


          <div className="flex-1 right-column items-between" style={{ paddingTop: '1.6%' }}>
            {link && (
              <div className="video-link-container p-[10px] rounded-[16px] w-full">
                <div className="flex flex-col justify-center">
                  <div className="meeting-link mt-2 flex items-center justify-center space-x-8 w-full">
                    <button
                      className="bg-blue-500 text-white font-bold py-4 px-6 text-xl rounded-lg hover:bg-blue-700"
                      style={{ width: '-webkit-fill-available' }} // Add this style
                      onClick={() => window.open(link, "_blank")}
                    >
                      Join the meeting
                    </button>
                  </div>
                </div>
              </div>
            )}
          {agendaItems && agendaItems.length > 0 && company.name !== 'Unknown'?
          (company && company.name && (
              <div className="participants-guidelines w-full">
             <CompanyDetails details={company} />
          </div>))
           : null}
          {news && news.length > 0 && <NewsSection news={news} company_name={company.name} />}
          {!company && <h1 className="text-2xl font-bold text-gray-700 mt-4">No company found for the meeting</h1>}
        </div>
      </div>
    </div>
  );
};

export default ExternalMeetingDetails;
