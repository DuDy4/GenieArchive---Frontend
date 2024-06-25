import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Create Context
export const ProfileContext = createContext(null);

data = {
           "investors": {
               "eli_dubnov": {
                   "name": "Eli Dubnov",
                   "company": "Entrée Capital",
                   "position": "Investment Professional",
                   "strengths": [
                       {
                           "strength": "Strategic",
                           "score": 98,
                           "description": "Eli's educational background in economics and an MBA from Columbia, along with a high GMAT score, clearly demonstrate his ability to think critically and strategically. His role in making significant investment decisions across various sectors further emphasizes his strategic planning skills. This trait is essential for navigating the complex and fast-paced investment landscape, ensuring that he can identify and capitalize on opportunities effectively."
                       },
                       {
                           "strength": "Learner",
                           "score": 92,
                           "description": "The fact that Eli speaks seven languages and has quickly adapted to new technologies showcases his love for learning and personal growth. This trait is particularly important in the tech investment field, where staying informed about the latest trends and understanding new technologies can make a substantial difference in making successful investment decisions. His continuous pursuit of knowledge makes him well-equipped to evaluate the potential of emerging technologies."
                       },
                       {
                           "strength": "Relator",
                           "score": 85,
                           "description": "Eli's ability to communicate effectively in multiple languages and his efficiency in navigating complex corporate environments suggest that he possesses strong relational skills. This strength is crucial for building and maintaining strong, trusting relationships with entrepreneurs, stakeholders, and within the markets he operates. It enables him to foster connections that are essential for successful investments and collaborations, making him a valuable partner in any venture."
                       },
                       {
                           "strength": "Achiever",
                           "score": 75,
                           "description": "Eli's track record of personal and professional achievements, including his impressive GMAT score and mastery of multiple languages, as well as his involvement in raising significant funds, highlights his drive and determination. Achievers like Eli have the stamina and work ethic required to meet challenging goals. This trait is highly relevant in the competitive field of venture capital, where persistence and the ability to achieve milestones are crucial for success."
                       },
                       {
                           "strength": "Communication",
                           "score": 65,
                           "description": "Being able to speak seven languages is not just a testament to Eli's capacity for learning but also underscores his exceptional communication skills. In his role as an investor, the ability to articulate ideas clearly and persuasively across different cultures and industries is critical. His experience in video marketing and sales innovation further demonstrates his ability to convey complex messages effectively, making this strength a key asset in his investment activities."
                       }
                   ],
                   "challenges": [
                       "Unclear future of AI",
                       "Lack of stability in the region",
                       "Investing in times of high interest rates",
                       "Balancing between nurturing existing investments and seeking new ones",
                       "Unclear exit strategies in times of economic uncertainty"
                   ],
                   "connections" : [ "1.png", "2.png", "3.png", "4.png", "5.png" ],
                   "interests" : ["surfing.png", "golf.png", "celtics.pnd", "real_madrid.png"],
                   "news": [
                       {"title" : "Saving the whales", "link" : "https://www.savethewhales.com", "origin" : "linkedin.png"},
                       {"title" : "On CBS, Manhattan and Enjoying the MBA Ride", "link" : "On CBS, Manhattan and Enjoying the MBA Ride", "origin" : "web.png"}
                   ]
               }
           }
       }

export const ProfileProvider = ({ children }) => {
//     const { investorName } = useParams();
    const profileName = 'eli_dubnov'
    const [profile, setProfile] = useState(data.investors[profileName]);

//     const profile = data.investors[profileName]

    console.log('ProfileProvider - Profile:', profile); // Add log to check profile

//     useEffect(() => {
//
//         if (profileName && data.investors[profileName.toLowerCase()]) {
//             console.log(`Profile: ${profileName}`);
//             setInvestor(data.investors[profileName]);
//             console.log(data.investors)
//         } else {
//             console.log("Profile not found")
//             setInvestor(null);
//         }
//         console.log(`Profile: ${profile}`);
//         }, [profile]);

    return (
        <ProfileContext.Provider value={profile}>
          {children}
        </ProfileContext.Provider>
    );
    };
