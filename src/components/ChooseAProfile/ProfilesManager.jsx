import { useContext } from 'react';
import { ProfilesContext } from '../../providers/ProfilesProvider';
import ProfileCards from './ProfilesCards/ProfilesCards';
import SalesforceFetcher from './SalesforceFetcher/SalesforceFetcher';

const ProfilesManager = () => {
    console.log("Build ProfilesManager")
    const {profiles, profile} = useContext(ProfilesContext);
    console.log("Profiles: ", profiles, ", profile: ", profile)

  return (
    <div style={{ paddingTop: '10%', paddingLeft: '5%' }}>
        {Object.keys(profile).length > 0 ? <h1>The chosen profile: {profile.name}</h1> :
            (profiles.length ? <ProfileCards /> : <SalesforceFetcher />)
        }
    </div>
  );
}

export default ProfilesManager;