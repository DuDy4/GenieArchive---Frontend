import React from 'react';

const Participants: React.FC<{ participants: Array<{ name: string, profile_picture: string }> }> = ({ participants }) => {
  return (
    <div className="participants my-4">
      <h3 className="text-lg font-bold mb-2">Participants</h3>
      <div className="flex justify-start items-center gap-6">
        {participants.map((participant, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={participant.profile_picture}
              alt={participant.name}
              className="w-12 h-12 rounded-full mb-2"
            />
            <p className="text-center text-sm">{participant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
