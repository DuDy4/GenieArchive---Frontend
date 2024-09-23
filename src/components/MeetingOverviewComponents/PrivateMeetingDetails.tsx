import React from 'react';

const PrivateMeetingDetails: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="flex justify-center items-center">
      <div
        className="meeting-details bg-white rounded-full shadow-lg flex flex-col justify-center items-center"
        style={{ width: '400px', height: '400px', padding: '25px'}} // Increased circle size
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Private Meeting</h1>
        <h2 className="text-lg font-semibold text-gray-500 text-center">
          We do not process your private meeting. <br />
            Our Genie only shares the scoop on external meetings where the real action is.
        </h2>

      </div>
    </div>
  );
};

export default PrivateMeetingDetails;
