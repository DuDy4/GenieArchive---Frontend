import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TenantContext } from './TenantProvider';

// Create Context
export const ProfilesContext = createContext(null);

export const ProfilesProvider = ({ children }) => {

    const [profiles, setProfiles] = useState([]);
    const [profile, setProfile] = useState({});
    const [connectionUp, setConnectionUp] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const { tenantId } = useContext(TenantContext);

    console.log('tenantId in ProfileProvider:', tenantId);


    const fetchProfiles = () => {
        axios.get(`${apiUrl}/v1/profiles/${tenantId}`, { withCredentials: true })
            .then(response => {
                console.log('profiles:', response.data);
                setProfiles(response.data);
                setConnectionUp(true);
            })
            .catch(error => {
                console.error('Error saving contacts:', error);
            });
        }

    const chooseProfile = (profile) => {
        setProfile(profile);
    }

    const cleanProfile = () => {
        setProfile({});
    }

    useEffect(() => {
        fetchProfiles();
    }, []);


    const value = {profiles, fetchProfiles, profile, chooseProfile, cleanProfile, connectionUp};

    return (
        <ProfilesContext.Provider value={value}>
          {children}
        </ProfilesContext.Provider>
    );
    };
