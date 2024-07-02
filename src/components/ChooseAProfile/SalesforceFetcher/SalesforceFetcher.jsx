import React, { useContext, useState, useEffect } from 'react';
import { TenantContext } from '../../../providers/TenantProvider';
import { ContactsContext } from '../../../providers/ContactsProvider';
import { ProfilesContext } from '../../../providers/ProfilesProvider';


const SalesforceFetcher = () => {
    const { sfCreds, sfOauth, logOutFromSalesforce } = useContext(TenantContext);
    const { fetchContacts, loading } = useContext(ContactsContext);
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
        <div>
            {sfCreds && sfCreds.salesforce_access_token ? (
                <>
                    <div>
                        <h2>Connected to Salesforce</h2>
                        {loading ? (
                            <button className="refresh-button loading" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        ) : (
                            <button className="refresh-button" onClick={fetchContacts}>Choose another Salesforce's contacts</button>
                        )}
                        <button onClick={fetchProfiles}>Fetch Profiles</button>
                        <button onClick={logOutFromSalesforce}>Logout</button>
                    </div>
                </>
            ) : (
                <button onClick={sfOauth}>Connect to Salesforce</button>
            )}
        </div>
    );
};

export default SalesforceFetcher;
