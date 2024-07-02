import React, { useContext, useState } from 'react';
import { ProfilesContext } from '../../../providers/ProfilesProvider';
import { ContactsContext } from '../../../providers/ContactsProvider';
import { TenantContext } from '../../../providers/TenantProvider';
import './ProfileCards.css'; // Assuming you will style your cards using this CSS file
import RandomProfilePicture from '../../RandomProfilePictureGenerator/RandomProfilePictureGenerator';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const ProfileCards = () => {
    const { profiles, profile, chooseProfile, fetchProfiles } = useContext(ProfilesContext);
    const { fetchContacts, loading } = useContext(ContactsContext);
    const { logOutFromSalesforce } = useContext(TenantContext);
    const [searchTerm, setSearchTerm] = useState('');

    console.log("Profiles length: " + profile.length)

    if (!profiles.length) {
        return <div>Loading profiles...</div>;
    };

    const handleProfileClick = (profile) => {
        console.log('Profile clicked:', profile);
        chooseProfile(profile);
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
                <input type="text" className="form-control" placeholder="Search name..."
                 value={searchTerm} onChange={handleSearchChange} />

                <div className="icons-container">
                    <button className="refresh-button" onClick={fetchProfiles}>Refresh Profiles</button>
                    {loading ? (
                        <button className="refresh-button loading" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <button className="refresh-button" onClick={fetchContacts}>Choose another Salesforce's contacts</button>
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
                            <p className="card-text">{profile.position},</p>
                            <p className="card-text">{profile.company}</p>
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
