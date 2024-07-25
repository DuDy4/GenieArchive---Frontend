import { ButtonBase } from "@mui/material";
import React from "react";

interface CustomIconProps {
  children: React.ReactNode;
}

const CustomIcon: React.FC<CustomIconProps> = ({ children }) => {
  return (
    <ButtonBase className="outer-icon" disableRipple disableTouchRipple>
      <ButtonBase className="button-icon"> {children}</ButtonBase>
    </ButtonBase>
  );
};

export default CustomIcon;
