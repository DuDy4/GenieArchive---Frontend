import { SettingsOutlined } from "@mui/icons-material";
import { Box, Button, ButtonBase, Dialog, Menu, MenuItem, MenuList, MenuProps, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import TicketForm from './TicketForm'; // Import the new TicketForm component

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  "& .MuiPaper-root": {
    padding: "8px 16px",
    width: "26rem",
    border: "1px solid rgb(230, 232, 235)",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 32px -5px",
    borderRadius: "8px",
    backgroundColor: "rgb(251, 252, 253)",
    marginTop: "-8px",
  },
}));

const Preferences = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openContactModal, setOpenContactModal] = useState(false);
  const { user, logout } = useAuth0();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        sx={{
          position: "absolute",
          left: "18px",
          bottom: "18px",
          zIndex: "14",
          cursor: "pointer",
          ":hover": {
            color: "white",
          },
        }}
        aria-controls={Boolean(anchorEl) ? "preference-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        onClick={handleClick}
        disableTouchRipple>
        <Tooltip arrow title="Preferences" placement="top">
          <SettingsOutlined />
        </Tooltip>
      </ButtonBase>

      <StyledMenu
        id="preference-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "preference-button",
        }}
        sx={{
          zIndex: 1300,
        }}>
        <MenuList>
          {/* Preferences Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "16px",
            }}>
            <Typography
              sx={{
                lineHeight: "28px",
                fontSize: "20px",
                fontWeight: "500",
              }}>
              Preferences
            </Typography>
          </Box>

          <hr className="separator" />

          {/* Contact Us MenuItem */}
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Ensure alignment is centered vertically
              padding: "0.75rem 0.5rem", // Adjust padding to be smaller
              minHeight: "48px", // Set a fixed height
              maxHeight: "48px", // Set a fixed height
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disableRipple
            disableTouchRipple
            onClick={() => setOpenContactModal(true)}>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 400, fontSize: 14, lineHeight: 24, margin: 0 }}>
                Contact Us
              </Typography>
            </Box>
            <FaChevronRight
              style={{
                userSelect: "none",
                display: "inline-block",
                flexShrink: "0",
                transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "1.5rem",
                width: "16px",
                height: "16px",
                stroke: "rgb(17, 24, 28)",
              }}
              size={25}
            />
          </MenuItem>

          { user ?
          <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
            <TicketForm onClose={() => setOpenContactModal(false)} />
          </Dialog>
          :
          <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",  // Light gray background for more contrast
                padding: "32px",             // Increase padding for more space
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",         // Add border radius for a softer look
                textAlign: "center",
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,           // Bolder font weight
                  marginBottom: "16px",      // Space between text and button
                }}>
                Please log in to contact us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "gray",
                  marginBottom: "24px",      // Space between text and button
                }}>
                You need to be logged in to submit a support ticket. Please log in and try again.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {/* Add your login function here */}}>
                Log in
              </Button>
            </Box>
          </Dialog>
          }

          <hr className="separator" />

          {/* Account MenuItem */}
          <MenuItem sx={{ display: "flex", justifyContent: "space-between" }} disableRipple disableTouchRipple>
            <Box onClick={handleClose} sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FiUser /> Account
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <p style={{ margin: "0px", fontWeight: "400" }}>{user?.email}</p>
              <Tooltip arrow placement="top" title="Log Out">
                <div onClick={() => logout()}>
                  <FiLogOut className="logout-icon" />
                </div>
              </Tooltip>
            </Box>
          </MenuItem>
        </MenuList>
      </StyledMenu>
    </>
  );
};

export default Preferences;
