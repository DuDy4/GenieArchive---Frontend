import { useContext, useState,useEffect } from 'react';
import { ProfilesContext } from '../../providers/ProfilesProvider';
import { TenantContext } from '../../providers/TenantProvider';
import ProfileCards from './ProfilesCards/ProfilesCards';
import SalesforceFetcher from './SalesforceFetcher/SalesforceFetcher';
import './ProfilesManager.css';

const ProfilesManager = () => {
    console.log("Build ProfilesManager")
    const {profiles, profile} = useContext(ProfilesContext);
    const {sfCreds} = useContext(TenantContext);
    const [render, setRender] = useState(false);
    console.log("Profiles: ", profiles, ", profile: ", profile)

    useEffect(() => {
        setRender(!render);
    }, [profiles, profile, sfCreds]);

  return (
    <div className="profile-manager">
        {Object.keys(profile).length > 0 ? <h1>The chosen profile: {profile.name}</h1> :
            (profiles.length && sfCreds ? <ProfileCards /> : <SalesforceFetcher />)
        }
    </div>
  );
}

export default ProfilesManager;