import "../global.css";
import "../styleguide.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { FronteggProvider } from "@frontegg/react";
import App from "./App";

const contextOptions = {
  baseUrl: process.env.VITE_FRONTEGG_DOMAIN,
  clientId: process.env.VITE_FRONTEGG_CLIENT_ID
};

console.log(contextOptions);

const authOptions = {
//  keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

const root = ReactDOMClient.createRoot(app);
root.render(
        <FronteggProvider
            contextOptions={contextOptions}
            hostedLoginBox={true}
            authOptions={authOptions}>
{/*             <TenantProvider> */}
                <App />
{/*             </TenantProvider> */}
        </FronteggProvider>
    );
