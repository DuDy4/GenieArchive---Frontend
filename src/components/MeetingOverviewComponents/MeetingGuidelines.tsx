import React from 'react';

const MeetingGuidelines: React.FC<{ guidelines: Array<{ text: string, duration: string }> }> = ({ guidelines }) => {
  return (
    <div className="meeting-guidelines">
      <h3>Meeting Guidelines</h3>
      <ul>
        {guidelines.map((guideline, index) => (
          <li key={index}>
            {guideline.text} - {guideline.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingGuidelines;
