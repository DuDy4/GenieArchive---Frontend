import React from "react";
import { ReactDOM ,createRoot} from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from "./providers/auth0ProviderWithHistory.tsx";

const queryClient = new QueryClient();

console.log(import.meta.env);

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const defaultOrgId = import.meta.env.VITE_DEFAULT_ORG_ID;
const redirectUri = window.location.origin;
const auth0Audience = auth0Domain + "/api/v2/"


const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
      </Auth0ProviderWithHistory>
  </BrowserRouter>
);
