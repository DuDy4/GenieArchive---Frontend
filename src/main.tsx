import React from "react";
import { ReactDOM ,createRoot} from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const defaultOrgId = import.meta.env.VITE_DEFAULT_ORG_ID;
const redirectUri = window.location.origin;

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Auth0Provider
//         domain={auth0Domain}
//         clientId={auth0ClientId}
//         authorizationParams={{
//           redirect_uri: redirectUri,
//         }}
//         cacheLocation="localstorage"
//       >
//         <ThemeProvider theme={theme}>
//           <QueryClientProvider client={queryClient}>
//             <App />
//           </QueryClientProvider>
//         </ThemeProvider>
//       </Auth0Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


const root = createRoot(document.getElementById('root')!);
root.render(
<React.StrictMode>
  <BrowserRouter>
<Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: redirectUri,
      connection: 'google-oauth2',
      connection_scope: 'https://www.googleapis.com/auth/calendar.readonly',
      scope: 'openid profile',
      access_type: 'offline',
      approvalPrompt: 'force',
      prompt: 'consent'
    }}
  >
    <QueryClientProvider client={queryClient}>
             <App />
           </QueryClientProvider>
  </Auth0Provider>,
  </BrowserRouter>
  </React.StrictMode>
);
