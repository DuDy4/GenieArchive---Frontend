/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroiconsChartBarSquare20Solid8 } from "../../icons/HeroiconsChartBarSquare20Solid8";
import { NounMusicBook575383523 } from "../../icons/NounMusicBook575383523";
import { SolarUserBold3 } from "../../icons/SolarUserBold3";
import "./style.css";

export const PrimaryNavigation = ({ property1, className }) => {

    const navigate = useNavigate();

    const navigateToProfiles = () => {
        console.log('Navigating to profiles');
        navigate('/profiles');
    };

  return (
    <div className={`primary-navigation ${className}`}>
      <div className={`frame-5 ${property1}`} onClick={() => navigateToProfiles()}>
        <SolarUserBold3 className="instance-node" color={property1 === "home" ? "white" : "#9F9F9F"} />
        <div className="text-wrapper-5">Home</div>
      </div>
      <div className={`frame-6 property-1-0-${property1}`} title="Coming soon">
        <NounMusicBook575383523 className="instance-node" color={property1 === "play-book" ? "white" : "#9F9F9F"} />
        <div className="text-wrapper-6">Playbook</div>
      </div>
      <div className={`frame-7 property-1-0-${property1}`} title="Coming soon">
        <HeroiconsChartBarSquare20Solid8
          className="instance-node"
          color={property1 === "accelerate-sales-tools" ? "white" : "#9F9F9F"}
        />
        <div className="text-wrapper-7" title="Coming soon">Accelerate Sales Tools</div>
      </div>
    </div>
  );
};

PrimaryNavigation.propTypes = {
  property1: PropTypes.oneOf(["accelerate-sales-tools", "home", "play-book", "no-select"]),
};
