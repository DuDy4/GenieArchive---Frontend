import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FronteggProvider } from "@frontegg/react";

const queryClient = new QueryClient();

const contextOptions = {
  baseUrl: import.meta.env.VITE_FRONTEGG_URL,
  clientId: import.meta.env.VITE_FRONTEGG_CLIENT,
};

// const contextOptions = {
//   baseUrl: "https://app-ulb15oyg6a4d.frontegg.com",
//   clientId: "8e5b416d-85a9-4e58-86e4-3bd89412e8fd",
// };

const authOptions = {
  keepSessionAlive: true
 };



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={false} authOptions={authOptions}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </FronteggProvider>
  </React.StrictMode>
);
