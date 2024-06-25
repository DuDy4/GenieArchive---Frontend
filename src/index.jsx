import "../global.css";
import "../styleguide.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, RouterProvider} from "react-router-dom";
import { ProfileProvider } from "./providers/ProfileProvider";
import { FronteggProvider } from "@frontegg/react";
import { HomeOverview } from "./screens/HomeOverview";
import ReactDOM from 'react-dom/client';
import {router} from "./routes";
import { App } from "./App";

const contextOptions = {
  baseUrl: 'https://app-ti5hsifaejz0.us.frontegg.com',
  clientId: '8d9dcc48-2b1c-4f5e-906b-6d496284ca5e'
};

const authOptions = {
//  keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(
        <ProfileProvider>
            <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true} authOptions={authOptions}>
                <App />
            </FronteggProvider>
        </ProfileProvider>
    );
