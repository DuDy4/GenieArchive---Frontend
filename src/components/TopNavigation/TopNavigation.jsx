/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { HugeiconsNotification024 } from "../../icons/HugeiconsNotification024";
import { SecondaryNav } from "../SecondaryNav";
import FronteggHeader from "../FronteggHeader/FronteggHeader";
import "./style.css";

export const TopNavigation = ({ property1, className, groupClassName, user }) => {
  return (
    <div className={`top-navigation ${className}`}>
      {property1 === "nav-1" && <SecondaryNav className="secondary-nav-1" property1="default" />}

      {["nav-2", "nav-3", "variant-4", "variant-5"].includes(property1) && (
        <div className="secondary-nav-2">
          <div className="overview-wrapper">
            <div className="overview">
              {property1 === "nav-2" && <>Overview</>}

              {["nav-3", "variant-4", "variant-5"].includes(property1) && <>Before the meeting</>}
            </div>
          </div>
          <div className="frame-18">
            <div className="step-by-step">
              {property1 === "nav-2" && <>Step by step</>}

              {["nav-3", "variant-4", "variant-5"].includes(property1) && <>During the meeting</>}
            </div>
          </div>
          <div className="frame-18">
            {property1 === "nav-2" && <HugeiconsNotification024 className="hugeicons-notification-02-4" />}

            <div className={`make-a-wish-from-the ${property1}`}>
              {property1 === "nav-2" && (
                <>
                  <p className="span-wrapper">
                    <span className="span">Make a wish from the </span>
                  </p>
                  <p className="span-wrapper">
                    <span className="text-wrapper-12">Genie</span>
                  </p>
                </>
              )}

              {["nav-3", "variant-4", "variant-5"].includes(property1) && <>After the meeting</>}
            </div>
          </div>
        </div>
      )}
        <div className="frame-19">
                <div className="group">
                  <div className="frame-20">
                    <div className="text-wrapper-13">Progress</div>
                    <div className="overlap-group-wrapper">
                      <div className="overlap-group">
                        <div className="rectangle-2" />
                        <div className={`rectangle-3 property-1-${property1}`} />
                      </div>
                    </div>
                  </div>
                  <div className="element-wrapper">
                    <div className="element">
                      {["nav-1", "nav-2", "nav-3"].includes(property1) && <>10%</>}

                      {property1 === "variant-4" && <>30%</>}

                      {property1 === "variant-5" && <>60%</>}
                    </div>
                  </div>
                </div>

              </div>
      <FronteggHeader className={groupClassName} user={user} />
    </div>
  );
};

TopNavigation.propTypes = {
  property1: PropTypes.oneOf(["variant-5", "nav-1", "variant-4", "nav-2", "nav-3"]),
};
