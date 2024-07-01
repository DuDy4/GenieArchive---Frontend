import React, { useContext } from 'react';
import { ProfilesContext } from '../../../providers/ProfilesProvider';
import './ProfileCards.css'; // Assuming you will style your cards using this CSS file

const ProfileCards = () => {
    const { profiles, profile, chooseProfile, fetchProfiles } = useContext(ProfilesContext);
    console.log("Profiles length: " + profile.length)

    if (!profiles.length) {
        return <div>Loading profiles...</div>;
    };

    const handleProfileClick = (profile) => {
        console.log('Profile clicked:', profile);
        chooseProfile(profile);
    };

    return (
        <div className="profile-cards-container">
            <button className="refresh-button" onClick={fetchProfiles}>Refresh Profiles</button>
            Choose a profile:
            <div className="profile-cards-list">
                {profiles.map(profile => (
                    <div key={profile.uuid} className="profile-card" onClick={() => handleProfileClick(profile)}>
                        <h1>{profile.name}</h1>
                        <h4>{profile.position}, {profile.company}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileCards;
