import './App.css';
import { useEffect, useState } from 'react';
import { HomePrimaryMenu } from './components/HomePrimaryMenu/HomePrimaryMenu';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';
import { HomeOverview } from './screens/HomeOverview/HomeOverview';
import {HomeProfileIn} from './components/figma-anime/src/screens/HomeProfileIn';
import SingleProfile from './components/SingleProfilePage/SingleProfile';
import { TenantProvider } from './providers/TenantProvider';
import { ProfilesProvider } from './providers/ProfilesProvider';
import { ContactsProvider } from './providers/ContactsProvider';
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
                                  <ContactsProvider user={user}>
                                    <Routes>
                                      <Route path="/" element={<TemplateHTML />} />
                                      <Route path="/profiles" element={<HomeOverview user={user} />} />
                                      <Route path="/profiles/:name" element={<SingleProfile />} />
                                      <Route path="/profiles/:name/before-the-meeting" element={<HomeProfileIn />} />
                                    </Routes>
                                    </ContactsProvider>
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
