import React from 'react';
import CompanyOverview from './CompanyOverview';
import Participants from './Participants';
import MeetingGuidelines from './MeetingGuidelines';
import CompanyDetails from './CompanyDetails';
import NewsSection from './NewsSection'; // Import the NewsSection component

const MeetingDetails: React.FC<{ data: any }> = ({ data }) => {
  const { meeting, company, participants} = data;
  const guidelinesObject = data.meeting.guidelines;
    const news = company.news; // Get the news data from the company object

  return (
    <div className="meeting-details p-6">
      <h2 className="text-3xl font-bold mb-6">{meeting.subject}</h2>

      <div className="flex justify-between">
        <div className="flex-1 mr-8">
          <CompanyOverview overview={company.overview} />
          <CompanyDetails details={company} />
        </div>

        <div className="flex-1">
          <Participants participants={participants} />
          <MeetingGuidelines guidelinesObject={guidelinesObject} />

          {/* Add the NewsSection here */}
          <NewsSection news={news} />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
