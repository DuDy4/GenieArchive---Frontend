import './App.css';
import { useEffect, useState } from 'react';
import { HomePrimaryMenu } from './components/HomePrimaryMenu/HomePrimaryMenu';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';
import { HomeOverview } from './screens/HomeOverview/HomeOverview';
import { TenantProvider } from './providers/TenantProvider';
import { ProfilesProvider } from './providers/ProfilesProvider';
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
                        <HomeOverview user={user}/>
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
