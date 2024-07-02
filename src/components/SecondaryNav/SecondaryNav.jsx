/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { HugeiconsNotification024 } from "../../icons/HugeiconsNotification024";
import "./style.css";

export const SecondaryNav = ({ property1, className }) => {
  return (
    <div className={`secondary-nav ${className}`}>
      <div className={`frame-13 ${property1}`}>
        <div className="text-wrapper-9">Overview</div>
      </div>
      <div className={`frame-14 ${property1}`}>
        <div className="text-wrapper-10">Profile in Details</div>
      </div>
      <div className="frame-15" title="Coming soon">
        <div className="text-wrapper-11">Good to know</div>
      </div>
      <div className="frame-16" title="Coming soon">
        <HugeiconsNotification024 className="hugeicons" />
        <div className="text-wrapper-11">News</div>
      </div>
      <div className="frame-17" title="Coming soon">
        <div className="text-wrapper-11">Let the Genie know</div>
      </div>
    </div>
  );
};

SecondaryNav.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
