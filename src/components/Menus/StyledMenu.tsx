import React from 'react';
import { Menu, MenuList, MenuProps, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  "& .MuiPaper-root": {
    padding: "8px 16px",
    minWidth: "15rem", // Adjusted to be narrower like the reference
    width: "max-content",
    border: "1px solid rgb(150, 150, 150)",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 32px -5px",
    backgroundColor: "rgb(251, 252, 253)",
    borderRadius: "12px 12px 12px 1px",
    marginLeft: "25px",
    marginTop: "-40px",
  },
  "& .MuiMenuItem-root": {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px', // Add more padding for better spacing
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // Divider line
    "&:last-child": {
      borderBottom: 'none', // Remove the line for the last item
    },
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.05)', // Subtle hover effect
    },
  },
  "& .MuiTypography-root": {
    marginLeft: '12px', // Space between icon and text
    fontSize: '14px', // Adjust text size
  },
}));

interface StyledMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomStyledMenu: React.FC<StyledMenuProps> = ({ anchorEl, open, onClose, children }) => {
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "styled-menu",
      }}
    >
      <MenuList>
        {children}
      </MenuList>
    </StyledMenu>
  );
};

export default CustomStyledMenu;
