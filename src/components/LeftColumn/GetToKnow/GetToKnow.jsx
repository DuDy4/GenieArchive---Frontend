import React, { useContext, useState, useEffect } from 'react';
import { Strength } from "./Strength/Strength";

export const GetToKnow = ({profile}) => {



    const [currentProfile, setCurrentProfile] = useState(profile); // Set current profile

    const strengths = currentProfile.strengths || [];

    console.log('GetToKnow - strengths:', strengths);

    return (
        <div className="frame-28">
            <div className="frame-29">
                <div className="text-wrapper-18">Get to know {currentProfile.name}</div>
            </div>
            <div className="frame-30">
                    {strengths.map((strength, index) => (
                        <Strength key={index} title={strength.strength_name || strength.strengths_name}
                         text={strength.reasoning} />
                    ))}
            </div>
        </div>
    );
};