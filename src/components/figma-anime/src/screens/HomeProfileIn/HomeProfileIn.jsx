import React, {useEffect, useState, useContext} from "react";
import {ProfilesContext} from "../../../../../providers/ProfilesProvider";
import {useParams} from "react-router-dom";
import { Frame } from "../../components/Frame";
import LeftColumn from "../../components/LeftColumn/LeftColumn";
import RightColumn from "../../components/RightColumn/RightColumn";
import { Rectangle } from "../../components/Rectangle";
import { TopNavigation } from "../../components/TopNavigation";
import "./HomeProfileIn.css";

export const HomeProfileIn = () => {

        const {profiles} = useContext(ProfilesContext);
        const [currentProfile, setCurrentProfile] = useState({}); // Set current profile
        let name = useParams().name;
        name = name.replace(/-/g, ' ');
        console.log('BeforeTheMeeting: Name:', name);
        console.log('BeforeTheMeeting: Profiles:', profiles);
        console.log('BeforeTheMeeting: CurrentProfile:', currentProfile);


        useEffect(() => {
            if (profiles){
                console.log('BeforeTheMeeting: Profiles:', profiles);
                const profile = profiles.find(profile => profile.name.toLowerCase() === name.toLowerCase());
                setCurrentProfile(profile);
                }
        }, [name, profiles]);


  return (
    <div className="home-profile-in">
        {currentProfile ?
        (<div className="columns">
            <LeftColumn profile={currentProfile} />
            <RightColumn profile={currentProfile} />
        </div>)
        :
        <div className="loading-spinner"></div>}

        <TopNavigation
          className="top-navigation-instance"
          groupClassName="top-navigation-2"
          property1="nav-1"
          secondaryNavProperty1="variant-2"
        />
      </div>
  );
};
