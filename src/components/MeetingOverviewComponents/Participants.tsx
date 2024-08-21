import React from 'react';

const Participants: React.FC<{ participants: Array<{ name: string, profile_picture: string }> }> = ({ participants }) => {
  return (
    <div className="participants my-4 w-full">
      <h3 className="text-lg font-bold mb-2">Participants</h3>
      <div className="grid grid-cols-2 gap-4">
        {participants.map((participant, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <img
              src={participant.profile_picture}
              alt={participant.name}
              className="h-12 rounded-full mb-2"
            />
            <p className="text-center text-sm">{participant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
