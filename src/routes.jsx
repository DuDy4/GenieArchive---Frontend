import {createBrowserRouter} from "react-router-dom";
import { HomeOverview } from "./screens/HomeOverview";
import {App} from "./App";
import {TemplateHTML} from "./screens/TemplateHTML";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element:<App/>,
            children:[
                {
                    path: '/',
                    element: <TemplateHTML />,
                },
                {
                    path: '/profile/:name',
                    element: <HomeOverview />
                }
            ]
        }
    ]
)