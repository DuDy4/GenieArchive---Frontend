import React, {useState, useEffect, useContext } from "react";
import { Frame } from "../../components/Frame";
import { FrameWrapper } from "../../components/FrameWrapper";
import { Rectangle } from "../../components/Rectangle";
import { TopNavigation } from "../../components/TopNavigation";
import {useParams} from "react-router-dom";
import axios from 'axios';
import "./home-overview-style.css";
import { LeftColumn } from "../../components/LeftColumn/LeftColumn";
import { RightColumn } from "../../components/RightColumn/RightColumn";
import { Strength } from "../../components/LeftColumn/GetToKnow/Strength";
import { GetToKnow } from "../../components/LeftColumn/GetToKnow/GetToKnow";
import { PictureCard } from "../../components/LeftColumn/PictureCard/PictureCard";
import { Challenges } from "../../components/LeftColumn/Challenges/Challenges";
import Footer from "../Footer/footer";
import SpiderChart from "../../components/SpiderChart/SpiderChart";
import vc from "../../data/vc.json";
import icons_routes from "../../data/icons_routes.json";
import icon from "../../data/strength_icons/rectangle-26-1@2x.png";
import { profile } from "../../providers/test_provider";
import { TenantContext } from "../../providers/TenantProvider";
import { ContactsProvider } from "../../providers/ContactsProvider";
import SalesforceFetcher from "../../components/SalesforceFetcher/SalesforceFetcher";


function getDirectImageLink(fileLink) {

  // Extract the FILE_ID from the provided file link
  const fileIdMatch = fileLink.match(/\/file\/d\/([^\/]+)\//);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    // Construct the direct image link
    const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
    return directLink;
  } else {
    throw new Error('Invalid Google Drive file link');
  }
}



export const HomeOverview = ({user}) => {
    const { tenantId, sfCreds } = useContext(TenantContext);
    console.log('tenantId:', tenantId);
    console.log('Salesforce creds in HomeOverview:', sfCreds);

    const currentUrl = window.location.href;
        // Create a URL object
        const url = new URL(currentUrl);
        // Extract the path
        const path = url.pathname;
        // Split the path and get the parameter
        const segments = path.split('/');
        const username = segments[segments.length - 1];
        const name = username.split('-').join(' ');
    console.log('HomeOverview - name:', name);

  //const [profile, setProfile] = useState(vc.investors[name]);
  
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({name: ''})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>

        {profile.name ? (
                <>
                 <LeftColumn className="left-column" profile={profile} />
                 <RightColumn className="right-column" profile={profile} />
                </>
             )
            :
            (
                    <ContactsProvider>
                        <SalesforceFetcher />
                    </ContactsProvider>
            )}


        <TopNavigation className="top-navigation-instance" groupClassName="top-navigation-2" property1="nav-1" user={user} />
    </>
  );
};
