// MeetingGuidelines.tsx
import React from 'react';

const MeetingGuidelines: React.FC<{ guidelinesObject: { guidelines: Array<{ text: string, duration: string }>, total_duration: string } }> = ({ guidelinesObject }) => {
  const guidelines = guidelinesObject.guidelines;
  const totalDuration = guidelinesObject.total_duration;

  return (
    <div className="meeting-guidelines p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-4">Meeting Guidelines</h3>
      <div className="mb-4">
        <div className="p-2 bg-blue-100 rounded text-blue-800 text-center">
          Total Duration: {totalDuration}
        </div>
      </div>
      <ul className="relative pl-8 list-none">
        {guidelines.map((guideline, index) => (
          <li key={index} className="mb-4 flex items-start">
            <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4 relative">
              {index < guidelines.length - 1 && (
                <span className="absolute h-full w-0.5 bg-blue-300 left-1/2 top-full"></span>
              )}
            </span>
            <span>{guideline.text} - {guideline.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingGuidelines;
