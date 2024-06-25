import React, { useContext, useState, useEffect } from 'react';
import "./style.css";
import {profile} from "../../../providers/test_provider"
import { MdiIdea5 } from "../../../icons/MdiIdea5";

export const Challenges = () => {

    const [currentProfile, setCurrentProfile] = useState(profile); // Initialize with null
    useEffect(() => {
        if (profile) {
            setCurrentProfile(profile); // Set currentProfile when profile is available
        }
    }, [profile]);

    topChallenges = currentProfile.challenges;

    return         <div className="frame-41">
          <div className="frame-29">
            <div className="text-wrapper-18">Top challenges in the role</div>
          </div>
          <div className="frame-42">
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <div className="text-wrapper-30">{topChallenges[0]}</div>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <p className="text-wrapper-31">{topChallenges[1]}</p>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <p className="text-wrapper-31">{topChallenges[2]}</p>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <div className="text-wrapper-32">{topChallenges[3]}</div>
            </div>
            <div className="frame-43">
              <div className="mdi-idea-wrapper">
                <MdiIdea5 className="mdi-idea" color="#00C875" />
              </div>
              <p className="text-wrapper-32">{topChallenges[4]}</p>
            </div>
          </div>
        </div>;
};
