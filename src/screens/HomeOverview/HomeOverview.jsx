import React, {useState, useEffect } from "react";
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
//   const {name} = useParams()

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
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Make the API call inside useEffect
    fetch(apiUrl + '/v1/vc-profile?name=' + name)
    // fetch('https://localhost:8443/v1/vc-profile?name=' + name)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('new data:', data);
        newProfile = {};
        newProfile.name = data["Full name"];
        newProfile.company = data["VC name"];
        newProfile.position = data["Position"];
        newProfile.links = {"linkedin" : data['Personal LinkedIn'] }
        newProfile.image = data["Image link"];
        console.log('original strengths:', profile.strengths);
        console.log('new strengths:', data["Strengths"]);
        newProfile.strengths = data["Strengths"];
        newProfile.challenges = profile.challenges;
        // newProfile.connections = Array(data["Image link"]);
        newProfile.connections = data["Connections"];
        newProfile.interests = data["Hobbies Data"]
        newProfile.news = data["News Data"];
        // newProfile.news = profile.news;
        console.log('new profile:', newProfile);
        setData(newProfile);
        console.log('new data:', data);
        setProfile(newProfile)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

//   if (loading) return <div>Loading...</div>;
{/*   if (error) return <div>Error: {error.message}</div>; */}

  return (
    <>
        {profile.name ? (
                <>
                 <LeftColumn className="left-column" profile={profile} />
                 <RightColumn className="right-column" profile={profile} />
                </>
             )
            :
                <div className="loading-spinner"></div>
            }


        <TopNavigation className="top-navigation-instance" groupClassName="top-navigation-2" property1="nav-1" user={user} />
    </>
  );
};
