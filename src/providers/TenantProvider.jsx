    import React, { useState, useEffect, createContext } from 'react';
    import axios from 'axios';


    export const TenantContext = createContext();

    export const TenantProvider = ({ user, children }) => {
        const [tenantId, setTenantId] = useState(user.tenantId);
        const apiUrl = process.env.REACT_APP_API_URL;
        const [sfCreds, setSfCreds] = useState({});
        const [render, setRender] = useState(false);


        const sfOauth = async() => {

                const oauthWindow = window.open(`${apiUrl}/v1/salesforce/auth/${tenantId}`, '_blank');
                    if (!oauthWindow) {
                        console.error('Popup blocked, please allow popups for this site.');
                        return;
                    }

                    // Listen for messages from the popup
                    oauthWindow.addEventListener('message', handleMessage, false);

                    function handleMessage(event) {
                        console.log('Received message:', event.data);
                        // Check the origin of the message for security purposes
                        if (event.origin !== apiUrl) {
                            console.error('Origin not allowed');
                            return;
                        }

                        // Process the message
                        if (event.data === 'oauth_complete') {
                            console.log('OAuth process completed');
                            console.log('completed');

                            // Perform any actions needed after OAuth completes

                            // Clean up the event listener
                            window.removeEventListener('message', handleMessage, false);

                            setRender(!render);
                        }
                    }
            }

        useEffect(() => {
            const userToSignup = {
                tenantId: user.tenantId,
                email: user.email,
                name: user.name,
            };
            axios.post(apiUrl + '/v1/signup', userToSignup)
            .then(response => {
                console.log('Signup successful:', response.data);
                if (response.data) {
                    setTenantId(user.tenantId);
                    setSfCreds(response.data.salesforce_creds);
                    console.log('Salesforce creds:', sfCreds);
                }
            })
            .catch(error => {
                console.error('Error during signup:', error);
            });
        }, [user, apiUrl]);

        useEffect(() => {
            if (sfCreds && Object.keys(sfCreds).length > 0) {
                console.log('Updated Salesforce creds:', sfCreds);
            }
        }, [sfCreds]);

        const salesforceLogout = () => {
            console.log('Logging out from salesforce');
            setSfCreds({});
        }

        const value = { tenantId, sfCreds, sfOauth, salesforceLogout };

      return (
        <TenantContext.Provider value={value}>
          {children}
        </TenantContext.Provider>
      );
    };