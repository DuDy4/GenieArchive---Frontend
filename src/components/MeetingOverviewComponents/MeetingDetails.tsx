import React, { useEffect, useState } from 'react';
import CompanyOverview from './CompanyOverview';
import Participants from './Participants';
import MeetingGuidelines from './MeetingGuidelines';
import CompanyDetails from './CompanyDetails';
// Assume you have the data imported or passed as props

const MeetingDetails: React.FC<{ data: any }> = ({ data }) => {

    const meeting: Object = data.meeting;
    const company: Object = data.company;
    const participants: Object = data.participants;
    const guidelines: Array[Object] = data.meeting.guidelines.guidelines;

    console.log("meeting: ", meeting);
    console.log("company: ", company);
    console.log("participants: ", participants);
    console.log("guidelines: ", guidelines);


  return (
    <div className="meeting-details">
      <h2>{meeting.subject}</h2>
      <div className="content">
        <div className="left-column">
          <CompanyOverview overview={company.overview} />
          <CompanyDetails details={company} />
          {/* Add more components here as needed */}
        </div>
        <div className="right-column">
          <Participants participants={participants} />
          <MeetingGuidelines guidelines={guidelines} />
          {/* Add more components here as needed */}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
