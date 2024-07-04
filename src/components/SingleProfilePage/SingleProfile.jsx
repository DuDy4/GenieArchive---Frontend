import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfilesContext } from '../../providers/ProfilesProvider';
import { LeftColumn } from '../LeftColumn/LeftColumn';
import { RightColumn } from '../RightColumn/RightColumn';
import { TopNavigation } from '../TopNavigation';


const SingleProfile = () => {

    let name = useParams().name;
    console.log("Name: ", name)
    name = name.split('-').join(' ').toLowerCase();
    const {profiles} = useContext(ProfilesContext);
    const profile = profiles.find(profile => profile.name.toLowerCase() === name);
    console.log("Profile: ", profile)

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/profiles/}`);
    }

    return (
            <>
                {profile ? (
                    <div className="columns">
                        <LeftColumn className="left-column" profile={profile} />
                        <RightColumn className="right-column" profile={profile} />
                    </div>
                ) : (
                    <div>Profile not found</div>
                )}
                <TopNavigation className="top-navigation-instance" groupClassName="top-navigation-2" property1="nav-1"/>
            </>
        );
}

export default SingleProfile;
