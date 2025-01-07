import React, { useState, useEffect, useRef } from 'react';
import { Box, ButtonBase, Tooltip, Avatar, Dialog, MenuItem, Typography } from "@mui/material";
import { SettingsOutlined, ContactSupportOutlined, EmojiEventsOutlined } from "@mui/icons-material";
import { FaChevronRight } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import AdminMode from './AdminMode';
import FakeMeeting from './FakeMeeting';
import { useToken } from "../providers/TokenProvider";
import ContactUs from './ContactUs';
import FileUpload from './file-upload';
import BadgesPopup from './BadgesPopup';
import FooterIcon from './footer-icon';
import CustomStyledMenu from './Menus/StyledMenu';
import FileUploadDialog from './popups/fileUploadPopup';
import { useSSEClient } from "../utils/AxiosMiddleware";

const Footer: React.FC = () => {
  const [anchorElPreferences, setAnchorElPreferences] = useState<null | HTMLElement>(null);
  const [anchorElContact, setAnchorElContact] = useState<null | HTMLElement>(null);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openAdminMode, setOpenAdminMode] = useState(false);
  const [openFakeMeetingMode, setOpenFakeMeetingMode] = useState(false);
  const [openBadges, setOpenBadges] = useState(false); // State for the Badges popup
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const { user, logout } = useAuth0();
  const { token, isAdmin } = useToken();
  const { connectToSSE } = useSSEClient();
  const [unseenBadges, setUnseenBadges] = useState<string[]>([]);
  const isConnectedRef = useRef(false); // Use ref to avoid unnecessary re-renders

  useEffect(() => {
    if (isConnectedRef.current) return; // Prevent reinitializing the connection

    const eventSource = connectToSSE(
      "/notifications/badges",
      (data) => {
        setUnseenBadges(data); // Update badges state
      },
      (error) => {
        console.error("Error with SSE:", error);
      }
    );

    if (eventSource) isConnectedRef.current = true; // Mark as connected

    return () => {
      eventSource?.close();
      isConnectedRef.current = false; // Reset the connection status
    };
  }, [connectToSSE]); // Only run when `connectToSSE` changes

  const handleOpenBadgesPopup = () => {
      setOpenBadges(true);
      setUnseenBadges([]); // Clear unseen badges when opening the popup
  };

  const handleClickPreferences = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPreferences(event.currentTarget);
  };

    const handleOpenPreferencesMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElPreferences(event.currentTarget); // Open preferences menu
    };

  const handleClosePreferencesMenu = () => {
    setAnchorElPreferences(null);
  };

  const handleCloseFileUpload = () => {
    setOpenFileUpload(false);
    handleClosePreferencesMenu();
  }

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

  const cleanUnseenBadges = () => {
    setUnseenBadges([]);
      }

  return (
    <>
      <div className="footer">
        <ButtonBase id="preferencesButton" onClick={handleClickPreferences}   style={{ color: "white" }}
>
          <Tooltip arrow title="Preferences" placement="top">
            <SettingsOutlined />
          </Tooltip>
        </ButtonBase>

        <CustomStyledMenu
          id="preferences-menu"
          anchorEl={anchorElPreferences}
          open={Boolean(anchorElPreferences)}
          onClose={handleClosePreferencesMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ mt: -2 }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <Typography sx={{ fontWeight: "500" }}>Preferences</Typography>
          </Box>
          <hr className="separator" />

          {isAdmin && (
            <MenuItem
              onClick={() => setOpenAdminMode(true)}
              sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
            >
              <Typography sx={{ fontWeight: 500 }}>Admin Mode</Typography>
              <FaChevronRight />
            </MenuItem>
          )}

          {isAdmin && (
            <MenuItem
              onClick={() => setOpenFakeMeetingMode(true)}
              sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
            >
              <Typography sx={{ fontWeight: 500 }}>Fake Meeting</Typography>
              <FaChevronRight />
            </MenuItem>
          )}



          <MenuItem
            id="file-upload-button"
            onClick={() => setOpenFileUpload(true)}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>Upload Files</Typography>

            {/* Wrap the icon in a div with an ID */}
            <div>
              <FaChevronRight />
            </div>
          </MenuItem>

          <Dialog
            open={openFileUpload}
            onClose={() => setOpenFileUpload(false)}
            fullWidth // Ensures the dialog uses the maximum available width
            maxWidth="md" // Sets the max width, you can try "lg" or "xl" as well depending on how wide you want
            sx={{ width: '90%' }} // Use 90% of the screen width
          >
            <FileUpload onClose={() => setOpenFileUpload(false)}/>
          </Dialog>

          <MenuItem sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Typography>{user ? user?.user_email : "Log out"}</Typography>
            <FiLogOut onClick={() => logout()} />
          </MenuItem>
        </CustomStyledMenu>

        <Dialog open={openAdminMode} onClose={() => setOpenAdminMode(false)} maxWidth='lg'>
          <AdminMode onClose={() => setOpenAdminMode(false)} />
        </Dialog>

        <Dialog open={openFakeMeetingMode} onClose={() => setOpenFakeMeetingMode(false)}>
          <FakeMeeting onClose={() => setOpenFakeMeetingMode(false)} />
        </Dialog>

        <ButtonBase onClick={() => setOpenContactModal(true)} sx={{ color: "white" }}>
          <Tooltip arrow title="Share Feedback" placement="top">
            <ContactSupportOutlined />
          </Tooltip>
        </ButtonBase>

        {/* <FooterIcon
          Icon={EmojiEventsOutlined}
          showNotification={false}
          tooltipTitle="Challenges"
          onClick={() => setOpenBadges(true)}
        /> */}
        <FooterIcon
            Icon={EmojiEventsOutlined}
            showNotification={unseenBadges.length > 0}
            tooltipTitle="Challenges"
            onClick={handleOpenBadgesPopup}
        />


        <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
          <ContactUs open={openContactModal} onClose={() => setOpenContactModal(false)} />
        </Dialog>


        <Dialog open={openBadges} onClose={() => setOpenBadges(false)} maxWidth="md">
          <BadgesPopup open={openBadges} onClose={() => setOpenBadges(false)} unseenBadges={unseenBadges} cleanUnseenBadges={cleanUnseenBadges} />
        </Dialog>
      </div>
      {/* Pass the anchorEl and handlers to the FileUploadDialog */}
      <FileUploadDialog
          anchorElPreferences={anchorElPreferences}
          handleOpenPreferencesMenu={handleClickPreferences}
          handleClosePreferencesMenu={handleClosePreferencesMenu}
          setOpenFileUpload={setOpenFileUpload} // Pass the function to open dialog
        />

    </>
  );
};

export default Footer;
