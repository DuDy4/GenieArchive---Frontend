import './App.css';
import { useEffect, useState } from 'react';
import { HomePrimaryMenu } from './components/HomePrimaryMenu/HomePrimaryMenu';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';
import { HomeOverview } from './screens/HomeOverview/HomeOverview';
import { TenantProvider } from './providers/TenantProvider';
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
              <TenantProvider user={user}>
                <HomePrimaryMenu className="home-primary-menu-instance" />
              </TenantProvider>
          </div>
          <div className="main-and-footer">
            <div className="main-content">
              <HomeOverview user={user}/>
            </div>
            <Footer />
          </div>

        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
