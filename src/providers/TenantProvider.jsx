    import React, { useState, useEffect, createContext } from 'react';
    import axios from 'axios';


    export const TenantContext = createContext();

    export const TenantProvider = ({ user, children }) => {
        const [tenantId, setTenantId] = useState(user.tenantId);
        const apiUrl = process.env.REACT_APP_API_URL;
        const [sfCreds, setSfCreds] = useState({});
        const [render, setRender] = useState(false);


        const sfOauth = async() => {

                const oauthWindow = window.open(`${apiUrl}/v1/salesforce/auth/${tenantId}`, 'Salesforce OAuth', 'width=1200,height=800');

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

                        setRender(!render);
                        window.removeEventListener('message', handleMessage);
                        oauthWindow.close();
                    }
                }
            }

        const logOutFromSalesforce = () => {
            axios.delete(apiUrl + `/v1/salesforce/${tenantId}`)
                .then(response => {
                    console.log('Deleted Salesforce creds:', response.data);
                    setSfCreds({});
                    }
                )
                .catch(error => {
                    console.error('Error during Salesforce logout:', error);
                });
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

        const value = { tenantId, sfCreds, sfOauth, logOutFromSalesforce };

      return (
        <TenantContext.Provider value={value}>
          {children}
        </TenantContext.Provider>
      );
    };