import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfilesContext } from '../../../providers/ProfilesProvider';
import { ContactsContext } from '../../../providers/ContactsProvider';
import { TenantContext } from '../../../providers/TenantProvider';
import './ProfileCards.css'; // Assuming you will style your cards using this CSS file
import RandomProfilePicture from '../../RandomProfilePictureGenerator/RandomProfilePictureGenerator';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const ProfileCards = () => {
    const navigate = useNavigate();
    const { profiles, profile, chooseProfile, fetchProfiles, profilesLoading } = useContext(ProfilesContext);
    const { fetchContacts, contactsLoading } = useContext(ContactsContext);
    const { logOutFromSalesforce } = useContext(TenantContext);
    const [searchTerm, setSearchTerm] = useState('');

    console.log("Profiles length: " + profile.length)

    if (!profiles.length) {
        return <div>Loading profiles...</div>;
    };

    const handleProfileClick = (profile) => {
        console.log('Profile clicked:', profile);
        chooseProfile(profile);
        let name = profile.name.split(' ').join('-').toLowerCase();
        navigate(`/profiles/${name}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

   const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="profile-cards-container">
            <div className="profiles-cards-header">
                <div className="input-bubble">
                    <input type="text" className="form-control search-name" placeholder="Search name..."
                     value={searchTerm} onChange={handleSearchChange} />
                </div>

                <div className="icons-container">
                    {profilesLoading ? (
                        <button className="refresh-button loading" disabled>
                            <span className="spinner-border custom-size" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <button className="refresh-button" onClick={fetchProfiles}>
                            <img width="48" height="48" src="https://img.icons8.com/color/48/life-cycle-female--v1.png"
                             alt="life-cycle-female--v1" title="Refresh profiles"/>
                        </button>
                    )}
                    {contactsLoading ? (
                        <button className="refresh-button loading" disabled>
                            <span className="spinner-border custom-size" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <button className="refresh-button" onClick={fetchContacts}>
                            <img width="48" height="48" src="https://img.icons8.com/fluency/48/multiple-inputs.png"
                             alt="multiple-inputs" title="Bring more contacts" />
                        </button>
                    )}
                </div>
            </div>
            <div className="profile-cards-list">
                {filteredProfiles.map(profile => (
                    <div key={profile.uuid} className="card mb-3 profile-card" onClick={() => handleProfileClick(profile)}>
                      <RandomProfilePicture style="card-img-top fixed-size" profileImage={profile.picture_url} />
                      <div className="card-body">
                        <h5 className="card-title">{profile.name}</h5>
                        <div className="company-and-position">
                            {profile.position && <p className="card-text">{profile.position}</p>}
                            {profile.position && profile.company && ','}
                            {profile.company && <p className="card-text">{profile.company}</p>}
                        </div>
                      </div>
                    </div>
                ))}
                {filteredProfiles.length === 0 && <div>No profiles found</div>}
            </div>


        </div>
    );
};


export default ProfileCards;
