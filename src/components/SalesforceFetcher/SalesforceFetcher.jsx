import React, { useContext, useState, useEffect } from 'react';
import { TenantContext } from '../../providers/TenantProvider';
import { ContactsContext } from '../../providers/ContactsProvider';

const SalesforceFetcher = () => {
    const { sfCreds, sfOauth, salesforceLogout } = useContext(TenantContext);
    const { fetchContacts } = useContext(ContactsContext);

    const [render, setRender] = useState(false);

    const logOut = () => {
        salesforceLogout();
        setRender(!render);
    };

    useEffect(() => {
        setRender(!render);
        console.log('SalesforceFetcher - sfCreds:', sfCreds);
    }, [sfCreds]);

    return (
        <div style={{ paddingTop: '10%', paddingLeft: '5%' }}>
            {Object.keys(sfCreds).length > 0 ? (
                <div>
                    <h2>Connected to Salesforce</h2>
                    <button onClick={fetchContacts}>Fetch Profiles</button>
                    <button onClick={logOut}>Logout</button>
                </div>
            ) : (
                <button onClick={sfOauth}>Connect to Salesforce</button>
            )}
        </div>
    );
};

export default SalesforceFetcher;
