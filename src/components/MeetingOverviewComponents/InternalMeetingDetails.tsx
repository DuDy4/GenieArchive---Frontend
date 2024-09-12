import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Participants from './Participants';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const InternalMeetingDetails: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    let { meeting, participants } = data;

    console.log("Participants", participants);

    // Mock participants data (for now)
    if (!participants){
        participants = [
        {
            "uuid": "724398e7-a513-405a-b785-9e12a019d9e3",
            "name": "Alon Lifshitz",
            "email": "alon@hanacovc.com",
            "profile_picture": "https://monomousumi.com/wp-content/uploads/anonymous-user-8.png"
        },
        {
            "uuid": "ad71b0b7-9a2e-4b97-bb04-9a6d8b0d369a",
            "name": "Dafna Parag",
            "email": "dafna@hanacovc.com",
            "profile_picture": "https://monomousumi.com/wp-content/uploads/anonymous-user-8.png"
        },
        {
            "uuid": "47ffa6b4-1c22-41cd-9724-e62d04701a6a",
            "name": "Gadi Fisher",
            "email": "gadi@hanacovc.com",
            "profile_picture": "https://media.licdn.com/dms/image/v2/C4E03AQEweMMib62gzA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1616088958371?e=2147483647&v=beta&t=dCMl3AZPDZcB8dIWUyH_NvUTdM7P9Ov44YjpUGMDI4Q"
        },
        {
            "uuid": "f1636476-e405-4684-8d2a-5e670e1ba86f",
            "name": "Nativ Or",
            "email": "nativ@hanacovc.com",
            "profile_picture": "https://monomousumi.com/wp-content/uploads/anonymous-user-8.png"
        }
    ]}

    const link = meeting ? meeting.video_link : undefined;
    const duration = meeting ? meeting.duration : 'Unknown Duration';
    const subject = meeting ? meeting.subject : 'No Subject';

    const tips = [
        "Know Your Audience's Wish List! – Just like Genie grants the perfect wish, make sure you understand your customer's pain points and desires. Tailor your pitch to their specific needs, and you'll have them saying 'yes' in no time!",
        "Timing is Everything – Appear When Needed! – Be strategic with your follow-ups. Don’t disappear, but also don’t overwhelm. Genie knows when the perfect moment to pop up is, and so should you!",
        "Speak Their Language, Not Just Yours! – Genie adapts to each person’s style. Whether they prefer data-driven facts or personal stories, mirror their communication style to build trust faster."
    ];

    const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];
    const [randomTip, setRandomTip] = useState(getRandomTip());

    const regenerateTip = () => {
        setRandomTip(getRandomTip());
    };

    return (
        <div className="internal-meeting-details p-6 rounded-lg shadow max-w-4xl mx-auto width-auto">

            <div className="meeting-info mb-6 p-4 bg-gray-100 rounded-md shadow-sm">
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
                    <div className="flex flex-col justify-center">
                      <div className="meeting-link mt-2 flex items-center justify-center space-x-8">
                        <p><strong>Link: </strong></p>
                        <Link to={link} target="_blank" className="text-blue-500 underline">
                          <img src="/images/video-conference-icon.png" title="Link to meeting" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
            </div>

            {/* Participants and Meeting Link Row */}
            <div className="flex justify-between mb-6">
                {/* Participants */}
                {participants && (
                    <div className="participants-section flex-1 mr-4">
                        <Participants participants={participants} />
                    </div>
                )}
            </div>

            {/* Internal Meeting Message and Sales Tip */}
            <div className="internal-meeting-message mb-6 p-6" style={{ backgroundColor: '#FFD700', borderRadius: '0.5rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
                    Shh… internal meetings are in stealth mode! Our Genie only shares the scoop on external meetings where the real action is.
                </h2>
                <div className="sales-tip p-6 bg-blue-50 rounded-md shadow-md">
                    <h3 className="text-xl font-bold text-blue-700 mb-3">Tip for Sales Reps:</h3>
                    <p className="text-blue-600 text-lg mb-4">{randomTip}</p>
                    <button
                        onClick={regenerateTip}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition"
                    >
                        Regenerate Tip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InternalMeetingDetails;
