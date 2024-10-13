import React from "react";
import { ButtonBase, Tooltip, Badge } from "@mui/material";

function FooterIcon({ Icon, showNotification, tooltipTitle, onClick }) {
  return (
    <ButtonBase onClick={onClick} sx={{ color: "white" }}>
      <Tooltip arrow title={tooltipTitle} placement="top">
        <Badge 
          color="error" 
          variant="dot" 
          invisible={!showNotification} 
        >
          <Icon />
        </Badge>
      </Tooltip>
    </ButtonBase>
  );
}

export default FooterIcon;
