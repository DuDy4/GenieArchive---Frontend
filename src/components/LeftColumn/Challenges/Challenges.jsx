import React, { useState, useEffect } from 'react';
import "./style.css";
import { MdiIdea5 } from "../../../icons/MdiIdea5";

export const Challenges = ({ profile }) => {

    console.log('Challenges - profile:', profile);

    const [currentProfile, setCurrentProfile] = useState(profile);

    useEffect(() => {
        if (profile) {
            setCurrentProfile(profile);
        }
    }, [profile]);

    const topChallenges = currentProfile ? currentProfile.challenges : [];

    console.log('topChallenges', topChallenges);

    return (
        <div className="frame-41">
            <div className="frame-29">
                <div className="text-wrapper-18">Top challenges in the role</div>
            </div>
            <div className="frame-42">
                {topChallenges.length > 0 && topChallenges.map((challenge, index) => (
                    <div className="frame-43" key={index}>
                        <div className="mdi-idea-wrapper">
                            <MdiIdea5 className="mdi-idea" color="#00C875" />
                        </div>
                        <div className={`text-wrapper-${30 + index}`}>
                            {challenge.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
