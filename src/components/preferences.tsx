import { SettingsOutlined } from "@mui/icons-material";
import { Box, ButtonBase, Button, Dialog, Menu, MenuItem, MenuList, MenuProps, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import { useToken } from "../providers/TokenProvider";
import TicketForm from './TicketForm'; // Import the new TicketForm component
import AdminMode from './AdminMode'; // Import AdminMode

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
  const [openAdminMode, setOpenAdminMode] = useState(false); // State for opening AdminMode
  const { user, logout } = useAuth0();
  const { isAdmin, token } = useToken();

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
          <div className="flex flex-row cursor-pointer" onClick={() => setOpenContactModal(true)}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "3px solid rgb(230, 232, 235)",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/images/genie-support-icon.jpg"
                alt="support"
                label="support"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px",
                alignItems: "center",
                minHeight: "48px",
                maxHeight: "48px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "-webkit-fill-available"
              }}
              disableRipple
              disableTouchRipple
              onClick={() => setOpenContactModal(true)}>
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16, lineHeight: 24, margin: 0 }}>
                  Contact Us
                </Typography>
              </Box>
              <FaChevronRight
                style={{
                  userSelect: "none",
                  display: "inline-block",
                  flexShrink: "0",
                  fontSize: "1.5rem",
                  width: "16px",
                  height: "16px",
                }}
                size={25}
              />
            </MenuItem>
          </div>

          {user ? (
            <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
              <TicketForm onClose={() => setOpenContactModal(false)} />
            </Dialog>
          ) : (
            <Dialog open={openContactModal} onClose={() => setOpenContactModal(false)}>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  textAlign: "center",
                }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}>
                  Please log in to contact us
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "gray",
                    marginBottom: "24px",
                  }}>
                  You need to be logged in to submit a support ticket. Please log in and try again.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {/* Add your login function here */ }}>
                  Log in
                </Button>
              </Box>
            </Dialog>
          )}

          {isAdmin && (
            <MenuItem
              sx={{ display: "flex", justifyContent: "space-between" }}
              disableRipple
              disableTouchRipple
              onClick={() => setOpenAdminMode(true)} // Open AdminMode dialog
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  Admin Mode
                </Typography>
              </Box>
              <FaChevronRight />
            </MenuItem>
          )}

          {isAdmin && (
            <Dialog open={openAdminMode} onClose={() => setOpenAdminMode(false)}>
              <AdminMode onClose={() => setOpenAdminMode(false)} />
            </Dialog>
          )}

          <hr className="separator" />

          {/* Account MenuItem */}
          <MenuItem sx={{ display: "flex", justifyContent: "end" }} disableRipple disableTouchRipple>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <p style={{ margin: "0px", fontWeight: "400", color: "grey" }}>{user?.user_email}</p>
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
