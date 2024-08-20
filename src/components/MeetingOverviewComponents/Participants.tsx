import React from 'react';

const Participants: React.FC<{ participants: Array<{ name: string, profile_picture: string }> }> = ({ participants }) => {
  return (
    <div className="participants">
      <h3>Participants</h3>
      <div className="participants-list">
        {participants.map((participant, index) => (
          <img
            key={index}
            src={participant.profile_picture}
            alt={participant.name}
            className="participant-image"
          />
        ))}
      </div>
    </div>
  );
};

export default Participants;
