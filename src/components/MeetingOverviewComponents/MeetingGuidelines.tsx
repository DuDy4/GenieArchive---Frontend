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

const MeetingGuidelines: React.FC<{ agendaItems: AgendaItemProps[] }> = ({ agendaItems }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="meeting-guidelines p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-4">Meeting Guidelines</h3>
      <ul className="relative pl-8 list-none">
        {agendaItems.map((item, index) => (
          <li key={index} className="mb-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <span className="font-bold mr-2">{item.goal}</span>
              <span className="text-gray-600">({item.duration} min)</span>
              <span className="ml-4">
                {expandedIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {expandedIndex === index && (
              <div className="ml-8 mt-2">
                <p><strong>Timing:</strong> {item.guidelines.timing}</p>
                <p><strong>Reasoning:</strong> {item.guidelines.reasoning}</p>
                <p><strong>Execution:</strong> {item.guidelines.execution}</p>
                <p><strong>Phrases:</strong> {item.guidelines.phrases.join(', ')}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingGuidelines;