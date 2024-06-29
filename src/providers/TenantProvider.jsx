import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';


export const TenantContext = createContext();

export const TenantProvider = ({ user, children }) => {
    const [tenantId, setTenantId] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [sfCreds, setSfCreds] = useState({});



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

    const value = { tenantId, sfCreds };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};