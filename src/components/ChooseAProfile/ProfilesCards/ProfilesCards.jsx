import React, { useContext } from 'react';
import { ProfilesContext } from '../../../providers/ProfilesProvider';
import './ProfileCards.css'; // Assuming you will style your cards using this CSS file
import RandomProfilePicture from '../../RandomProfilePictureGenerator/RandomProfilePictureGenerator';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

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
                    <div key={profile.uuid} className="card mb-3 profile-card" onClick={() => handleProfileClick(profile)}>
                      <RandomProfilePicture style="card-img-top fixed-size" profileImage={profile.picture_url} />
                      <div class="card-body">
                        <h5 class="card-title">{profile.name}</h5>
                        <div className="company-and-position">
                            <p class="card-text">{profile.position},</p>
                            <p class="card-text">{profile.company}</p>
                        </div>
                      </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ProfileCards;
