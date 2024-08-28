// MeetingGuidelines.tsx
import React, {useState} from 'react';

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

const MeetingGuidelines: React.FC<{ agendaItems: AgendaItemProps[] }> = ({ agendaItems, duration}) => {
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
    <div className="meeting-guidelines p-4 bg-gray-100 rounded">
        <div className="flex justify-between">
            <h3 className="text-lg font-bold mb-4">Meeting Guidelines</h3>
            <h3 className="text-lg font-bold mb-4 duration">Total duration: {durationInMinutes}</h3>
        </div>
      <ul className="relative pl-4 list-none">
        {agendaItems.map((item, index) => (
          <li key={index} className="mb-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <span className="font-bold mr-2">{item.goal}</span>
              <span className="text-gray-600">({item.guidelines.timing} min)</span>
              <span className="ml-4">
                {expandedIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {expandedIndex === index && (
              <div className="ml-8 mt-2 pr-4">
                <p><strong>Execution:</strong> {item.guidelines.execution}</p>
                <p><strong>Reasoning:</strong> {item.guidelines.reasoning}</p>
                <p><strong>Phrases:</strong> {
                    <ul>
                        {item.guidelines.phrases.map((phrase, index) => (
                            <li key={index} className="pl-4 ">{phrase}</li>
                        ))}
                    </ul>}
                    </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingGuidelines;