import React, { useContext, useState, useEffect } from 'react';
import { TenantContext } from '../../providers/TenantProvider';
import { ContactsContext } from '../../providers/ContactsProvider';
import { ProfilesContext } from '../../providers/ProfilesProvider';


const SalesforceFetcher = () => {
    const { sfCreds, sfOauth, salesforceLogout } = useContext(TenantContext);
    const { fetchContacts } = useContext(ContactsContext);
    const { profiles, fetchProfiles } = useContext(ProfilesContext);

    const [render, setRender] = useState(false);

    const logOut = () => {
        salesforceLogout();
        setRender(!render);
    };


    useEffect(() => {
        setRender(!render);
        console.log('SalesforceFetcher - sfCreds:', sfCreds);
    }, [sfCreds, profiles]);

    return (
        <div style={{ paddingTop: '10%', paddingLeft: '5%' }}>
            {Object.keys(sfCreds).length > 0 && sfCreds.salesforce_access_token ? (
                <>
                    <div>
                        <h2>Connected to Salesforce</h2>
                        <button onClick={fetchContacts}>Fetch Contacts</button>
                        <button onClick={fetchProfiles}>Fetch Profiles</button>
                        <button onClick={logOut}>Logout</button>
                    </div>
                    <br/>
                    <div>
                        <ul>
                            <li>Profiles:</li>
                            {profiles && profiles.map(profile => (
                                <li key={profile.uuid} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                                    <div style={{ marginRight: '20px', fontWeight: 'bold' }}>{profile.name}</div>
                                    <ul style={{ listStyleType: 'disc' }}>
                                        {profile.strengths && profile.strengths.map((strength, index) => (
                                            <li key={index}>{strength.strength_name || strength.strengths_name}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <button onClick={sfOauth}>Connect to Salesforce</button>
            )}
        </div>
    );
};

export default SalesforceFetcher;
