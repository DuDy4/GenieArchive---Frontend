/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { FluentIosArrow24Filled2 } from "../../icons/FluentIosArrow24Filled2";
import { PrimaryNavigation } from "../PrimaryNavigation";
import { useState } from "react";
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from "@frontegg/react";

import "./style.css";

export const HomePrimaryMenu = ({ property1, className, user }) => {

     const [menuVisible, setMenuVisible] = useState(true);

        const toggleMenu = () => {
            setMenuVisible(!menuVisible);
        };

        const hideMenu = () => {
            setMenuVisible(false);
        };

        const logout = () => {
            const baseUrl = ContextHolder.getContext().baseUrl;
            window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
          };

          const handleClick = () => {
            AdminPortal.show();
          };



  return (
    <div className={`home-primary-menu ${className}`}>
      <div className="frame-8">
        <div className="frame-9">
          <img className="image-4" alt="Image" src="https://c.animaapp.com/zzQb4IEW/img/image-9-5@2x.png" />
          <img className="genie" alt="Genie" src="https://c.animaapp.com/zzQb4IEW/img/genie-ai2-1-3@2x.png" />
        </div>
        <div className="primary-navigation-wrapper">
          <PrimaryNavigation
            className="primary-navigation-instance"
            property1={
              property1 === "variant-2" ? "play-book" : property1 === "variant-3" ? "accelerate-sales-tools" : "home"
            }
          />
        </div>
      </div>
      <div className="toggle-menu-and-user-bubble">

          <div className="frame-10">
            <div className="frame-11">
                {menuVisible && (
                  <div className="dropdown-menu">
                          <div className="text-wrapper-9 dropdown-button-line" onClick={handleClick}>
                              <img className="dropdown-icon" alt="Image" src="https://img.icons8.com/?size=100&id=364&format=png&color=ffffff" />
                              <img className="dropdown-icon" alt="Image" src="https://img.icons8.com/?size=100&id=arrojWw9F5j5&format=png&color=ffffff" />
                          </div>
                      <div className="text-wrapper-9 dropdown-button-line">
                          <button className="transparent-bubble-button" onClick={handleClick} >User settings</button>
                           <button className="transparent-bubble-button dropdown-button-line" onClick={logout}>Logout</button>
                      </div>
                  </div>
                  )}
                <div className="frame-12" onClick={toggleMenu}>

                    <img className="user-profile-picture" src={user?.profilePictureUrl} alt={user?.name} />

                    <div className="text-wrapper-8">{user.name}</div>
                    <FluentIosArrow24Filled2 className={`fluent-ios-arrow-2 ${!menuVisible ? '' : 'open'}`} color="white" />

                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

HomePrimaryMenu.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};
