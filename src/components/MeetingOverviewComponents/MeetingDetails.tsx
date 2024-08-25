import React from 'react';
import { Link } from 'react-router-dom';
import CompanyOverview from './CompanyOverview';
import Participants from './Participants';
import MeetingGuidelines from './MeetingGuidelines';
import CompanyDetails from './CompanyDetails';
import NewsSection from './NewsSection';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

const MeetingDetails: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;
  const { meeting, company, participants} = data;
  const guidelinesObject = meeting ? meeting.guidelines : undefined;
    const news = company ? company.news : undefined;
    const link = meeting ? meeting.video_link : undefined;

  return (
    <div className="meeting-details p-6">
        <div className="flex flex start space-x-5">
        {company.logo ? <img className="company-logo" src={company.logo} alt="Company Logo" /> : null}
        <h2 className="text-3xl font-bold mb-6">{meeting ? meeting.subject : "Got no meeting info"}</h2>
        </div>

      <div className="flex justify-between">
        {company ? <div className="flex-1 mr-2">
          <div className="flex flex-row space-x-5">
              <CompanyOverview overview={capitalizeFirstLetter(company.description ? company.description : company.overview)} />
              {participants ? <Participants participants={participants} /> : null}
            </div>
          <CompanyDetails details={company} />

        </div> : null}

        <div className="flex-1 right-column items-between">
          {link ? (
              <div className="flex flex-col justify-center">
                <div className="meeting-link mt-2 flex items-center space-x-8">
                  <h3 className="text-lg font-bold mb-0">Meeting Link</h3>
                  <Link to={link} target="_blank" className="text-blue-500 underline">
                    <img className="" src="/images/video-conference-icon.png" title="Link to meeting" />
                  </Link>
                </div>
              </div>
            ) : null}
          {/* Participants and Meeting Guidelines */}
          <div className="participants-guidelines">
            {guidelinesObject ? <MeetingGuidelines guidelinesObject={guidelinesObject} /> : null}
            {news ? <NewsSection news={news} /> : null}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
