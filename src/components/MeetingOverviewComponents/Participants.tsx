import React from 'react';

const Participants: React.FC<{ participants: Array<{ name: string, profile_picture: string }> }> = ({ participants }) => {
  return (
    <div className="participants my-4 w-full p-[10px] rounded-[16px] border border-[#dddddd]" style={{ height: 'fit-content' }}>
      <h3 className="text-lg font-bold mb-2">Participants</h3>
      <div className="grid grid-cols-2 gap-4">
        {participants.map((participant, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <img
              src={participant.profile_picture ? participant.profile_picture : '/images/anonymous-user-8.svg'}
              alt={participant.name ? participant.name : participant.email}
              title={participant.name ? participant.name : participant.email}
              className="h-12 rounded-full mb-2"
            />
            <p className="text-center text-sm">{participant.name ? participant.name : participant.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
