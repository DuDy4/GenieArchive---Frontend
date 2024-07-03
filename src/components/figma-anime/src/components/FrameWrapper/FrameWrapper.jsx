/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const FrameWrapper = ({ className, text = "Uploaded a new linkedin post”saving the whales”" }) => {
  return (
    <div className={`frame-wrapper ${className}`}>
      <div className="frame-8">
        <div className="text-wrapper-7">Good to know</div>
      </div>
      <div className="frame-9">
        <div className="frame-9">
          <div className="text-wrapper-8">RELEVANT CONNECTIONS</div>
          <div className="frame-10">
            <img className="img-2" alt="Ellipse" src="/img/ellipse-13.png" />
            <img className="img-2" alt="Ellipse" src="/img/ellipse-12.png" />
            <img className="img-2" alt="Ellipse" src="/img/ellipse-14.png" />
            <img className="img-2" alt="Ellipse" src="/img/ellipse-11.png" />
            <img className="img-2" alt="Ellipse" src="/img/ellipse-15.png" />
          </div>
        </div>
      </div>
      <div className="frame-11">
        <div className="text-wrapper-8">INTEREST IN</div>
        <div className="frame-12">
          <img className="image-2" alt="Image" src="/img/image-7.png" />
          <img className="image-2" alt="Image" src="/img/image-7-1.png" />
          <img className="image-2" alt="Image" src="/img/image-7-2.png" />
          <img className="img-2" alt="Image" src="/img/image-8.png" />
        </div>
      </div>
      <div className="frame-11">
        <div className="text-wrapper-8">TOP NEWS</div>
        <div className="frame-13">
          <div className="ellipse-wrapper">
            <img className="ellipse-2" alt="Ellipse" src="/img/ellipse-6.png" />
          </div>
          <p className="p">{text}</p>
        </div>
        <div className="frame-13">
          <div className="image-wrapper">
            <img className="image-3" alt="Image" src="/img/image-12.png" />
          </div>
          <p className="p">There was an article about Joe in Forbes</p>
        </div>
      </div>
    </div>
  );
};

FrameWrapper.propTypes = {
  text: PropTypes.string,
};
