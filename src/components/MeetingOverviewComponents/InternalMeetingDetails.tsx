import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Participants from './Participants';
import randomTips from '../../utils/randomTips.json';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const InternalMeetingDetails: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    let { meeting, participants } = data;

    const link = meeting ? meeting.video_link : undefined;
    const duration = meeting ? meeting.duration : 'Unknown Duration';
    const subject = meeting ? meeting.subject : 'No Subject';

    const tips = randomTips.tips;

    const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];
    const [randomTip, setRandomTip] = useState(getRandomTip());

    const regenerateTip = () => {
        setRandomTip(getRandomTip());
    };

    return (
        <div
          className="internal-meeting-details p-6 rounded-lg max-w-4xl mx-auto width-auto"
          style={{ height: '-webkit-fill-available' }}
        >
            <div className="meeting-info mb-6 p-4 rounded-md shadow-sm">
                <div className="meeting-details-info rounded-lg flex justify-between items-center">
                     <div className="flex flex-col">
                         <p className="text-gray-700 text-lg font-semibold">
                             <strong>Subject:</strong> <span className="text-gray-900">{subject}</span>
                         </p>
                         <p className="text-gray-700 text-lg font-semibold">
                             <strong>Duration:</strong> <span className="text-gray-900">{duration}</span>
                         </p>
                     </div>
                 </div>
                <div>
                    {link && (
                      <div className="video-link-container p-[10px] rounded-[16px] w-full">
                        <div className="flex flex-col justify-center">
                          <div className="meeting-link mt-2 flex items-center justify-center space-x-8 w-full">
                            <button
                              className="bg-blue-500 text-white font-bold py-4 px-6 text-xl rounded-lg hover:bg-blue-700"
                              style={{ width: '-webkit-fill-available' }}
                              onClick={() => window.open(link, "_blank")}
                            >
                              Join the meeting
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
            </div>

            {/* Participants and Meeting Link Row */}
            <div className="flex justify-between mb-6">
                {/* Participants */}
                {participants && (
                    <div className="participants-section flex-1">
                        <Participants participants={{"profiles": participants}} />
                    </div>
                )}
            </div>

            {/* Internal Meeting Message and Sales Tip */}
            <div className="internal-meeting-message mb-6 p-6 text-center" style={{ borderRadius: '0.5rem'}}>
                <h2 className="text-2xl font-semibold mb-4">
                    Shh… internal meetings are in stealth mode! Our Genie only shares the scoop on external meetings where the real action is.
                </h2>

                <br/>
                <br/>
                <div className="relative flex justify-start items-end mb-4">
                    {/* Speech Bubble */}
                    <div className="speech-bubble relative p-6 rounded-lg shadow-md border">
                        <h3 className="text-xl font-bold text-700 mb-3">Tip for Sales Reps:</h3>
                        <p className="text-600 text-lg mb-4">{randomTip}</p>
                        <button
                            onClick={regenerateTip}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition"
                        >
                            Regenerate Tip
                        </button>
                    </div>

                    {/* Tail of the speech bubble */}

                    {/* Genie Avatar */}
                    <img
                        src="/images/image9.png"
                        alt="Genie"
                        className="absolute left-[-40px] bottom-[-30px] w-20 h-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default InternalMeetingDetails;
