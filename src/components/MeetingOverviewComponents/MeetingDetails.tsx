import React from 'react';
import CompanyOverview from './CompanyOverview';
import Participants from './Participants';
import MeetingGuidelines from './MeetingGuidelines';
import CompanyDetails from './CompanyDetails';
import NewsSection from './NewsSection'; // Import the NewsSection component

const MeetingDetails: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;
  const { meeting, company, participants} = data;
  const guidelinesObject = data.meeting.guidelines;
    const news = company ? company.news : undefined;

  return (
    <div className="meeting-details p-6">
      <h2 className="text-3xl font-bold mb-6">{meeting.subject}</h2>

      <div className="flex justify-between">
        {company ? <div className="flex-1 mr-8">
          <CompanyOverview overview={company.overview} />
          <CompanyDetails details={company} />
        </div> : null}

        <div className="flex-1">
          {participants ? <Participants participants={participants} /> : null}
          {guidelinesObject ? <MeetingGuidelines guidelinesObject={guidelinesObject} /> : null}
          {news ? <NewsSection news={news} /> : null}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
