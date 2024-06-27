import './App.css';
import { useEffect } from 'react';
import { HomePrimaryMenu } from './components/HomePrimaryMenu/HomePrimaryMenu';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';
import { HomeOverview } from './screens/HomeOverview/HomeOverview';
import Footer from './screens/Footer/footer';

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
            <HomePrimaryMenu className="home-primary-menu-instance" />
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
