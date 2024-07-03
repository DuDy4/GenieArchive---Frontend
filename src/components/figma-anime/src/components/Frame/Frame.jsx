/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { IconamoonSendFill2 } from "../../icons/IconamoonSendFill2";
import { IconoirMinus } from "../../icons/IconoirMinus";
import "./style.css";

export const Frame = ({ className }) => {
  return (
    <div className={`frame ${className}`}>
      <div className="div-2">
        <div className="div-3">
          <img className="img" alt="Image" src="/img/image-9.png" />
          <div className="text-wrapper-5">Ask Genie</div>
        </div>
        <IconoirMinus className="icon-instance-node" color="#0073EA" />
      </div>
      <div className="frame-wrapper-2">
        <div className="div-2">
          <div className="text-wrapper-6">Type here</div>
          <IconamoonSendFill2 className="icon-instance-node" />
        </div>
      </div>
    </div>
  );
};
