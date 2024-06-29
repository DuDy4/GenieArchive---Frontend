import './App.css';
import { useEffect, useState } from 'react';
import { HomePrimaryMenu } from './components/HomePrimaryMenu/HomePrimaryMenu';
import { useAuth, useLoginWithRedirect } from '@frontegg/react';
import { HomeOverview } from './screens/HomeOverview/HomeOverview';
import Footer from './screens/Footer/footer';
import axios from 'axios';


function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [sf_creds, setSfCreds] = useState({});


  // Uncomment this to redirect to login automatically
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    if (isAuthenticated) {
        const userToSignup = {
            tenantId: user.tenantId,
            email: user.email,
            name: user.name,
        };
        axios.post(apiUrl + '/v1/signup', userToSignup)
        .then(response => {
            console.log('Signup successful:', response.data);
            if (response.data) {
                sf_creds_temp = response.data.salesforce_creds;
                console.log('Salesforce creds:', sf_creds_temp);
                setSfCreds(response.data.salesforce_creds);
                setTimeout(() => {
                    console.log('Salesforce creds:', sf_creds);
                }, 5000);
                console.log('Salesforce creds:', sf_creds);
            }
        })
        .catch(error => {
            console.error('Error during signup:', error);
        });
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
