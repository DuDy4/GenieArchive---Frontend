import './App.css';
import { useEffect, useState } from 'react';
import { HomePrimaryMenu } from './components/HomePrimaryMenu/HomePrimaryMenu';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';
import { HomeOverview } from './screens/HomeOverview/HomeOverview';
import { TenantProvider } from './providers/TenantProvider';
import { ProfilesProvider } from './providers/ProfilesProvider';
import { Route, Routes } from 'react-router-dom';
import {TemplateHTML} from './screens/TemplateHTML';

import Footer from './screens/Footer/footer';
import axios from 'axios';


function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();


  // Uncomment this to redirect to login automatically
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
}, [isAuthenticated, loginWithRedirect]);

    console.log('User:', user);
  return (
    <div className="App">
      { isAuthenticated ? (
        <div className="app-container">
          <div className="main-menu">
                <HomePrimaryMenu className="home-primary-menu-instance" user={user} />
          </div>
          <div className="main-and-footer">

            <div className="main-content">
                <TenantProvider user={user}>
                    <ProfilesProvider>
                        <Routes>
                          <Route path="/" element={<TemplateHTML />} />
                          <Route path="/profiles" element={<HomeOverview user={user} />} />

                        </Routes>
                    </ProfilesProvider>
                </TenantProvider>
            </div>
            <Footer />
          </div>

        </div>
      ) : (
        <div>
                <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;
