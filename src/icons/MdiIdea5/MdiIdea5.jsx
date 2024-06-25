/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const MdiIdea5 = ({ color = "#00C875", className }) => {
  return (
    <svg
      className={`mdi-idea-5 ${className}`}
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M6.99984 1.16666C5.91687 1.16666 4.87826 1.59687 4.11248 2.36264C3.34671 3.12842 2.9165 4.16703 2.9165 5.25C2.9165 6.63833 3.61067 7.8575 4.6665 8.59833V9.91666C4.6665 10.0714 4.72796 10.2197 4.83736 10.3291C4.94675 10.4385 5.09513 10.5 5.24984 10.5H8.74984C8.90455 10.5 9.05292 10.4385 9.16232 10.3291C9.27171 10.2197 9.33317 10.0714 9.33317 9.91666V8.59833C10.389 7.8575 11.0832 6.63833 11.0832 5.25C11.0832 4.16703 10.653 3.12842 9.88719 2.36264C9.12142 1.59687 8.0828 1.16666 6.99984 1.16666ZM5.24984 12.25C5.24984 12.4047 5.3113 12.5531 5.42069 12.6625C5.53009 12.7719 5.67846 12.8333 5.83317 12.8333H8.1665C8.32121 12.8333 8.46959 12.7719 8.57898 12.6625C8.68838 12.5531 8.74984 12.4047 8.74984 12.25V11.6667H5.24984V12.25Z"
        fill={color}
      />
    </svg>
  );
};

MdiIdea5.propTypes = {
  color: PropTypes.string,
};
