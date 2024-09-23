import React, { useState } from 'react';
import { Box, ButtonBase, Tooltip, Avatar, Dialog, MenuItem, Typography } from "@mui/material";
import { SettingsOutlined, ContactSupportOutlined } from "@mui/icons-material";
import { FaChevronRight } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import AdminMode from './AdminMode';
import { useToken } from "../providers/TokenProvider";
import ContactUs from './ContactUs';
import CustomStyledMenu from './Menus/StyledMenu';

const Footer: React.FC = () => {
  const [anchorElPreferences, setAnchorElPreferences] = useState<null | HTMLElement>(null);
  const [anchorElContact, setAnchorElContact] = useState<null | HTMLElement>(null);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openAdminMode, setOpenAdminMode] = useState(false);
  const { user, logout } = useAuth0();
  const { isAdmin } = useToken();

  // Handlers for Preferences menu
  const handleClickPreferences = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPreferences(event.currentTarget);
  };

  const handleClosePreferencesMenu = () => {
    setAnchorElPreferences(null);
  };

  // Handlers for Contact Us menu
  const handleClickContact = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElContact(event.currentTarget);
  };

  const handleCloseContactMenu = () => {
    setAnchorElContact(null);
  };

  const handleContactUsClick = () => {
    handleCloseContactMenu();
    setOpenContactModal(true);
  };

  return (
    <>
      <div className="footer">
        {/* Preferences Button */}
        <ButtonBase onClick={handleClickPreferences}>
          <Tooltip arrow title="Preferences" placement="top">
            <SettingsOutlined />
          </Tooltip>
        </ButtonBase>

        {/* Preferences Menu */}
        <CustomStyledMenu
          anchorEl={anchorElPreferences}
          open={Boolean(anchorElPreferences)}
          onClose={handleClosePreferencesMenu}
          anchorOrigin={{
            vertical: 'top',  // Anchor the menu to the bottom of the button
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',  // Open the menu from the top
            horizontal: 'center',
          }}
          sx={{ mt: -2 }} // Moves the menu further upwards to ensure it is above the icon
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <Typography sx={{ fontWeight: "500" }}>Preferences</Typography>
          </Box>
          <hr className="separator" />

          {isAdmin && (
            <MenuItem onClick={() => setOpenAdminMode(true)}>
              <Typography sx={{ fontWeight: 500 }}>Admin Mode</Typography>
              <FaChevronRight />
            </MenuItem>
          )}

          {/* Logout */}
          <MenuItem sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Typography>{user ? user?.email : "Log out"}</Typography>
            <FiLogOut onClick={() => logout()} />
          </MenuItem>
        </CustomStyledMenu>

        {isAdmin && (
          <Dialog open={openAdminMode} onClose={() => setOpenAdminMode(false)}>
            <AdminMode onClose={() => setOpenAdminMode(false)} />
          </Dialog>
        )}

        {/* Contact Us Button */}
        <ButtonBase onClick={handleClickContact} sx={{ color: "white" }}>
          <Tooltip arrow title="Contact Us" placement="top">
            <ContactSupportOutlined />
          </Tooltip>
        </ButtonBase>

        {/* Contact Us Menu */}
        <CustomStyledMenu
          anchorEl={anchorElContact}
          open={Boolean(anchorElContact)}
          onClose={handleCloseContactMenu}
          anchorOrigin={{
            vertical: 'bottom',  // Anchor the menu to the bottom of the button
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',  // Open the menu from the top
            horizontal: 'center',
          }}
          sx={{ mt: -2 }} // Moves the menu further upwards to ensure it is above the icon
        >
          <div style={{
            padding: "8px",
            borderRadius: "15px 15px 0 15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            maxHeight: "50px",
            backgroundColor: "#fff",
          }}>
            {/* Greeting */}
            <Typography variant="h6" sx={{ marginBottom: "8px" }}>
              Hi {user ? user.name.split(' ')[0] : 'hello'} 👋
            </Typography>

            {/* Avatar Container */}
            <div style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginBottom: "0",
            }}>
              <Avatar
                alt="User 1"
                src="/images/ceo.webp"
                sx={{ width: "inherit", height: "inherit", maxWidth: "40px", maxHeight: "40px" }}
              />

              <Avatar
                alt="User 2"
                src="/images/coo.webp"
                sx={{ width: "inherit", height: "inherit", maxWidth: "40px", maxHeight: "40px" }}
              />
            </div>
          </div>

          <hr className="separator" />

          <MenuItem onClick={handleContactUsClick}>
            <ContactSupportOutlined sx={{ marginRight: "8px" }} />
            Messages
          </MenuItem>
          <MenuItem onClick={handleContactUsClick}>
            <ContactSupportOutlined sx={{ marginRight: "8px" }} />
            Ask a question
          </MenuItem>
        </CustomStyledMenu>
      </div>

      {/* Contact Us Dialog */}
      <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
        <ContactUs open={openContactModal} onClose={() => setOpenContactModal(false)} />
      </Dialog>
    </>
  );
};

export default Footer;
