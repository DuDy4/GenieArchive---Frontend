
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from "@frontegg/react";

import React, { useState } from "react";


export default function FronteggHeader({user}) {

    const [menuVisible, setMenuVisible] = useState(false);

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
        <div>
            <div className="frame-21">
                <div className="ellipse-3" onClick={toggleMenu} >
                    <img className="user-profile-picture" src={user?.profilePictureUrl} alt={user?.name} />
                </div>
                {menuVisible && (
                    <div className="dropdown-menu">
                        <div className="username-name">
                            <span>{user?.name}</span>
                        </div>
                        <div className="frame-13 default">
                            <div className="text-wrapper-9">
                                <button className="transparent-bubble-button" onClick={handleClick} >User settings</button>
                            </div>
                        </div>
                        <div>
                            <button className="transparent-bubble-button" onClick={logout}>Logout</button>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    )
}