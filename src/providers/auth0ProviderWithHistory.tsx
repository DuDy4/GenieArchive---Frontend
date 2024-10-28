import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // Use the returnTo path if it exists, otherwise default to "/"
    navigate(appState?.returnTo || "/");
  };

  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const defaultOrgId = import.meta.env.VITE_DEFAULT_ORG_ID;
  const redirectUri = window.location.origin;
  const auth0Audience = auth0Domain + "/api/v2/"

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        connection: 'google-oauth2',
        connection_scope: 'https://www.googleapis.com/auth/calendar.readonly',
        scope: 'openid profile',
        access_type: 'offline',
        audience: auth0Audience,
        prompt: 'consent',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
