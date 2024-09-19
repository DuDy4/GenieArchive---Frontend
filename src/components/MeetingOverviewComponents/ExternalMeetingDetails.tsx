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

const ExternalMeetingDetails: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  const { meeting, company, participants } = data;
  const agendaItems = meeting ? meeting.agenda : [];
  const news = company ? company.news : undefined;
  const link = meeting ? meeting.video_link : undefined;
  const classification = meeting ? meeting.classification : undefined;

  return (
    <div className="meeting-details p-6">


      <div className="flex justify-between">
        {company && (
          <div className="flex-1 mr-2">
            <div className="flex flex-row space-x-5">
              <CompanyOverview
                name={company.name}
                overview={company.description ? capitalizeFirstLetter(company.description) : company.overview}
                logo={company.logo}
              />
              {participants && <Participants participants={participants} />}
            </div>
            {agendaItems && agendaItems.length > 0 ? <MeetingGuidelines agendaItems={agendaItems} duration={meeting.duration}/> : <CompanyDetails details={company} />}
          </div>
        )}

          <div className="flex-1 right-column items-between" style={{ paddingTop: '1.6%' }}>
            {link && (
            <div className="video-link-container p-[10px] rounded-[16px] border border-[#dddddd] w-full">
                <div className="flex flex-col justify-center">
                  <div className="meeting-link mt-2 flex items-center justify-center space-x-8">
                    <h3 className="text-lg font-bold mb-0">Meeting Link</h3>
                    <Link to={link} target="_blank" className="text-blue-500 underline">
                      <img src="/images/video-conference-icon.png" title="Link to meeting" />
                    </Link>
                  </div>
                </div>
            </div>)}
          {agendaItems && agendaItems.length > 0 ?
          <div className="participants-guidelines w-full">
             <CompanyDetails details={company} />
          </div>
           : null}
          {news && news.length > 0 && <NewsSection news={news} />}
        </div>
      </div>
    </div>
  );
};

export default ExternalMeetingDetails;
