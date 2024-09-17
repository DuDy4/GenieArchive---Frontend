import React, { useState } from 'react';

const Participants: React.FC<{ participants: Array<{ profiles: Array<{ name: string, profile_picture: string }>, persons: Array<{ name: string, email: string }> }> }> = ({ participants }) => {
  const { profiles, persons } = participants;

  // Add a state to control tooltip visibility
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="participants my-4 w-full p-[10px] rounded-[16px] border border-[#dddddd]" style={{ height: 'fit-content' }}>
      <h3 className="text-lg font-bold mb-2">Participants</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Mapping over profiles */}
        {profiles && profiles.map((profile, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <img
              src={profile.profile_picture ? profile.profile_picture : '/images/anonymous-user-8.svg'}
              alt={profile.name ? profile.name : profile.email}
              title={profile.name ? profile.name : profile.email}
              className="h-12 rounded-full mb-2"
            />
            <p className="text-center text-sm">{profile.name ? profile.name : profile.email}</p>
          </div>
        ))}

        {persons && persons.length > 0 && (
          <div
            className="flex flex-col items-center justify-center relative"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            {/* Circle representing number of persons */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-black text-lg mb-2">
              +{persons.length}
            </div>
            <p className="text-center text-sm">More participants</p>

            {/* Tooltip to display names or emails on hover */}
            {isTooltipVisible && (
              <div className="absolute bottom-full mb-2 w-auto max-w-xs p-2 bg-black text-white rounded-md text-xs shadow-lg">
                {persons.map((person, index) => (
                  <p key={index}>
                    {person.name ? person.name : person.email}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
