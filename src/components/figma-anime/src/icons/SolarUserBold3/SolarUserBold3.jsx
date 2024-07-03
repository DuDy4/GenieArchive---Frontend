/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const SolarUserBold3 = ({ color = "#9F9F9F", className }) => {
  return (
    <svg
      className={`solar-user-bold-3 ${className}`}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M9 7.5C10.6569 7.5 12 6.15685 12 4.5C12 2.84315 10.6569 1.5 9 1.5C7.34315 1.5 6 2.84315 6 4.5C6 6.15685 7.34315 7.5 9 7.5Z"
        fill={color}
      />
      <path
        className="path"
        d="M15 13.125C15 14.9887 15 16.5 9 16.5C3 16.5 3 14.9887 3 13.125C3 11.2613 5.6865 9.75 9 9.75C12.3135 9.75 15 11.2613 15 13.125Z"
        fill={color}
      />
    </svg>
  );
};

SolarUserBold3.propTypes = {
  color: PropTypes.string,
};
