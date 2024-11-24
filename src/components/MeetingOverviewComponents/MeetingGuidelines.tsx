import React, { useState } from 'react';

interface GuidelinesProps {
  timing: string;
  reasoning: string;
  execution: string;
  phrases: string[];
}

interface AgendaItemProps {
  goal: string;
  guidelines: GuidelinesProps;
  duration: number;  // Assuming this is provided or calculated
}

const MeetingGuidelines: React.FC<{ agendaItems: AgendaItemProps[], duration: string }> = ({ agendaItems, duration }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const convertDurationToMinutes = (duration: string): string => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return `${totalMinutes} minutes`;
  };

  const durationInMinutes = convertDurationToMinutes(duration);

  return (
    <div className="meeting-guidelines p-6 border border-[#dddddd] rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Meeting Guidelines</h3>
        <h3 className="text-lg font-semibold text-gray-500 duration">Total duration: {durationInMinutes}</h3>
      </div>
      <ul className="space-y-4">
        {agendaItems.map((item, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">{item.goal}</span>
                <span className="text-sm text-gray-500">({item.guidelines.timing})</span>
              </div>
              <span className="text-gray-500 ml-4">
                {expandedIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {expandedIndex === index && (
              <div className="mt-4 pl-4">
                <div className="mb-2">
                  <strong>Execution:</strong> <span className="text-gray-600">{item.guidelines.execution}</span>
                </div>
                <div className="mb-2">
                  <strong>Reasoning:</strong> <span className="text-gray-600">{item.guidelines.reasoning}</span>
                </div>
                <div>
                  <strong>Phrases:</strong>
                  <ul className="list-disc pl-6 mt-1 text-gray-600">
                    {item.guidelines.phrases.map((phrase, index) => (
                      <li key={index}>{phrase}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingGuidelines;
