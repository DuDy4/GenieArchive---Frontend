import "../global.css";
import "../styleguide.css";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, RouterProvider} from "react-router-dom";
import { ProfileProvider } from "./providers/ProfileProvider";
import { HomeOverview } from "./screens/HomeOverview";
import ReactDOM from 'react-dom/client';
import {router} from "./routes";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(
        <ProfileProvider>
            <RouterProvider router={router}/>
        </ProfileProvider>
    );
