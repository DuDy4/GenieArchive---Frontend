/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { IconamoonSendFill } from "../../icons/IconamoonSendFill";
import { IconoirMinus } from "../../icons/IconoirMinus";
import "./style.css";

export const FrameWrapper = ({ className }) => {
  return (
    <div className={`frame-wrapper ${className}`}>
      <div className="frame-2">
        <div className="frame-3">
          <img className="image-3" alt="Image" src="https://c.animaapp.com/zzQb4IEW/img/image-9-4@2x.png" />
          <div className="text-wrapper-3">Ask Genie</div>
        </div>
        <IconoirMinus className="icon-instance-node" color="#0073EA" />
      </div>
      <div className="frame-4">
        <div className="frame-2">
          <div className="text-wrapper-4">Type here</div>
          <IconamoonSendFill className="icon-instance-node" />
        </div>
      </div>
    </div>
  );
};
